import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { isAuthorized } from "../middlewares";
import { Item } from "@acme/db";
import { statusShema } from "../../models";

export const transactionRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        skip: z.number().optional(),
        cursor: z.string().nullish(),
        name: z.string().optional(),
        filters: z
          .array(
            z.object({
              id: z.string(),
              value: z.string(),
            }),
          )
          .optional(),
        filterModes: z.record(z.string()).optional(),
        sorting: z
          .array(
            z.object({
              id: z.string(),
              desc: z.boolean(),
            }),
          )
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor, filters, filterModes, sorting, name } =
        input;

      const dbData = await ctx.prisma.transaction.findMany({
        take: limit + 1,
        skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        where: {
          userId: ctx.auth.userId,
          name: name ? { contains: name } : undefined,
        },
        include: {
          items: true,
        },
      });

      // Handle empty
      if (!dbData.length) {
        return {
          items: [],
          nextCursor: null,
        };
      }

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: dbData[0]?.userId as string,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (dbData.length > limit) {
        const nextItem = dbData.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      let transactions = dbData as unknown as {
        id: string;
        userId: string;
        total: number;
        status: string;
        name: string;
        items: Item[];
        createdAt: Date;
        updatedAt: Date;
        [key: string]: any;
      }[];

      // Filtering
      if (filters?.length) {
        filters.forEach((filter) => {
          const { id: columnId, value: filterValue } = filter;
          const filterMode = filterModes?.[columnId] ?? "contains";
          transactions = transactions.filter((row) => {
            const rowValue = row[columnId]?.toString()?.toLowerCase();
            if (filterMode === "contains") {
              return rowValue.includes?.((filterValue as string).toLowerCase());
            }
            if (filterMode === "startsWith") {
              return rowValue.startsWith?.(
                (filterValue as string).toLowerCase(),
              );
            }
            if (filterMode === "endsWith") {
              return rowValue.endsWith?.((filterValue as string).toLowerCase());
            }
          });
        });
      }

      // Sorting
      if (sorting?.length) {
        const sort = sorting[0];
        const { id, desc } = sort;
        transactions.sort((a, b) => {
          if (desc) {
            return a[id] < b[id] ? 1 : -1;
          }
          return a[id] > b[id] ? 1 : -1;
        });
      }

      const totalCount = await ctx.prisma.transaction.count({
        where: {
          userId: ctx.auth.userId,
          name: name ? { contains: name } : undefined,
        },
      });

      return {
        items: dbData,
        nextCursor,
        totalCount,
      };
    }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const transaction = await ctx.prisma.transaction.findUnique({
      where: {
        id: input,
      },
      include: {
        items: true,
      },
    });

    // Not found error
    if (!transaction) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Transaction not found",
      });
    }

    // Authorize
    await isAuthorized({ ctx, resourceUserId: transaction?.userId });

    return transaction;
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        status: statusShema.optional(),
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            quantity: z.number(),
            price: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Calculate total price
      const totalPrice = input.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );

      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId: ctx.auth.userId,
          total: totalPrice,
          status: input.status || "PENDING",
          name: input.name,
          items: {
            create: input.items.map((item) => ({
              ...item,
              userId: ctx.auth.userId,
            })),
          },
        },
        include: { items: true },
      });
      return transaction;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        status: statusShema.optional(),
        items: z.array(
          z.object({
            id: z.string().optional(),
            name: z.string().optional(),
            description: z.string().optional(),
            quantity: z.number().optional(),
            price: z.number().optional(),
            operation: z.enum(["CREATE", "DELETE", "UPDATE"]).optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find the transaction
      const transaction = await ctx.prisma.transaction.findUnique({
        where: { id: input.id },
        include: { items: true },
      });

      // Not found error
      if (!transaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transaction not found",
        });
      }

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: transaction?.userId,
      });

      // Calculate total price
      const totalPrice = input.items
        .filter((item) => item.operation !== "DELETE")
        .reduce(
          (total, item) => total + (item.quantity || 1) * (item.price || 0),
          0,
        );

      // Separate items into ADD, UPDATE, DELETE categories
      // We need to remove the id and operation from the addItems to match the type of the items
      const addItems = input.items
        .filter((item) => item.operation === "CREATE")
        .map((item) => {
          const { id, operation, ...rest } = item;
          return rest;
        });
      const updateItems = input.items
        .filter((item) => item.operation === "UPDATE")
        .map((item) => {
          const { operation, ...rest } = item;
          return rest;
        });
      const deleteItems = input.items
        .filter((item) => item.operation === "DELETE")
        .map((item) => {
          const { operation, ...rest } = item;
          return rest;
        });

      // Update the transaction
      const updatedTransaction = await ctx.prisma.transaction.update({
        where: { id: input.id },
        data: {
          total: totalPrice,
          name: input.name || transaction.name,
          status: input.status || "PENDING",
          // Handle ADD, UPDATE, DELETE operations separately
          items: {
            create: addItems.map((item) => ({
              ...item,
              name: item.name || "Item Name",
              description: item.description || undefined,
              quantity: item.quantity || 1,
              price: item.price || 0,
              userId: ctx.auth.userId,
            })),
            update: updateItems.map((item) => ({
              where: { id: item.id },
              data: { ...item },
            })),
            delete: deleteItems.map((item) => ({ id: item.id })),
          },
        },
      });

      return updatedTransaction;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      // Find the transaction
      const transaction = await ctx.prisma.transaction.findUnique({
        where: { id: input },
        include: { items: true },
      });

      // If not found
      if (!transaction) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Transaction not found",
        });
      }

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: transaction?.userId,
      });

      await ctx.prisma.transaction.delete({
        where: { id: input },
      });

      return {
        message: "Transaction deleted",
      };
    }),
  deleteMany: protectedProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      const ids = input;

      // Find all transactions to be deleted
      const transactions = await ctx.prisma.transaction.findMany({
        where: {
          id: {
            in: ids,
          },
          userId: ctx.auth.userId,
        },
      });

      // Check if all transactions exist and belong to the current user
      if (transactions.length !== ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "One or more transactions not found",
        });
      }

      // Authorize
      await Promise.all(
        transactions.map(async (transaction) => {
          return await isAuthorized({
            ctx,
            resourceUserId: transaction?.userId,
          });
        }),
      );

      // Delete all transactions
      await ctx.prisma.transaction.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return {
        message: "Transactions deleted",
      };
    }),
});

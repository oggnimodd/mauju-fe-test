import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { paginationSchema } from "models";
import { TRPCError } from "@trpc/server";
import { isAuthorized } from "../middlewares";

export const transactionRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const DEFAULT_SIZE = 10;

      const transactions = await ctx.prisma.transaction.findMany({
        skip: input.skip || 0,
        take: input.take || DEFAULT_SIZE,
        orderBy: { createdAt: "desc" },
        where: { userId: ctx.auth.userId },
        include: {
          items: true,
        },
      });

      // Authorize
      await isAuthorized({
        ctx,
        resourceUserId: transactions[0]?.userId as string,
      });

      let nextCursor = null;
      if (transactions.length > (input.take || DEFAULT_SIZE)) {
        const nextItem = transactions.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items: transactions,
        nextCursor,
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
          status: "PENDING",
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
        items: z.array(
          z.object({
            id: z.string().optional(),
            name: z.string(),
            description: z.string().optional(),
            quantity: z.number().optional(),
            price: z.number().optional(),
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
      const totalPrice = input.items.reduce(
        (total, item) => total + (item.quantity || 1) * (item.price || 0),
        0,
      );

      // Update the transaction
      const updatedTransaction = await ctx.prisma.transaction.update({
        where: { id: input.id },
        data: {
          total: totalPrice,
          status: "pending",
          items: {
            update: input.items.map((item) => ({
              where: { id: item.id },
              data: { ...item, userId: ctx.auth.userId },
            })),
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
});

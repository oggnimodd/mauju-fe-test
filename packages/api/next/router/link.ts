import {
  FilterLinkSchema,
  CreateLinkSchema,
  getSingleLinkSchema,
  EditLinkSchema,
  EditLinkInput,
} from "../../schema";

import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const linkRouter = createTRPCRouter({
  // Create new link =>
  createLink: protectedProcedure
    .input(CreateLinkSchema)
    .mutation(({ ctx, input }) => {
      const newLink = ctx.prisma.link.create({
        data: {
          ...input,
          creatorId: ctx.auth.userId,
        },
      });
      return newLink;
    }),

  // Edit link =>
  editLink: protectedProcedure
    .input(EditLinkSchema)
    .mutation(({ ctx, input }) => {
      const { linkId, ...options } = input;

      const validOptions: Omit<EditLinkInput, "linkId"> = {};

      Object.keys(options).forEach((_option) => {
        const option = _option as keyof typeof options;
        if (options[option]) {
          validOptions[option] = options[option];
        }
      });

      const editedLink = ctx.prisma.link.update({
        where: { id: linkId },
        data: {
          ...validOptions,
          creatorId: ctx.auth.userId,
        },
      });
      return editedLink;
    }),

  // Delete link =>
  deleteLink: protectedProcedure
    .input(getSingleLinkSchema)
    .mutation(({ ctx, input }) => {
      const deletedLink = ctx.prisma.link.delete({
        where: { id: input.linkId },
      });
      return deletedLink;
    }),

  // Get all links =>
  allLinks: protectedProcedure
    .input(FilterLinkSchema)
    .query(({ ctx, input }) => {
      console.log(input);

      return ctx.prisma.link?.findMany({
        where: {
          creatorId: ctx.auth.userId,
          AND: input.filter
            ? [
                {
                  OR: [
                    { url: { contains: input.filter } },
                    { slug: { contains: input.filter } },
                    { description: { contains: input.filter } },
                  ],
                },
              ]
            : undefined,
        },
      });
    }),

  // Get single link =>
  singleLink: protectedProcedure
    .input(getSingleLinkSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.link?.findUnique({
        where: {
          id: input.linkId,
        },
      });
    }),

  // Check if slug is available =>
  checkSlug: protectedProcedure
    .input(z.object({ customSlug: z.string().nullish() }).nullish())
    .query(async ({ ctx, input }) => {
      // Retrieve the custom slug from the input or set it to an empty string if nullish
      const customSlugToCheck = input?.customSlug || "";

      // Check if a link with the provided custom slug exists in the database
      const existingLink = await ctx.prisma.link?.findUnique({
        where: {
          slug: customSlugToCheck,
        },
      });

      return {
        isSlugExist: !!existingLink,
      };
    }),
});

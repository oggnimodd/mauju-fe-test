import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const transactionRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.string())
    .query(({ input }) => `hello ${input}`),
});

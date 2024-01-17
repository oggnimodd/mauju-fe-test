import { transactionRouter } from "./router/transaction";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

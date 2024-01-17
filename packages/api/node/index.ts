import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "./root";

export { createTRPCContext } from "./trpc";
export type { AppRouter } from "./root";
export { appRouter } from "./root";
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

import { postRouter } from "./router/post";
import { authRouter } from "./router/auth";
import { createTRPCRouter } from "./trpc";
import { linkRouter } from "./router/link";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

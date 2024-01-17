import { TRPCError } from "@trpc/server";
import { AuthenticatedContext } from "../trpc";

interface AuthorizationMiddlewareOptions {
  ctx: AuthenticatedContext;
  resourceUserId: string;
}

// https://trpc.io/docs/server/middlewares#experimental-standalone-middlewares
// TRPC standalone middlewares are still experimental, so for now just check the authorization in every single query and mutation logic
export const isAuthorized = async (opts: AuthorizationMiddlewareOptions) => {
  const { ctx, resourceUserId } = opts;

  if (resourceUserId !== ctx.auth.userId) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
  }
  // If the entity is found and belongs to the user, proceed to the next middleware or procedure
  return true;
};

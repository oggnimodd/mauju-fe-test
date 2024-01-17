/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import {
  clerkClient,
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/clerk-sdk-node";
import { prisma } from "@acme/db";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { SECRET_KEY, PUBLISHABLE_KEY } from "./plugins/clerk/constants";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type AuthContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject;
};

export type AuthenticatedContext = Awaited<
  ReturnType<typeof createInnerTRPCContext>
>;

export const createInnerTRPCContext = async ({ auth }: AuthContextProps) => {
  return {
    auth,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  if (JSON.stringify(Object.keys(opts)) === `["req","resHeaders"]`) {
    // Elysia
    const requestState = await clerkClient.authenticateRequest({
      secretKey: SECRET_KEY,
      publishableKey: PUBLISHABLE_KEY,
      request: opts.req,
    });

    if (!requestState || !requestState.toAuth()) {
      return await createInnerTRPCContext({ auth: {} } as AuthContextProps);
    }

    return await createInnerTRPCContext({
      auth: requestState.toAuth() as unknown as AuthContextProps["auth"],
    });
  }
  // Express
  const request = opts.req as FetchCreateContextFnOptions["req"] & {
    auth: AuthContextProps["auth"];
  };
  const auth = request.auth;

  // Express
  if (auth) {
    return await createInnerTRPCContext({
      auth,
    });
  }
  return await createInnerTRPCContext({ auth: {} } as AuthContextProps);
};

const t = initTRPC
  .context<inferAsyncReturnType<typeof createTRPCContext>>()
  .create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
      };
    },
  });

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);

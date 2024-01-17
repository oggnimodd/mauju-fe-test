import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from "@acme/api/node";

export const api = createTRPCReact<typeof appRouter>();

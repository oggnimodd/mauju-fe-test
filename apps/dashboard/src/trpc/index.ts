import { createTRPCReact } from "@trpc/react-query";
import { appRouter } from "../../../../packages/api/node";
export const api = createTRPCReact<typeof appRouter>();

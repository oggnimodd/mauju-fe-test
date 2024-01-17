import { appRouter, createTRPCContext } from "../api/node";
import express from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(cors());
}

app.use(express.json());

const API_URL = "/api";

// Custom middleware function to check authentication
app.use(API_URL, ClerkExpressWithAuth());

app.use(
  `${API_URL}/trpc`,
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext as any,
  }),
);

export default app;

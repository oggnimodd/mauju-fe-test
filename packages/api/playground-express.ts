import { appRouter } from "./node/root";
import { createTRPCContext } from "./node/trpc";
import express from "express";
import cors from "cors";
import { renderTrpcPanel } from "trpc-panel";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { injectScriptToPanel } from "./panel/injectScriptToPanel";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Custom middleware function to check authentication
app.use(ClerkExpressWithAuth());

app.use("/panel", ({ res }) => {
  res?.setHeader("Content-Type", "text/html");

  const panelHtml = renderTrpcPanel(appRouter, {
    url: process.env.VITE_APP_TRPC_URL || `http://localhost:${PORT}/trpc`,
    transformer: "superjson",
  });

  res?.send(
    injectScriptToPanel({
      html: panelHtml,
    }),
  );
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext as any,
  }),
);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

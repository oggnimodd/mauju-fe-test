import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";
import { appRouter } from "./node/root";
import { clerkPlugin } from "./node/plugins/clerk";
import { cors } from "@elysiajs/cors";
import { createTRPCContext } from "./node/trpc";
import { renderTrpcPanel } from "trpc-panel";
import { staticPlugin } from "@elysiajs/static";
import { injectScriptToPanel } from "./panel/injectScriptToPanel";

const PORT = 8080;

const app = new Elysia();

app.use(cors()).use(staticPlugin()).use(clerkPlugin());

// Only in development
if (process.env.NODE_ENV === "development") {
  app.get("/panel", ({ set }) => {
    set.headers["Content-Type"] = "text/html";
    const panelHtml = renderTrpcPanel(appRouter, {
      url: process.env.VITE_APP_TRPC_URL || `http://localhost:${PORT}/trpc`,
      transformer: "superjson",
    });

    return injectScriptToPanel(panelHtml);
  });
}

app
  .use(
    trpc(appRouter, {
      createContext: createTRPCContext,
    }),
  )
  .listen(PORT);

console.log(`server is running on port ${PORT}`);

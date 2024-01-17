import React, { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { ClerkProvider } from "@clerk/clerk-react";
import { api } from "trpc";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { getCookie } from "./utils";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const Provider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url:
            import.meta.env.VITE_APP_TRPC_URL || "http://localhost:8080/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              Authorization: `Bearer ${getCookie("__session")}`,
            };
          },
        }),
      ],
      transformer: superjson as any,
    }),
  );

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            defaultColorScheme="dark"
            theme={{
              ...theme,
            }}
          >
            <Notifications position="bottom-right" zIndex={1000} />
            <BrowserRouter>{children}</BrowserRouter>
          </MantineProvider>
        </QueryClientProvider>
      </api.Provider>
    </ClerkProvider>
  );
};

export default Provider;

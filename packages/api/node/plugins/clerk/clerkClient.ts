import { createClerkClient } from "@clerk/clerk-sdk-node";

import { API_URL, API_VERSION, SECRET_KEY } from "./constants";

export const clerkClient = createClerkClient({
  secretKey: SECRET_KEY,
  apiUrl: API_URL,
  apiVersion: API_VERSION,
});

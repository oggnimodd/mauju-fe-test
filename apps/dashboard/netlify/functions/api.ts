import serverless from "serverless-http";
import app from "@acme/express-serverless";

export const handler = serverless(app);

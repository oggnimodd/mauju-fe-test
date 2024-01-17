import { PrismaClient } from "@prisma/client";
// 1. Import libSQL and the Prisma libSQL driver adapter
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const isDev = process.env.NODE_ENV === "development";

// 2. Instantiate libSQL
const libsql = createClient({
  // @ts-expect-error
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 3. Instantiate the libSQL driver adapter
const adapter = new PrismaLibSQL(libsql);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: isDev ? ["query", "error", "warn"] : ["error"],
    adapter: isDev ? null : adapter,
  });

export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

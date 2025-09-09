// Instância do banco de dados do prisma

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

declare global {
  // Using `var` so it attaches to `globalThis` in Node
  // and survives hot-reloads in Next.js during development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

if (process.env.TURSO_DATABASE_URL) {
  const url = process.env.TURSO_DATABASE_URL!;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  const libsql = createClient({ url, authToken });
  const adapter = new PrismaLibSQL(libsql);
  db = globalThis.prisma ?? new PrismaClient({ adapter });
} else {
  db = globalThis.prisma ?? new PrismaClient();
}

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;

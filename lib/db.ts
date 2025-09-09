// Instância do banco de dados do prisma

import { PrismaClient } from "@prisma/client";

declare global {
  // Using `var` so it attaches to `globalThis` in Node
  // and survives hot-reloads in Next.js during development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;

// Instância do banco de dados do prisma

import { PrismaClient } from "../lib/generated/prisma";

declare global {
  let prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;

// Instância do banco de dados do prisma

import { PrismaClient } from "@prisma/client";

declare global {
  // Using `var` so it attaches to `globalThis` in Node
  // and survives hot-reloads in Next.js during development
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let db: PrismaClient;

if (process.env.TURSO_DATABASE_URL) {
  try {
    // Dynamic import to avoid bundling issues
    const { PrismaLibSQL } = require("@prisma/adapter-libsql");
    const { createClient } = require("@libsql/client");

    const url = process.env.TURSO_DATABASE_URL!;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    const libsql = createClient({ 
      url,
      authToken: authToken || undefined // Make authToken optional
    });
    
    const adapter = new PrismaLibSQL(libsql);
    db = globalThis.prisma ?? new PrismaClient({ adapter });
  } catch (error) {
    console.error("Failed to initialize Turso adapter. Falling back to default Prisma Client.", error);
    db = globalThis.prisma ?? new PrismaClient();
  }
} else {
  db = globalThis.prisma ?? new PrismaClient();
}

export default db;
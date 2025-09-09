// Instância do banco de dados do prisma

import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// Função para criar o cliente Turso
function createTursoClient() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url) {
    throw new Error('TURSO_DATABASE_URL is not defined')
  }

  return createClient({
    url,
    authToken: authToken || undefined,
  })
}

// Criar o adapter e cliente Prisma
let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  const libsql = createTursoClient()
  const adapter = new PrismaLibSQL(libsql)
  prisma = new PrismaClient({ adapter })
} else {
  // Para desenvolvimento local, você pode usar SQLite local
  prisma = new PrismaClient()
}

export { prisma }
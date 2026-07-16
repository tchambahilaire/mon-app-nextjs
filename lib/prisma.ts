import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  // Augmenter le timeout des requêtes
  // https://www.prisma.io/docs/orm/reference/prisma-client-reference#timeout
  // Note: dans Prisma 6+, on utilise query_timeout
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

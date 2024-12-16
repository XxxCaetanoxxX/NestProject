import { PrismaClient } from '@prisma/client';

// Cria uma única instância do Prisma e exporta
export const prisma: PrismaClient = new PrismaClient({
  log: ['query'],
});

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

export function initializePrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

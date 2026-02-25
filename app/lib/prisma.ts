import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (typeof url !== "string" || !url.trim()) {
    throw new Error(
      "Prisma: DATABASE_URL must be set in .env (valid PostgreSQL connection string)."
    );
  }
  return new PrismaClient({
    datasourceUrl: url,
    log: ["error", "warn"],
  });
}

export const prisma =
  globalForPrisma.prisma ??
  createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

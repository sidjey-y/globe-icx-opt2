import { PrismaClient } from "../generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma() {
  const url = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_URL;
  if (typeof url !== "string" || !url.trim() || typeof directUrl !== "string" || !directUrl.trim()) {
    throw new Error(
      "Prisma: DATABASE_URL and DIRECT_URL must be set in .env (valid PostgreSQL connection strings)."
    );
  }
  return new PrismaClient({ log: ["error", "warn"] });
}

export const prisma =
  globalForPrisma.prisma ??
  createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

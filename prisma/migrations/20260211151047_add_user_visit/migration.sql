-- AlterTable
ALTER TABLE "Answer" ALTER COLUMN "userEmail" DROP DEFAULT;

-- CreateTable
CREATE TABLE "UserVisit" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVisit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserVisit_userEmail_idx" ON "UserVisit"("userEmail");

-- CreateIndex
CREATE INDEX "UserVisit_createdAt_idx" ON "UserVisit"("createdAt");

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN "userEmail" TEXT NOT NULL DEFAULT '';

-- Update existing rows (if any) - you may need to backfill manually for real data
-- For new installs, no rows exist so this is fine

-- CreateIndex
CREATE INDEX "Answer_userEmail_idx" ON "Answer"("userEmail");

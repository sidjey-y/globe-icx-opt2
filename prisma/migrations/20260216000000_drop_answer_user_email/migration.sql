-- DropIndex
DROP INDEX IF EXISTS "Answer_userEmail_idx";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN IF EXISTS "userEmail";

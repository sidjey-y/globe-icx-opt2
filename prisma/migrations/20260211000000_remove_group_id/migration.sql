-- DropIndex
DROP INDEX IF EXISTS "Answer_groupId_idx";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN IF EXISTS "groupId";

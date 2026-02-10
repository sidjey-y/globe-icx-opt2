/*
  Warnings:

  - The primary key for the `Answer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `EmployeeGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_groupId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "answerText" SET DATA TYPE TEXT,
ADD CONSTRAINT "Answer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Answer_id_seq";

-- DropTable
DROP TABLE "EmployeeGroup";

-- CreateIndex
CREATE INDEX "Answer_createdAt_idx" ON "Answer"("createdAt");

-- CreateIndex
CREATE INDEX "Answer_groupId_idx" ON "Answer"("groupId");

-- CreateIndex
CREATE INDEX "Answer_questionIndex_idx" ON "Answer"("questionIndex");

-- CreateTable
CREATE TABLE "EmployeeGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EmployeeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "seed" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "answerText" VARCHAR(200) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeGroup_name_key" ON "EmployeeGroup"("name");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "EmployeeGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

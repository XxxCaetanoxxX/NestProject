/*
  Warnings:

  - You are about to drop the `HistoryTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoryTest" DROP CONSTRAINT "HistoryTest_testId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_modifiedById_fkey";

-- DropTable
DROP TABLE "HistoryTest";

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "UserAudit" (
    "id" SERIAL NOT NULL,
    "responsibleId" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "version" SERIAL NOT NULL,

    CONSTRAINT "UserAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAudit_responsibleId_key" ON "UserAudit"("responsibleId");

-- AddForeignKey
ALTER TABLE "UserAudit" ADD CONSTRAINT "UserAudit_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

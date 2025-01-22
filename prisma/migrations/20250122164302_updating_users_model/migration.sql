/*
  Warnings:

  - You are about to drop the `UserAudit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updateDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAudit" DROP CONSTRAINT "UserAudit_responsibleId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updateDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userCreatorId" INTEGER,
ADD COLUMN     "version" SERIAL NOT NULL;

-- DropTable
DROP TABLE "UserAudit";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userCreatorId_fkey" FOREIGN KEY ("userCreatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

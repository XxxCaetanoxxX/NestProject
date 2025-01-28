/*
  Warnings:

  - You are about to drop the column `userCreatorId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userCreatorId_fkey`;

-- DropIndex
DROP INDEX `User_userCreatorId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userCreatorId`,
    ADD COLUMN `createdById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `createdById` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateDate` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateDate` DATETIME(3) NOT NULL,
    ADD COLUMN `version` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

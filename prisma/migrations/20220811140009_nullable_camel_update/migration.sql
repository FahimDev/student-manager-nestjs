/*
  Warnings:

  - You are about to drop the column `email` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `token_key` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designation` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_user_id_fkey`;

-- DropIndex
DROP INDEX `Admin_email_key` ON `Admin`;

-- AlterTable
ALTER TABLE `Admin` DROP COLUMN `email`,
    DROP COLUMN `user_id`,
    ADD COLUMN `designation` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `token_key`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `tokenKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Admin_userId_key` ON `Admin`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

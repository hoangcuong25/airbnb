/*
  Warnings:

  - You are about to drop the column `Guest` on the `listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `listing` DROP COLUMN `Guest`,
    ADD COLUMN `maxGuests` INTEGER NOT NULL DEFAULT 1;

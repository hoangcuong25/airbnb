/*
  Warnings:

  - Added the required column `name` to the `ListingImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ListingImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listingimage` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

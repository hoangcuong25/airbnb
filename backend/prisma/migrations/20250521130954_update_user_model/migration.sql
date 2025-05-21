/*
  Warnings:

  - You are about to alter the column `gender` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://res.cloudinary.com/dtaawt3ej/image/upload/v1747292486/q9lmgugyqgrm7q5voatw.jpg',
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    MODIFY `role` ENUM('USER', 'ADMIN', 'HOST') NOT NULL DEFAULT 'USER';

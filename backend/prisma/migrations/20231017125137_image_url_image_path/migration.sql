/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "imageUrl",
ADD COLUMN     "imagePath" TEXT;

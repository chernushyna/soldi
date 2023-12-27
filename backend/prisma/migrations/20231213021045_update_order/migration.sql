/*
  Warnings:

  - Added the required column `address` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

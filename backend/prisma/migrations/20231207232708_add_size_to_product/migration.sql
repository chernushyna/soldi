/*
  Warnings:

  - Added the required column `sizeId` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('XS', 'S', 'M', 'L', 'XL');

-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "sizeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductSizes" (
    "id" TEXT NOT NULL,
    "size" "ProductSize" NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductSizes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sizeId" ON "CartItems"("sizeId");

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "ProductSizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSizes" ADD CONSTRAINT "ProductSizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

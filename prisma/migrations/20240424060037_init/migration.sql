/*
  Warnings:

  - Added the required column `totalNumberOfProduct` to the `SupplierData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupplierData" ADD COLUMN     "totalNumberOfProduct" INTEGER NOT NULL;

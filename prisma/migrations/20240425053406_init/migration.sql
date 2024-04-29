/*
  Warnings:

  - You are about to drop the column `MaxContractPeriod` on the `SupplierData` table. All the data in the column will be lost.
  - Added the required column `maxContractPeriod` to the `SupplierData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `SupplierData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupplierData" DROP COLUMN "MaxContractPeriod",
ADD COLUMN     "maxContractPeriod" INTEGER NOT NULL,
ADD COLUMN     "productPrice" INTEGER NOT NULL;

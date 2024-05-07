/*
  Warnings:

  - You are about to drop the `ProductsDara` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProductsDara";

-- CreateTable
CREATE TABLE "ProductsData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "blockchainaddr" TEXT NOT NULL,

    CONSTRAINT "ProductsData_pkey" PRIMARY KEY ("id")
);

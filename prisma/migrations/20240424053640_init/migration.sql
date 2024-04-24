-- CreateTable
CREATE TABLE "SupplierData" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "supplierWalletAddress" TEXT NOT NULL,
    "MaxContractPeriod" INTEGER NOT NULL,
    "supplierPercentage" INTEGER NOT NULL,

    CONSTRAINT "SupplierData_pkey" PRIMARY KEY ("id")
);

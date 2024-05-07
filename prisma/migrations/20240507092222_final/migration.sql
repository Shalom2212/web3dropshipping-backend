-- CreateTable
CREATE TABLE "ProductsDara" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "blockchainaddr" TEXT NOT NULL,

    CONSTRAINT "ProductsDara_pkey" PRIMARY KEY ("id")
);

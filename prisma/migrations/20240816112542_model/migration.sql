/*
  Warnings:

  - You are about to drop the column `customInt1` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `customInt2` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `customInt3` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "customInt1",
DROP COLUMN "customInt2",
DROP COLUMN "customInt3",
ADD COLUMN     "customInteger1" INTEGER,
ADD COLUMN     "customInteger2" INTEGER,
ADD COLUMN     "customInteger3" INTEGER;

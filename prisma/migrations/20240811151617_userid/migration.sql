-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_userId_fkey";

-- DropIndex
DROP INDEX "Collection_userId_idx";

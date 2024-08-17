/*
  Warnings:

  - You are about to drop the column `customBoolean1State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customBoolean2State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customBoolean3State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customDate1State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customDate2State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customDate3State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customInteger1State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customInteger2State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customInteger3State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customString1State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customString2State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customString3State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customText1State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customText2State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `customText3State` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Item` table. All the data in the column will be lost.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "customBoolean1State",
DROP COLUMN "customBoolean2State",
DROP COLUMN "customBoolean3State",
DROP COLUMN "customDate1State",
DROP COLUMN "customDate2State",
DROP COLUMN "customDate3State",
DROP COLUMN "customInteger1State",
DROP COLUMN "customInteger2State",
DROP COLUMN "customInteger3State",
DROP COLUMN "customString1State",
DROP COLUMN "customString2State",
DROP COLUMN "customString3State",
DROP COLUMN "customText1State",
DROP COLUMN "customText2State",
DROP COLUMN "customText3State";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToTag_AB_unique" ON "_ItemToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToTag_B_index" ON "_ItemToTag"("B");

-- CreateIndex
CREATE INDEX "Collection_categoryId_idx" ON "Collection"("categoryId");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTag" ADD CONSTRAINT "_ItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTag" ADD CONSTRAINT "_ItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

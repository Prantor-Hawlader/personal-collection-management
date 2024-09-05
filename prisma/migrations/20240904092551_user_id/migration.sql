/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `SalesforceToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SalesforceToken_userId_key" ON "SalesforceToken"("userId");

-- CreateTable
CREATE TABLE "SalesforceToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "instanceUrl" TEXT NOT NULL,

    CONSTRAINT "SalesforceToken_pkey" PRIMARY KEY ("id")
);

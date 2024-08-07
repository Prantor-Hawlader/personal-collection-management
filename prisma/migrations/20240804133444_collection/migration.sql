-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "customString1State" BOOLEAN NOT NULL DEFAULT false,
    "customString1Name" TEXT,
    "customString2State" BOOLEAN NOT NULL DEFAULT false,
    "customString2Name" TEXT,
    "customString3State" BOOLEAN NOT NULL DEFAULT false,
    "customString3Name" TEXT,
    "customInteger1State" BOOLEAN NOT NULL DEFAULT false,
    "customInteger1Name" TEXT,
    "customInteger2State" BOOLEAN NOT NULL DEFAULT false,
    "customInteger2Name" TEXT,
    "customInteger3State" BOOLEAN NOT NULL DEFAULT false,
    "customInteger3Name" TEXT,
    "customText1State" BOOLEAN NOT NULL DEFAULT false,
    "customText1Name" TEXT,
    "customText2State" BOOLEAN NOT NULL DEFAULT false,
    "customText2Name" TEXT,
    "customText3State" BOOLEAN NOT NULL DEFAULT false,
    "customText3Name" TEXT,
    "customBoolean1State" BOOLEAN NOT NULL DEFAULT false,
    "customBoolean1Name" TEXT,
    "customBoolean2State" BOOLEAN NOT NULL DEFAULT false,
    "customBoolean2Name" TEXT,
    "customBoolean3State" BOOLEAN NOT NULL DEFAULT false,
    "customBoolean3Name" TEXT,
    "customDate1State" BOOLEAN NOT NULL DEFAULT false,
    "customDate1Name" TEXT,
    "customDate2State" BOOLEAN NOT NULL DEFAULT false,
    "customDate2Name" TEXT,
    "customDate3State" BOOLEAN NOT NULL DEFAULT false,
    "customDate3Name" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "customString1" TEXT,
    "customString2" TEXT,
    "customString3" TEXT,
    "customInt1" INTEGER,
    "customInt2" INTEGER,
    "customInt3" INTEGER,
    "customText1" TEXT,
    "customText2" TEXT,
    "customText3" TEXT,
    "customBoolean1" BOOLEAN,
    "customBoolean2" BOOLEAN,
    "customBoolean3" BOOLEAN,
    "customDate1" TIMESTAMP(3),
    "customDate2" TIMESTAMP(3),
    "customDate3" TIMESTAMP(3),
    "collectionId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

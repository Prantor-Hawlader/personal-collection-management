import dynamic from "next/dynamic";

import prisma from "@/db/prisma";

const ItemTable = dynamic(async () => await import("@/components/ItemTable"), {
  ssr: false,
});
const collection = async ({ params }: { params: { collectionId: string } }) => {
  const { collectionId } = params;
  const items = await prisma.item.findMany({
    where: { collectionId },
  });
  console.log("individual collection page rendered");

  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      items: {
        select: {
          customString1: true,
          customString2: true,
          customString3: true,
          customInt1: true,
          customInt2: true,
          customInt3: true,
          customText1: true,
          customText2: true,
          customText3: true,
          customBoolean1: true,
          customBoolean2: true,
          customBoolean3: true,
          customDate1: true,
          customDate2: true,
          customDate3: true,
        },
      },
    },
  });

  return (
    <div className="w-full h-full">
      <ItemTable collection={collection} item={items} />
    </div>
  );
};

export default collection;

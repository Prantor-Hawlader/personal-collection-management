import dynamic from "next/dynamic";

import prisma from "@/db/prisma";
import AddNewItemBtn from "@/components/AddNewItemBtn";

const ItemTable = dynamic(async () => await import("@/components/ItemTable"), {
  ssr: false,
});
const Collection = async ({ params }: { params: { collectionId: string } }) => {
  const { collectionId } = params;
  const items = await prisma.item.findMany({
    where: { collectionId },
    include: { tags: true, collection: true },
  });
  const tags = await prisma.tag.findMany({
    where: {
      name: {
        in: ["Adventure", "Mysterious"],
      },
    },
  });
  const collection = await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      items: {
        select: {
          customString1: true,
          customString2: true,
          customString3: true,
          customInteger1: true,
          customInteger2: true,
          customInteger3: true,
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
      <AddNewItemBtn collection={collection!} tags={tags} />
      <ItemTable collection={collection!} item={items} tags={tags} />
    </div>
  );
};

export default Collection;

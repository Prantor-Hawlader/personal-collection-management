import dynamic from "next/dynamic";

import prisma from "@/db/prisma";
import AddNewCollection from "@/components/AddnewCollection";

const CollectionTable = dynamic(
  async () => await import("@/components/CollectionTable"),
  {
    ssr: false,
  }
);

const Collections = async () => {
  console.log("Collection page rendered");
  const collections = await prisma.collection.findMany({
    include: {
      user: true,
      category: true,
    },
  });
  const categories = await prisma.category.findMany();

  return (
    <div className="w-full">
      <AddNewCollection categories={categories} />
      <CollectionTable collections={collections} />
    </div>
  );
};

export default Collections;

import dynamic from "next/dynamic";

import prisma from "@/db/prisma";

const PublicCollectionTable = dynamic(
  async () => await import("@/components/PublicCollectionTable"),
  {
    ssr: false,
  }
);

const Collections = async () => {
  const collections = await prisma.collection.findMany({
    include: {
      category: true,
    },
  });

  console.log("public Collection page rendered", collections);

  return (
    <div className="w-full">
      <PublicCollectionTable collections={collections} />
    </div>
  );
};

export default Collections;

import dynamic from "next/dynamic";

import CollectionForm from "@/components/CollectionForm";
import prisma from "@/db/prisma";

const CollectionTable = dynamic(
  async () => await import("@/components/CollectionTable"),
  {
    ssr: false,
  }
);
const Collections = async () => {
  console.log("Collection page rendered");
  const collections = await prisma.collection.findMany();

  return (
    <div>
      <CollectionTable collections={collections} />

      <CollectionForm />
    </div>
  );
};

export default Collections;

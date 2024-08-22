import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import prisma from "@/db/prisma";
import AddNewCollection from "@/components/AddnewCollection";
import { getSession } from "@/lib/session";

const CollectionTable = dynamic(
  async () => await import("@/components/CollectionTable"),
  {
    ssr: false,
  }
);

const myCollection = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  if (!session) redirect("/");

  console.log("Collection page rendered");
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      user: true,
      category: true,
    },
  });
  const categories = await prisma.category.findMany();

  return (
    <div className="w-full">
      <AddNewCollection categories={categories} />
      <CollectionTable categories={categories} collections={collections} />
    </div>
  );
};

export default myCollection;

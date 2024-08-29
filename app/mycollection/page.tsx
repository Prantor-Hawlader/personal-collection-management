import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";
import AddNewCollection from "@/components/AddnewCollection";

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
      <AddNewCollection categories={categories} userId={userId!} />
      <CollectionTable
        categories={categories}
        collections={collections}
        userId={userId!}
      />
    </div>
  );
};

export default myCollection;

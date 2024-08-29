import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";
import AddNewCollection from "@/components/AddnewCollection";

const CollectionTable = dynamic(
  async () => await import("@/components/CollectionTable"),
  {
    ssr: false,
  }
);

const Collection = async ({ params }: { params: { userId: string } }) => {
  const session = await getSession();

  if (session?.user.role !== "admin" || !session) notFound();

  const { userId } = params;
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
      <AddNewCollection categories={categories} userId={userId} />
      <CollectionTable
        categories={categories}
        collections={collections}
        userId={userId}
      />
    </div>
  );
};

export default Collection;

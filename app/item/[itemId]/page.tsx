import Card from "@/components/Card";
import prisma from "@/db/prisma";
const ItemPage = async ({ params }: { params: { itemId: string } }) => {
  const { itemId } = params;
  const item = await prisma.item.findUnique({ where: { id: itemId } });

  return (
    <div
      className={
        "flex h-[500px] w-full flex-col gap-4 lg:h-[350px] lg:flex-row"
      }
    >
      <Card item={item} />
    </div>
  );
};

export default ItemPage;

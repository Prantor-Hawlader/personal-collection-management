import prisma from "@/db/prisma";

const EditItem = async ({ params }: { params: { itemId: string } }) => {
  const { itemId } = params;
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });
  return <div></div>;
};

export default EditItem;

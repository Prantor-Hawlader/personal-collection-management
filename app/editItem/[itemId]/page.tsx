import EditItemForm from "@/components/EditItemForm";
import prisma from "@/db/prisma";

const EditItem = async ({ params }: { params: { itemId: string } }) => {
  const { itemId } = params;

  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { collection: true, tags: true },
  });
  const tags = await prisma.tag.findMany({
    where: {
      name: {
        in: ["Adventure", "Mysterious"],
      },
    },
  });

  return (
    <div>
      <EditItemForm item={item} tags={tags} />
    </div>
  );
};

export default EditItem;

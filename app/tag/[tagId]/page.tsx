import prisma from "@/db/prisma";

const TagItem = async ({ params }: { params: { tagId: string } }) => {
  const { tagId } = params;
  const tags = await prisma.tag.findUnique({
    where: { id: tagId },
    include: { items: true },
  });

  return (
    <div>
      <ol>
        Item Name :
        {tags?.items.map((item) => <li key={item.id}>{item.name}</li>)}
      </ol>
    </div>
  );
};

export default TagItem;

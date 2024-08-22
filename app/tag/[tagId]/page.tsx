import TagCard from "@/components/TagCard";
import prisma from "@/db/prisma";

const TagItem = async ({ params }: { params: { tagId: string } }) => {
  const { tagId } = params;
  const tags = await prisma.tag.findUnique({
    where: { id: tagId },
    include: { items: true },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-xl font-extralight text-cyan-300">
        Items of {tags?.name} tag:
        <TagCard tags={tags!} />
      </div>
    </div>
  );
};

export default TagItem;

"use client";
import { Tag } from "@prisma/client";
import Link from "next/link";

type TagsProps = {
  tags: Tag[];
};
const TagCloud = ({ tags }: TagsProps) => {
  return (
    <div className="flex justify-start flex-wrap gap-2 max-w-sm my-4 text-sm">
      {tags.map((tag: any) => (
        <Link
          key={tag.id}
          className="bg-cyan-300 hover:bg-cyan-400 font-bold dark:bg-green-500 dark:hover:bg-green-600 py-1 px-2 rounded-lg "
          href={`/tag/${tag.id}`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagCloud;

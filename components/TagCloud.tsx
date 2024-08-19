"use client";
import { Tag } from "@prisma/client";
import Link from "next/link";

const TagCloud = ({ tag }: { tag: Tag }) => {
  return (
    <Link
      key={tag.id}
      className="bg-cyan-300 hover:bg-cyan-400 font-bold dark:bg-green-500 dark:hover:bg-green-600 py-1 px-2 rounded-lg "
      href={`/tag/${tag.id}`}
    >
      {tag.name}
    </Link>
  );
};

export default TagCloud;

import Link from "next/link";

import prisma from "@/db/prisma";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const searchTerm = searchParams.q;

  const items = await prisma.item.findMany({
    where: {
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        {
          comments: {
            some: { text: { contains: searchTerm, mode: "insensitive" } },
          },
        },
        { collection: { name: { contains: searchTerm, mode: "insensitive" } } },
      ],
    },
    include: {
      collection: true,
      comments: true,
    },
  });

  return (
    <div className="flex justify-center items-center">
      {items.map((item: any) => (
        <div key={item.id}>
          <span>
            Item name :{" "}
            <Link className="text-blue-600" href={`/item/${item.id}`}>
              {item.name}
            </Link>{" "}
          </span>

          <p>Collection: {item.collection.name}</p>
          {item.comments.some((comment: any) =>
            comment.text.toLowerCase().includes(searchTerm.toLowerCase())
          ) && <p>Found in comments</p>}
        </div>
      ))}
      {items.length === 0 && <p>No results found</p>}
    </div>
  );
}

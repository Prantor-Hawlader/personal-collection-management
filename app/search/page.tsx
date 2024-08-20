import { getSession } from "@/lib/session";
import prisma from "@/db/prisma";
import SearchResultModal from "@/components/SearchResult";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const session = await getSession();
  const searchTerm = searchParams.q;

  if (!session) {
    return <div>Please log in to search.</div>;
  }

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
      userId: session.user.id,
    },
    include: {
      collection: true,
      comments: true,
    },
  });

  return (
    <div>
      <SearchResultModal items={items} searchTerm={searchTerm} />
    </div>
  );
}

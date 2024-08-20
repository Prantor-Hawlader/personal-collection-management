import { getSession } from "@/lib/session";
import prisma from "@/db/prisma";
import SearchResultModal from "@/components/SearchResultModal";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const session = await getSession();
  const searchTerm = searchParams.q;

  if (!session) {
    return <p>Please log in to search.</p>;
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

  return <SearchResultModal items={items} searchTerm={searchTerm} />;
}

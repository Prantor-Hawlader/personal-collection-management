import { Divider } from "@nextui-org/react";

import { subtitle, title } from "@/components/primitives";
import RecentItem from "@/components/RecentItem";
import TagCloud from "@/components/TagCloud";
import TopCollection from "@/components/TopCollection";
import prisma from "@/db/prisma";
export default async function Home() {
  const recentItems = await prisma.item.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: { collection: { include: { user: true } } },
  });

  const largestCollections = await prisma.collection.findMany({
    include: {
      _count: {
        select: {
          items: true,
        },
      },
      user: true,
    },
    orderBy: {
      items: {
        _count: "desc",
      },
    },
    take: 5,
  });
  const tags = await prisma.tag.findMany();
  console.log("HOme rendered");

  return (
    //   <section className="flex flex-col justify-start gap-4 py-8 md:py-10">
    //     <div className="inline-block max-w-lg justify-start">
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="mt-2">
        <h1 className={title()}>Recently added&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>items&nbsp;</h1>
        <Divider />
        <RecentItem recentItems={recentItems} />
      </div>

      <div className="mt-2">
        <h1 className={title()}>Top 5 largest&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>collections&nbsp;</h1>
        <Divider />
        <TopCollection largestCollections={largestCollections} />
      </div>

      <div className="mt-2">
        <h1 className={title()}>Tags&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>cloud&nbsp;</h1>
        <Divider />
        <TagCloud tags={tags} />
      </div>

      <h2 className={subtitle({ class: "mt-4" })}>
        Beautiful Personal Collection Management Application
      </h2>
      {/* </div> */}
    </section>
  );
}

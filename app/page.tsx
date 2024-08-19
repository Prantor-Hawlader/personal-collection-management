import { format } from "date-fns";

import { title, subtitle } from "@/components/primitives";
import prisma from "@/db/prisma";
import Link from "next/link";
import TagCloud from "@/components/TagCloud";
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
    <section className="flex flex-col justify-start gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg justify-start">
        <h1 className={title()}>Recently added&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>items&nbsp;</h1>
        <br />
        {recentItems.map((item) => (
          <div key={item.id} className="flex gap-2">
            <p>{item.name} </p>
            <div>{item.collection.name} </div>
            <div>{item.collection.user.name} </div>
            <p>{format(new Date(item.createdAt), "PPpp")} </p>
          </div>
        ))}
        <h1 className={title()}>Top 5 largest&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>collections&nbsp;</h1>
        {largestCollections.map((collection) => (
          <div key={collection.id} className="flex gap-2">
            <p>{collection.name} </p>
            <p>Created By : {collection.user.name}</p>
          </div>
        ))}
        <h1 className={title()}>Tags&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>cloud&nbsp;</h1>
        <div className="flex justify-center flex-wrap gap-2 p-4 max-w-sm my-4 text-sm">
          {tags.map((tag) => (
            <TagCloud key={tag.id} tag={tag} />
          ))}
        </div>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful Personal Collection Management Application
        </h2>
      </div>
    </section>
  );
}

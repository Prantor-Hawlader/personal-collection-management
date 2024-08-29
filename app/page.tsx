import { Divider } from "@nextui-org/react";
import { getTranslations } from "next-intl/server";

import { subtitle, title } from "@/components/primitives";
import RecentItem from "@/components/RecentItem";
import TagCloud from "@/components/TagCloud";
import TopCollection from "@/components/TopCollection";
import prisma from "@/db/prisma";
import { getSession } from "@/lib/session";
export default async function Home() {
  const t = await getTranslations("HomePage");

  const session = await getSession();
  const userName = session?.user.name;
  const recentItems = await prisma.item.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
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

  return (
    <div>
      <h2 className={subtitle({ class: "text-center" })}>
        {t("greet")},{" "}
        <span className="text-cyan-300 font-mono">
          {session ? userName : "Guest"}
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        <div>
          <h1 className={title()}>{t("title1")}&nbsp;</h1>
          <h1 className={title({ color: "cyan" })}>items&nbsp;</h1>
          <Divider />
          <RecentItem recentItems={recentItems} />
        </div>

        <div>
          <h1 className={title()}>{t("title2")}&nbsp;</h1>
          <h1 className={title({ color: "cyan" })}>collections&nbsp;</h1>
          <Divider />
          <TopCollection largestCollections={largestCollections} />
        </div>

        <div>
          <h1 className={title()}>{t("title3")}&nbsp;</h1>
          <h1 className={title({ color: "cyan" })}>cloud&nbsp;</h1>
          <Divider />
          <TagCloud tags={tags} />
        </div>
      </div>
    </div>
  );
}

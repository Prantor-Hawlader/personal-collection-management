import { redirect } from "next/navigation";
import { Divider } from "@nextui-org/react";
import Link from "next/link";

import { getSession } from "@/lib/session";
import ConnectSalesforce from "@/components/ConnectSalesforce";
import { subtitle } from "@/components/primitives";
import prisma from "@/db/prisma";

const Profile = async () => {
  const session = await getSession();

  if (!session) redirect("/");
  const userId = session.user.id;

  const totalCollections = await prisma.collection.count({
    where: {
      userId: userId,
    },
  });
  const totalItems = await prisma.item.count({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="w-full flex gap-2 justify-center">
        <h2 className={subtitle({ class: "text-center" })}>
          Your have{" "}
          <span className="text-cyan-300 font-mono ">
            {totalCollections}{" "}
            {totalCollections > 1 ? "collections" : "collection"}
          </span>
        </h2>
        <h2 className={subtitle({ class: "text-center" })}>
          Your have{" "}
          <span className="text-cyan-300 font-mono">
            {totalItems} {totalItems > 1 ? "items" : "item"}{" "}
          </span>
        </h2>
      </div>
      <Divider />
      <div className="w-full flex gap-2 items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          Connect with Salesforce is now easy in our website{" "}
        </p>
        <ConnectSalesforce />
      </div>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Wanna see your all tickets?{" "}
        <Link className="text-blue-600 font-bold" href="/help">
          Let&apos;s go
        </Link>
      </p>
      <Divider />
    </div>
  );
};

export default Profile;

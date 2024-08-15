import React from "react";
import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { getSession } from "@/lib/session";
import prisma from "@/db/prisma";
import AdminTable from "@/components/AdminTable";
export default async function Admin() {
  const session = await getSession();
  const user = session?.user;

  if (!user) return redirect("/login");

  if (user?.role !== "admin") return redirect("/");
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className={title()}>Admin </h1>
      <AdminTable users={users} />
    </div>
  );
}

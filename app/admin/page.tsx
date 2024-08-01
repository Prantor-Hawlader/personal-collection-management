import { redirect } from "next/navigation";

import { title } from "@/components/primitives";
import { getSession } from "@/lib/session";

export default async function AboutPage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) return redirect("/login");

  if (user?.role !== "admin") return redirect("/");

  return (
    <div>
      <h1 className={title()}>Admin </h1>
    </div>
  );
}

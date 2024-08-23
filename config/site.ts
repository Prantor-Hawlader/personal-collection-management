import { Session } from "next-auth";
import { getTranslations } from "next-intl/server";

const NavMenu = async (menu: string) => {
  const t = await getTranslations("NavMenu");

  return t(menu);
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Collectioner",
  description: "Store everything you collect.",
  navItems: [
    {
      label: NavMenu("root"),
      href: "/",
    },
    {
      label: NavMenu("cl"),
      href: "/collections",
    },
    {
      label: NavMenu("mcl"),
      href: "/mycollection",
      shouldShow: (session: Session) =>
        session?.user?.role === "user" || session?.user?.role === "admin",
    },

    {
      label: NavMenu("author"),
      href: "/admin",
      shouldShow: (session: Session) => session?.user?.role === "admin",
    },
  ],
};

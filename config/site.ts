import { Session } from "next-auth";

// const NavMenu = async (menu: string) => {
//   const t = await getTranslations("NavMenu");

//   return t(menu);
// };

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Collectioner",
  description: "Store everything you collect.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "My Collection",
      href: "/mycollection",
      shouldShow: (session: Session) =>
        session?.user?.role === "user" || session?.user?.role === "admin",
    },

    {
      label: "Admin",
      href: "/admin",
      shouldShow: (session: Session) => session?.user?.role === "admin",
    },
  ],
};

import { Session } from "next-auth";

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
      label: "My collection",
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

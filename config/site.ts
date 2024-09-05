import { Session } from "next-auth";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Collectioner",
  description: "Store everything you collect.",
  navItems: [
    {
      label: "root",
      href: "/",
    },
    {
      label: "cl",
      href: "/collections",
    },
    {
      label: "mcl",
      href: "/mycollection",
      shouldShow: (session: Session) =>
        session?.user?.role === "user" || session?.user?.role === "admin",
    },
    {
      label: "pf",
      href: "/profile",
      shouldShow: (session: Session) =>
        session?.user?.role === "user" || session?.user?.role === "admin",
    },

    {
      label: "author",
      href: "/admin",
      shouldShow: (session: Session) => session?.user?.role === "admin",
    },
  ],
};

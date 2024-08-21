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
      label: "My collection",
      href: "/mycollection",
    },

    {
      label: "Admin",
      href: "/admin",
      shouldShow: (session: Session) => session?.user?.role === "admin",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};

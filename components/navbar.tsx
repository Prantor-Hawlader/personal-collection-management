import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

import { signOut } from "@/auth";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

import MyButton from "./MyButton";
import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";

export const Navbar = ({ session }: any) => {
  const t = useTranslations("Button");

  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">Collectioner</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {(!item.shouldShow || item.shouldShow(session)) && item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {!session ? (
            <NextLink href="/login">
              <MyButton>{t("login")}</MyButton>
            </NextLink>
          ) : (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <MyButton>{t("logout")}</MyButton>
            </form>
          )}
          <LanguageSwitcher />

          <SearchBar />

          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden lg:flex" />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1" justify="end">
        <LanguageSwitcher />

        <SearchBar />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {(!item.shouldShow || item.shouldShow(session)) && item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="w-1/5">
            {!session ? (
              <NextLink href="/login">
                <MyButton>{t("login")} </MyButton>
              </NextLink>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <MyButton>{t("logout")}</MyButton>
              </form>
            )}
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

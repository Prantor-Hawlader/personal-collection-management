"use server";

import { headers } from "next/headers";

import { Locale, defaultLocale } from "@/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<Locale> {
  const headersList = headers();
  const cookies = headersList.get("cookie") || "";
  const localeCookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));

  if (localeCookie) {
    const locale = localeCookie.split("=")[1].trim() as Locale;

    return locale;
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<Locale> {
  return locale;
}

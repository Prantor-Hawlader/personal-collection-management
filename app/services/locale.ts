"use server";

import { Locale, defaultLocale } from "@/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const { cookies } = await import("next/headers");

  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const { cookies } = await import("next/headers");

  cookies().set(COOKIE_NAME, locale);
}

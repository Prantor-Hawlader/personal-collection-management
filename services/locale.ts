"use server";

import { cookies } from "next/headers";

import { Locale, defaultLocale } from "@/config";

export async function getUserLocale() {
  const COOKIE_NAME = "NEXT_LOCALE";
  const cookieStore = cookies();

  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const COOKIE_NAME = "NEXT_LOCALE";
  const cookieStore = cookies();

  cookieStore.set(COOKIE_NAME, locale);
}

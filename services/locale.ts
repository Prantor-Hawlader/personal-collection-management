"use server";

import { cookies as nextCookies } from "next/headers";

import { Locale, defaultLocale } from "@/config";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(cookies = nextCookies()) {
  return cookies.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale, cookies = nextCookies()) {
  cookies.set(COOKIE_NAME, locale);
}

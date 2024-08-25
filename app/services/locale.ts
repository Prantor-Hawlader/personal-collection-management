"use server";
import { cookies } from "next/headers";
import { setCookie, getCookie } from "cookies-next";

import { Locale, defaultLocale } from "@/config";
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieValue = getCookie(COOKIE_NAME, { cookies });
  const result = (cookieValue as Locale) || defaultLocale;

  return result;
}

export async function setUserLocale(locale: Locale) {
  setCookie(COOKIE_NAME, locale, { cookies });
}

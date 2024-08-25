"use server";
import { cookies } from "next/headers";

import { Locale } from "@/config";

export async function setUserLocale(locale: Locale) {
  cookies().set("INTL_COOKIE", locale);
}

import Cookies from "js-cookie";
import { Locale } from "@/config";

export async function setUserLocale(locale: Locale) {
  Cookies.set("INTL_COOKIE", locale);
}

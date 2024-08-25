import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import { defaultLocale } from "./config";

export default getRequestConfig(async () => {
  const userLocale = cookies().get("INTL_COOKIE")?.value || defaultLocale;

  return {
    locale: userLocale,
    messages: (await import(`./messages/${userLocale}.json`)).default,
  };
});

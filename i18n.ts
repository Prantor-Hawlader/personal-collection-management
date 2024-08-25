import { getRequestConfig } from "next-intl/server";

import { getUserLocale } from "./app/services/locale";

export default getRequestConfig(async () => {
  const userLocale = await getUserLocale();

  return {
    locale: userLocale,
    messages: (await import(`./messages/${userLocale}.json`)).default,
  };
});

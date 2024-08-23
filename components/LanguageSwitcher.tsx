import { useLocale, useTranslations } from "next-intl";

import LanguageSelector from "./LanguageSelector";

export default function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LanguageSelector
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
        },
        {
          value: "de",
          label: t("de"),
        },
      ]}
      label={t("label")}
    />
  );
}

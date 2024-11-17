"use client";

import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { getOptions } from "@/app/i18n/settings";
import enTranslation from "@/app/i18n/locales/en.json";
import trTranslation from "@/app/i18n/locales/tr.json";

i18next.init({
  ...getOptions(),
  resources: {
    en: { translation: enTranslation },
    tr: { translation: trTranslation },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </I18nextProvider>
  );
}
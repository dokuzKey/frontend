"use client";

import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <p> {t("footer.text")}</p>
          <br/>
          <p> <a href="https://github.com/dokuzkey">Github</a> <b>|</b> <a href="https://x.com/dokuzkey">Twitter</a> <b>|</b> <a href="https://instagram.com/use9key">Instagram</a> </p>
        </div>
      </div>
    </footer>
  );
}
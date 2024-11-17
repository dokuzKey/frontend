"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        {t("home.hero.title")}
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        {t("home.hero.subtitle")}
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/register">{t("common.register")}</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/login">{t("common.login")}</Link>
        </Button>
      </div>
    </section>
  );
}
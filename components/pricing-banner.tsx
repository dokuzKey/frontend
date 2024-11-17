"use client";

import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";

export function PricingBanner() {
  const { t } = useTranslation();

  return (
    <section className="py-8">
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <span className="text-4xl font-bold block mb-2">
              {t("common.price")}
            </span>
            <span className="text-xl">{t("common.alwaysFree")}</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
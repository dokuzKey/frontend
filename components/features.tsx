"use client";

import { useTranslation } from "react-i18next";
import { Shield, Laptop, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureIcon = {
  encryption: Shield,
  sync: Laptop,
  notes: FileText,
};

export function Features() {
  const { t } = useTranslation();

  const features = ["encryption", "sync", "notes"];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = FeatureIcon[feature as keyof typeof FeatureIcon];
          return (
            <Card key={feature}>
              <CardHeader>
                <Icon className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>{t(`home.features.${feature}.title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(`home.features.${feature}.description`)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
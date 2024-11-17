"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export function DashboardHeader() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{t("dashboard.welcome")}</h1>
      <Button variant="outline" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        {t("common.logout")}
      </Button>
    </div>
  );
}
"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold text-xl">Sifre</span>
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          {!isAuthPage && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">{t("common.login")}</Link>
              </Button>
              <Button asChild>
                <Link href="/register">{t("common.register")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
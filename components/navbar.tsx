"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");
  const isDashboard = pathname.includes("/dashboard");
  let hasToken = false;
  if (typeof window !== "undefined") {
    const cookies = localStorage.getItem("token");
    hasToken = cookies !== null || cookies !== undefined || cookies !== "" || !cookies;
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">9Key</span>
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
            {isDashboard ? (
            <Button variant="ghost" asChild>
              <Link href="/">{t("common.home")}</Link>
            </Button>
            ) : (
            !isAuthPage && (
              <>
              {hasToken ? (
                <Button variant="ghost" asChild>
                <Link href="/dashboard">{t("dashboard.welcome")}</Link>
                </Button>
              ) : (
                <>
                <Button variant="ghost" asChild>
                  <Link href="/login">{t("common.login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">{t("common.register")}</Link>
                </Button>
                </>
              )}
              </>
            )
            )}
        </div>
      </div>
    </nav>
  );
}
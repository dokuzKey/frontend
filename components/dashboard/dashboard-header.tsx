"use client";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export function DashboardHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  const handleLock = () => {
    setIsLocked(true);
  };

  const handleUnlock = async () => {
    try {
      const username = getCookie("username");
      const response = await axios.post("/auth/login", { username, password });
      if (response.data.status === 1) {
        setIsLocked(false);
        setPassword("");
        setError("");
      }
    } catch (err) {
      setError(t("error.unlock"));
    }
  };

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">{t("auth.screenLocked")}</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("auth.enterPassword")}
          className="mt-4 p-2 border rounded"
        />
        <Button variant="outline" onClick={handleUnlock} className="mt-4">
          {t("common.unlock")}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{t("dashboard.welcome")}</h1>
      <div>
        <Button variant="outline" onClick={handleLock} className="mr-2">
          {t("common.lock")}
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {t("common.logout")}
        </Button>
      </div>
    </div>
  );
}
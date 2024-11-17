"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PasswordCard } from "./password-card";
import { CreatePasswordDialog } from "./create-password-dialog";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface Password {
  id: string;
  siteAddress: string;
  username: string;
  password: string;
  createdAt: string;
}

export function PasswordList() {
  const { t } = useTranslation();
  const [passwords, setPasswords] = useState<Record<string, Password>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchPasswords = async () => {
    const token = getCookie("token");
    try {
      const response = await axios.post("https://api.sifre.org.tr/fetch/passwords", {
        token,
      });
      if (response.data.status === 1) {
        setPasswords(response.data.data);
      }
    } catch (error) {
      toast.error(t("toast.error.fetch"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  if (isLoading) {
    return <div>{t("common.loading")}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("dashboard.passwords.title")}</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("dashboard.passwords.add")}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(passwords).map((password) => (
          <PasswordCard key={password.id} password={password} />
        ))}
      </div>
      <CreatePasswordDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={fetchPasswords}
      />
    </div>
  );
}
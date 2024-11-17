"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PasswordCardProps {
  password: {
    id: string;
    siteAddress: string;
    username: string;
    password: string;
    createdAt: string;
  };
}

export function PasswordCard({ password }: PasswordCardProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg truncate">{password.siteAddress}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t("dashboard.passwords.username")}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{password.username}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(password.username)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {t("dashboard.passwords.password")}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {showPassword ? password.password : "••••••••"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(password.password)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
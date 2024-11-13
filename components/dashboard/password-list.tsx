"use client";

import { Card } from "@/components/ui/card";
import { Globe, Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Password {
  id: string;
  siteAddress: string;
  username: string;
  password: string;
  createdAt: string;
}

export default function PasswordList({
  passwords,
  onUpdate
}: {
  passwords: Record<string, Password>;
  onUpdate: () => void;
}) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = async (text: string, type: "password" | "username") => {
    await navigator.clipboard.writeText(text);
    toast.success(`${type === "password" ? "Password" : "Username"} copied to clipboard`);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(passwords).map((item) => (
        <Card key={item.id} className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <a
              href={item.siteAddress}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              {item.siteAddress}
            </a>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Username</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(item.username, "username")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm font-medium">{item.username}</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Password</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordVisibility(item.id)}
                >
                  {visiblePasswords[item.id] ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(item.password, "password")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-sm font-medium">
              {visiblePasswords[item.id] ? item.password : "••••••••"}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
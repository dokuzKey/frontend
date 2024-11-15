"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getToken } from "@/lib/auth";

export default function CreatePasswordDialog({
  open,
  onOpenChange,
  onSuccess
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      siteAddress: formData.get("siteAddress"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    try {
        const token = await getToken();
      const response = await fetch("https://api.sifre.org.tr/create/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...data, token}),
      });

      const result = await response.json();

      if (result.status === 1) {
        toast.success("Password created successfully");
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(result.message || "Failed to create password");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteAddress">Site Address</Label>
            <Input id="siteAddress" name="siteAddress" type="url" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
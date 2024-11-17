"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getCookie } from "cookies-next";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  siteAddress: z.string().url("Must be a valid URL"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface CreatePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreatePasswordDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreatePasswordDialogProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteAddress: "",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const token = getCookie("token");
      const response = await axios.post("https://api.sifre.org.tr/create/passwords", {
        token,
        ...values,
      });
      if (response.data.status === 1) {
        toast.success(t("toast.success.passwordCreated")), {
            theme: "dark",
            }
        onSuccess();
        onOpenChange(false);
        form.reset();
      }
    } catch (error) {
      toast.error(t("toast.error.passwordCreation")), {
        theme: "dark",
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dashboard.create.password.title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="siteAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dashboard.create.password.siteAddress")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dashboard.create.password.username")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dashboard.create.password.password")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className=" w-full" disabled={isLoading}>
              {isLoading ? t("common.loading") : t("dashboard.create.password.submit")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
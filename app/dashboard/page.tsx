"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PasswordList } from "@/components/dashboard/password-list";
import { NoteList } from "@/components/dashboard/note-list";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <Tabs defaultValue="passwords" className="mt-8">
        <TabsList>
          <TabsTrigger value="passwords">Passwords</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="passwords">
          <PasswordList />
        </TabsContent>
        <TabsContent value="notes">
          <NoteList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
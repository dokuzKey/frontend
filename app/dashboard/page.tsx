"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PasswordList from "@/components/dashboard/password-list";
import NotesList from "@/components/dashboard/notes-list";
import DashboardHeader from "@/components/dashboard/header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getToken } from "@/lib/auth";


export default function DashboardPage() {
  const router = useRouter();
  const [passwords, setPasswords] = useState<Record<string, any>>({});
  const [notes, setNotes] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = await getToken();

      const passwordRes = await fetch("https://api.sifre.org.tr/fetch/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "token": token }),
      });

      const notesRes = await fetch("https://api.sifre.org.tr/fetch/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "token": token }),
      });
  
      const passwordsData = await passwordRes.json();
      const notesData = await notesRes.json();
      
      if (passwordsData.status === 1) {
        setPasswords(passwordsData.data);
      }
      if (notesData.status === 1) {
        setNotes(notesData.data);
      }
    } catch (error: any) {
      toast.error("Failed to load data: DASH_PAGE_FETCH_DATA");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onDataUpdate={fetchData} />
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="passwords" className="space-y-4">
          <TabsList>
            <TabsTrigger value="passwords">Passwords</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="passwords">
            <PasswordList passwords={passwords} onUpdate={fetchData} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesList notes={notes} onUpdate={fetchData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
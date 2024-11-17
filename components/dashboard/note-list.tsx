"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NoteCard } from "./note-card";
import { CreateNoteDialog } from "./create-note-dialog";
import { useTranslation } from "react-i18next";
import { notesApi, type NoteData } from "@/lib/api";

export function NoteList() {
  const { t } = useTranslation();
  const [notes, setNotes] = useState<Record<string, NoteData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchNotes = async () => {
    const token = getCookie("token") as string;
    try {
      const response = await notesApi.fetch(token);
      if (response.data.status === 1) {
        setNotes(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (isLoading) {
    return <div>{t("common.loading")}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t("dashboard.notes.title")}</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t("dashboard.notes.add")}
        </Button>
      </div>
      {Object.keys(notes).length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t("dashboard.notes.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(notes).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
      <CreateNoteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={fetchNotes}
      />
    </div>
  );
}
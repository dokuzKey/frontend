"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Note {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function NotesList({
  notes,
  onUpdate
}: {
  notes: Record<string, Note>;
  onUpdate: () => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.values(notes).map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
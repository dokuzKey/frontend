"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    body: string;
    createdAt: string;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {note.body}
        </p>
      </CardContent>
    </Card>
  );
}
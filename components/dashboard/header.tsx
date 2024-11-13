"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreatePasswordDialog from "./create-password-dialog";
import CreateNoteDialog from "./create-note-dialog";
import { useState } from "react";

export default function DashboardHeader({ onDataUpdate }: { onDataUpdate: () => void }) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowPasswordDialog(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Password
          </Button>
          <Button
            onClick={() => setShowNoteDialog(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Note
          </Button>
        </div>
      </div>
      <CreatePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        onSuccess={onDataUpdate}
      />
      <CreateNoteDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
        onSuccess={onDataUpdate}
      />
    </div>
  );
}
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteNoteButtonProps {
  noteId: number;
}

export function DeleteNoteButton({ noteId }: DeleteNoteButtonProps) {
  const router = useRouter();
  const deleteNote = api.notes.delete.useMutation({
    onSuccess: () => {
      router.replace("/notes");
    },
  });

  const deleteNoteHandler = () => {
    deleteNote.mutate({ id: noteId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteNoteHandler}
            disabled={deleteNote.isPending}
          >
            {deleteNote.isPending ? "Deleting ..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

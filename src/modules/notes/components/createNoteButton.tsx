"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorMessage } from "./errorMessage";

export function CreateNewNoteDialog() {
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const newNote = api.notes.create.useMutation({
    onSuccess: async (noteId) => {
      if (!noteId || "error" in noteId) {
        setIsError(true);
        return;
      }
      setTitle("");
      router.push(`/notes/edit?id=${noteId?.id}`, {});
    },
  });

  const createNote = () => {
    setIsError(false);
    newNote.mutate({ title });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Note</DialogTitle>
          <DialogDescription>
            Enter the title of your new note.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          {isError && (
            <div className="col-span-4">
              <ErrorMessage hideButton />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            disabled={newNote.isPending}
            type="button"
            onClick={createNote}
          >
            {newNote.isPending ? "Creating Note" : "Create Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

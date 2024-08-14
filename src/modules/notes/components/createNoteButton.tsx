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
import { redirect } from "next/navigation";
import { useState } from "react";

export function CreateNewNoteDialog() {
  const [title, setTitle] = useState("");
  const newNote = api.notes.create.useMutation({
    onSuccess: async ({ data }) => {
      console.log(data);
      setTitle("");
      redirect(`/notes/edit?id=${data.id}`);
    },
  });

  const createNote = () => {
    newNote.mutate({ title });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create new Note</Button>
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
        </div>
        <DialogFooter>
          <Button
            disabled={newNote.isPending}
            type="button"
            onClick={createNote}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

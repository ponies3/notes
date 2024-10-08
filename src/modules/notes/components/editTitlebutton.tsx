"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditTitleButtonProps {
  noteId: number;
  previousTitle: string;
}

export function EditTitleButton({
  noteId,
  previousTitle,
}: EditTitleButtonProps) {
  const [title, setTitle] = useState(previousTitle);
  const router = useRouter();

  const updateNoteTitle = api.notes.save.useMutation({
    onSuccess: async () => {
      setTitle("");
      router.refresh();
    },
  });

  const updateNoteTitleHandler = () => {
    updateNoteTitle.mutate({ id: noteId, title });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Pencil size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit title</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              placeholder="Enter new title"
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={updateNoteTitle.isPending || !title}
              type="button"
              onClick={updateNoteTitleHandler}
            >
              {updateNoteTitle.isPending ? "Updating Title" : "Update Title"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

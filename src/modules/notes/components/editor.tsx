"use client";

import { useEffect, useState } from "react";
import {
  Tldraw,
  createTLStore,
  getSnapshot,
  loadSnapshot,
  useEditor,
} from "tldraw";
import "tldraw/tldraw.css";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { Note } from "../domain/note";

interface EditorProps {
  note: Note;
}

export function Editor({ note }: EditorProps) {
  const [store] = useState(() => {
    const newStore = createTLStore();
    if (!note.content) {
      return newStore;
    }
    const snapshot = JSON.parse(note.content);
    loadSnapshot(newStore, snapshot);
    return newStore;
  });
  return (
    <div className="h-screen w-full">
      <Tldraw
        store={store}
        components={{
          SharePanel: SaveToolbar,
        }}
      />
    </div>
  );
}

function SaveToolbar() {
  const params = useSearchParams();
  const id = params.get("id");
  const editor = useEditor();
  const updateNote = api.notes.save.useMutation({
    onSuccess: () => {
      console.log("Saved");
    },
  });
  const save = () => {
    const { document, session } = getSnapshot(editor.store);
    updateNote.mutate({
      id: Number(id),
      content: JSON.stringify({ document, session }),
    });
  };
  useEffect(() => {
    const unlisten = editor.store.listen(
      (update) => {
        console.log("update", update);
      },
      { scope: "document", source: "user" },
    );
  }, []);

  return (
    <div className="h-fit w-full p-2">
      <Button
        className="pointer-events-auto"
        onClick={save}
        disabled={updateNote.isPending}
      >
        {updateNote.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}

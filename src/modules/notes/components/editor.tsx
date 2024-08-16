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
  className?: string;
}

export function Editor({ note, className }: EditorProps) {
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
    <div className={`h-full w-full ${className}`}>
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
  const [firstRender, setFirstRender] = useState(true);
  const [updated, setUpdated] = useState(0);
  const editor = useEditor();

  const params = useSearchParams();
  const id = params.get("id");

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

  const unlisten = editor.store.listen(
    () => {
      setUpdated(Date.now());
    },
    { scope: "document", source: "user" },
  );

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    const timeOutId = setTimeout(() => {
      save();
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [updated]);

  useEffect(() => {
    return () => {
      unlisten();
    };
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

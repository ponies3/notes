"use client";

import { useEffect, useState } from "react";
import {
  type TLStoreSnapshot,
  Tldraw,
  createTLStore,
  loadSnapshot,
} from "tldraw";
import "tldraw/tldraw.css";
import { type Note } from "@/modules/notes/domain/note";
import { SaveToolbar } from "./saveToolbar";
import { RotateOneShape } from "./rotateTools";

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
    const snapshot = JSON.parse(note.content) as TLStoreSnapshot;
    loadSnapshot(newStore, snapshot);

    return newStore;
  });

  useEffect(() => {
    if (!note.content) {
      return;
    }
    loadSnapshot(store, JSON.parse(note.content) as TLStoreSnapshot);
  }, [note.id]);

  return (
    <div className={`h-full w-full ${className}`}>
      <Tldraw
        store={store}
        components={{
          SharePanel: SaveToolbar,
          StylePanel: RotateOneShape,
        }}
      />
    </div>
  );
}

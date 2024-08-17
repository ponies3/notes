"use client";

import { useEffect, useState } from "react";
import {
  DefaultStylePanel,
  DefaultStylePanelContent,
  Tldraw,
  createTLStore,
  getSnapshot,
  loadSnapshot,
  useEditor,
  useRelevantStyles,
} from "tldraw";
import "tldraw/tldraw.css";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Note } from "../domain/note";
import { RotateCcw, RotateCw } from "lucide-react";

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

  useEffect(() => {
    if (!note.content) {
      return;
    }
    loadSnapshot(store, JSON.parse(note.content));
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

function SaveToolbar() {
  const [firstRender, setFirstRender] = useState(true);
  const router = useRouter();
  const [updated, setUpdated] = useState(0);
  const editor = useEditor();

  const params = useSearchParams();
  const id = params.get("id");

  const [noteId, setNoteId] = useState<number>(Number(id));

  const updateNote = api.notes.save.useMutation({
    onSuccess: () => {},
  });

  const save = () => {
    const { document, session } = getSnapshot(editor.store);
    updateNote.mutate(
      {
        id: Number(id),
        content: JSON.stringify({ document, session }),
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  };

  const unlisten = editor.store.listen(
    () => {
      setUpdated(Date.now());
    },
    { scope: "document", source: "user" },
  );

  useEffect(() => {
    if (firstRender || noteId !== Number(id)) {
      setFirstRender(false);
      setNoteId(Number(id));
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
    <div className="flex h-fit w-full flex-row justify-end p-2">
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

function RotateOneShape() {
  const editor = useEditor();
  const styles = useRelevantStyles();

  const rotateShape = (radiants: number) => {
    const isOneShape = editor.getSelectedShapeIds().length === 1;

    if (!isOneShape) {
      return;
    }

    const shapeId = editor.getSelectedShapeIds()[0];

    if (!shapeId) {
      return;
    }

    const shape = editor.getShape(shapeId);

    if (!shape) {
      return;
    }

    let newRotation = shape.rotation + radiants;

    if (newRotation >= Math.PI * 2) {
      newRotation = newRotation - Math.PI * 2;
    }

    if (newRotation < 0) {
      newRotation = Math.PI * 2 + newRotation;
    }

    editor.updateShape({
      id: shapeId,
      rotation: shape.rotation - radiants,
      type: shape.type,
    });
  };

  return (
    <DefaultStylePanel>
      <DefaultStylePanelContent styles={styles} />
      <div className={`flex h-fit w-full flex-row justify-between gap-2 p-2`}>
        <Button
          className="pointer-events-auto"
          onClick={() => rotateShape(Math.PI / 2)}
        >
          <RotateCcw />
        </Button>
        <Button
          className="pointer-events-auto"
          onClick={() => rotateShape(-(Math.PI / 2))}
        >
          <RotateCw />
        </Button>
      </div>
    </DefaultStylePanel>
  );
}

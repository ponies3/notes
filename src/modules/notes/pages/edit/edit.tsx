"use client";

import { useEffect } from "react";
import { Tldraw, getSnapshot, useEditor } from "tldraw";
import "tldraw/tldraw.css";
import { Button } from "~/components/ui/button";

interface EditorProps {
  noteId: string;
}

export function Editor({ noteId }: EditorProps) {
  return (
    <div className="h-screen w-full">
      <Tldraw
        persistenceKey={noteId}
        components={{
          SharePanel: SaveToolbar,
        }}
      />
    </div>
  );
}

function SaveToolbar() {
  const editor = useEditor();
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
        onClick={() => {
          const { document, session } = getSnapshot(editor.store);
          console.log(document);
          console.log(session);
        }}
      >
        Save
      </Button>
    </div>
  );
}

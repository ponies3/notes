import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSnapshot, useEditor } from "tldraw";

export function SaveToolbar() {
  const { id } = useParams();
  const [firstRender, setFirstRender] = useState(true);
  const [noteId, setNoteId] = useState<number>(Number(id));
  const [updated, setUpdated] = useState(0);
  const router = useRouter();
  const editor = useEditor();
  const updateNote = api.notes.save.useMutation();

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

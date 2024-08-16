import { api } from "@/trpc/server";
import { Editor } from "@/modules/notes/components/editor";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditTitleButton } from "../../components/editTitlebutton";

interface NoteEditorProps {
  id: number;
}

export async function NoteEditor({ id }: NoteEditorProps) {
  const note = await api.notes.getById({ id });
  if (!note) {
    return notFound();
  }
  return (
    <main className="h-[90vh]">
      <section className="container mx-auto h-full px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center gap-2 text-2xl font-bold">
          <h2>Edit Note: {note.title}</h2>
          <EditTitleButton noteId={note.id} />
        </div>
        <Suspense fallback="Loading...">
          <Editor note={note} />
        </Suspense>
      </section>
    </main>
  );
}

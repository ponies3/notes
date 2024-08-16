import { api } from "@/trpc/server";
import { Editor } from "@/modules/notes/components/editor";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditTitleButton } from "../../components/editTitlebutton";
import { Header } from "@/components/header";
import { BackButton } from "@/components/backButton";

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
      <Header>
        <div className="container relative flex w-full items-center gap-2 pl-20 text-4xl font-bold">
          <BackButton className="absolute left-0" href="/notes" />
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <h2 className="truncate">{note.title}</h2>
            <EditTitleButton noteId={note.id} />
          </div>
        </div>
      </Header>
      <section className="container mx-auto h-full px-4 py-12 md:px-6">
        <Suspense fallback="Loading...">
          <Editor note={note} />
        </Suspense>
      </section>
    </main>
  );
}

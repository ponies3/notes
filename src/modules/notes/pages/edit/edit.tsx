import { api } from "@/trpc/server";
import { Editor } from "@/modules/notes/components/editor/editor";
import { notFound } from "next/navigation";
import { EditTitleButton } from "../../components/editTitlebutton";
import { Header } from "@/components/header";
import { BackButton } from "@/components/backButton";
import { DeleteNoteButton } from "../../components/deleteNoteButton";

interface NoteEditorProps {
  id: number;
}

export async function NoteEditor({ id }: NoteEditorProps) {
  const note = await api.notes.getById({ id });
  if (!note) {
    return notFound();
  }

  return (
    <main className="h-full">
      <Header>
        <div className="flex w-full items-center justify-between gap-2 pr-4 text-4xl font-bold">
          <BackButton href="/notes" />
          <div className="flex w-full flex-row items-center justify-center gap-2 md:max-w-[600px] xl:max-w-[900px] 2xl:max-w-[1100px]">
            <h2 className="truncate">{note.title}</h2>
            <EditTitleButton noteId={note.id} />
          </div>
          <DeleteNoteButton noteId={note.id} />
        </div>
      </Header>
      <section className="h-[calc(100vh-56px)] border-2 shadow">
        <Editor note={note} />
      </section>
    </main>
  );
}

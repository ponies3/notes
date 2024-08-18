import { NoteEditor } from "@/modules/notes/pages/edit/edit";
import { api } from "@/trpc/server";

interface NotesEditorPageProps {
  params: {
    id: string;
  };
}

export default function NotesEditorPage({ params }: NotesEditorPageProps) {
  return <NoteEditor id={Number(params.id)} />;
}

export async function generateMetadata({ params }: NotesEditorPageProps) {
  const note = await api.notes.getById({ id: Number(params.id) });

  return {
    title: `${note?.title} | Notes app`,
  };
}

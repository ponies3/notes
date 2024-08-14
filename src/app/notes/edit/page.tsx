import { NoteEditor } from "@/modules/notes/pages/edit/edit";

interface NotesEditorPageProps {
  searchParams: {
    id: string;
  };
}

export default function NotesEditorPage({
  searchParams,
}: NotesEditorPageProps) {
  return <NoteEditor id={Number(searchParams.id)} />;
}

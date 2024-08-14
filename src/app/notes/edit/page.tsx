import { Editor } from "@/modules/notes/pages/edit/edit";

interface NotesEditorPageProps {
  searchParams: {
    id: string;
  };
}

export default function NotesEditorPage({
  searchParams,
}: NotesEditorPageProps) {
  return <Editor noteId={searchParams.id} />;
}

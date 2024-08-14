import { api } from "@/trpc/server";
import { Editor } from "@/modules/notes/components/editor";

interface NoteEditorProps {
  id: number;
}

export async function NoteEditor({ id }: NoteEditorProps) {
  const note = await api.notes.getById({ id });
  console.log(note);
  return <>{note && <Editor note={note} />}</>;
}

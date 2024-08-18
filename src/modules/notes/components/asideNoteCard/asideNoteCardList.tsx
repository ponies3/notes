import { api } from "@/trpc/server";
import { AsideNoteCard } from "@/modules/notes/components/asideNoteCard/asideNoteCard";
import { ErrorMessage } from "@/modules/notes/components/errorMessage";

export async function AsideNoteCardList() {
  const notes = await api.notes.getLastUpdates();

  if ("error" in notes) {
    return <ErrorMessage hideButton />;
  }

  const renderNote = (note: (typeof notes)[0]) => {
    return <AsideNoteCard key={note.id} note={note} />;
  };

  return <>{notes.map(renderNote)}</>;
}

import { api } from "@/trpc/server";
import { AsideNoteCard } from "./asideNoteCard";
import { ErrorMessage } from "./errorMessage";

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

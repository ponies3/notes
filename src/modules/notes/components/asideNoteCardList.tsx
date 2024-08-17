import { api } from "@/trpc/server";
import { AsideNoteCard } from "./asideNoteCard";
import { ErrorMessage } from "./errorMessage";

export async function AsideNoteCardList() {
  const notes = await api.notes.getLastUpdates();

  if ("error" in notes) {
    return <ErrorMessage hideButton />;
  }

  return (
    <>
      {notes.map((note) => (
        <AsideNoteCard key={note.id} note={note} />
      ))}
    </>
  );
}

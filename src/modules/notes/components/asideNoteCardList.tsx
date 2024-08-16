import { api } from "@/trpc/server";
import { AsideNoteCard } from "./asideNoteCard";

export async function AsideNoteCardList() {
  const notes = await api.notes.getLastUpdates();
  return (
    <>
      {notes.map((note) => (
        <AsideNoteCard key={note.id} note={note} />
      ))}
    </>
  );
}

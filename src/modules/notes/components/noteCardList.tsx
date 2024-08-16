import { api } from "@/trpc/server";
import { NoteCard } from "./noteCard";

export async function NoteCardList() {
  const notes = await api.notes.geAll();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

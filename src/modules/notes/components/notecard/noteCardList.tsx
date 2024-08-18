import { api } from "@/trpc/server";
import { NoteCard } from "./noteCard";
import { ErrorMessage } from "../errorMessage";

export async function NoteCardList({ search }: { search?: string }) {
  const notes = await api.notes.search({ search });

  if ("error" in notes) {
    return <ErrorMessage />;
  }

  if (search && notes.length === 0) {
    return <div className="text-center">No notes found</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="text-center">No notes yet, create your first Note!!</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

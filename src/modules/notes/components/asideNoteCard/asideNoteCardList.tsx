import { api } from "@/trpc/server";
import { AsideNoteCard } from "@/modules/notes/components/asideNoteCard/asideNoteCard";
import { ErrorMessage } from "@/modules/notes/components/errorMessage";

export async function AsideNoteCardList() {
  const notes = await api.notes.getLastUpdates();

  if ("error" in notes) {
    return <ErrorMessage hideButton />;
  }

  if (notes.length === 0) {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-8">
        <h3>No notes modified</h3>
      </div>
    );
  }

  const renderNote = (note: (typeof notes)[0]) => {
    return <AsideNoteCard key={note.id} note={note} />;
  };

  return <>{notes.map(renderNote)}</>;
}

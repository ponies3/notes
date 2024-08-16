import { api } from "@/trpc/server";
import { CreateNewNoteDialog } from "../../components/createNoteButton";
import { NoteCard, NoteCardListSkeleton } from "../../components/noteCard";
import { Suspense } from "react";
import { NoteCardList } from "../../components/noteCardList";

export async function NotesList() {
  const notes = await api.notes.geAll();
  return (
    <main>
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Notes</h2>
          <CreateNewNoteDialog />
        </div>
        <Suspense fallback={<NoteCardListSkeleton />}>
          <NoteCardList />
        </Suspense>
      </section>
    </main>
  );
}

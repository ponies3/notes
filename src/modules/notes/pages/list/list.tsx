import { CreateNewNoteDialog } from "../../components/createNoteButton";
import { NoteCardListSkeleton } from "../../components/notecard/noteCard";
import { Suspense } from "react";
import { NoteCardList } from "../../components/notecard/noteCardList";
import { NotebookText } from "lucide-react";

export async function NotesList() {
  return (
    <main>
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            <NotebookText /> My Notes
          </h2>
          <CreateNewNoteDialog />
        </div>
        <Suspense fallback={<NoteCardListSkeleton />}>
          <NoteCardList />
        </Suspense>
      </section>
    </main>
  );
}

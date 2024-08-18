import { CreateNewNoteDialog } from "@/modules/notes/components/createNoteButton";
import { NoteCardListSkeleton } from "@/modules/notes/components/notecard/noteCardListSkeleton";
import { Suspense } from "react";
import { NoteCardList } from "../../components/notecard/noteCardList";
import { NotebookText } from "lucide-react";
import { Searcher } from "../../components/searcher/searcher";

interface NotesListProps {
  search?: string;
}

export async function NotesList({ search }: NotesListProps) {
  return (
    <main>
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex w-full flex-col items-start justify-start gap-8">
          <h2 className="flex items-center gap-1 text-2xl font-bold">
            <NotebookText /> My Notes
          </h2>
          <div className="flex w-full items-center justify-between gap-4">
            <Searcher className="" />
            <CreateNewNoteDialog />
          </div>
        </div>
        <Suspense fallback={<NoteCardListSkeleton />}>
          <NoteCardList search={search} />
        </Suspense>
      </section>
    </main>
  );
}

import { AsideNoteCardList } from "@/modules/notes/components/asideNoteCard/asideNoteCardList";
import { AsideNoteCardListSkeleton } from "@/modules/notes/components/asideNoteCard/asideNoteCardListSkeleton";
import { History } from "lucide-react";
import { Suspense } from "react";

export function Aside() {
  return (
    <aside
      className={`hidden h-screen w-72 flex-none flex-col gap-2 overflow-y-auto bg-zinc-100 px-4 py-12 md:px-6 lg:flex`}
    >
      <h2 className="flex items-center gap-1 text-base font-bold">
        <History size={20} /> Modified notes history
      </h2>
      <Suspense fallback={<AsideNoteCardListSkeleton />}>
        <AsideNoteCardList />
      </Suspense>
    </aside>
  );
}

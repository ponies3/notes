import { AsideNoteCardList } from "@/modules/notes/components/asideNoteCardList";
import { History } from "lucide-react";
import { Suspense } from "react";

export function Aside() {
  return (
    <aside
      className={`mx-auto hidden h-screen w-72 flex-col gap-2 overflow-y-auto bg-zinc-100 px-4 py-12 md:px-6 lg:flex`}
    >
      <h2 className="flex items-center gap-1 text-base font-bold">
        <History size={20} /> Modified notes history
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <AsideNoteCardList />
      </Suspense>
    </aside>
  );
}

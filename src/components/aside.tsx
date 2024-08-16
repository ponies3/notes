import { AsideNoteCardList } from "@/modules/notes/components/asideNoteCardList";
import { Suspense } from "react";

export async function Aside() {
  return (
    <aside
      className={`mx-auto hidden h-screen w-72 flex-col gap-2 bg-zinc-100 px-4 py-12 md:px-6 lg:flex`}
    >
      <h2 className="text-2xl font-bold">Modified notes history</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <AsideNoteCardList />
      </Suspense>
    </aside>
  );
}

import { NoteCardSkeleton } from "./noteCardSkeleton";

export function NoteCardListSkeleton() {
  const items = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </div>
  );
}

import { AsideNoteCardSkeleton } from "@/modules/notes/components/asideNoteCard/asideNoteCardSkeleton";

export function AsideNoteCardListSkeleton() {
  const items = Array.from({ length: 5 });

  const renderSkeleton = (_: unknown, index: number) => {
    return <AsideNoteCardSkeleton key={index} />;
  };

  return <>{items.map(renderSkeleton)}</>;
}

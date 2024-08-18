import { Skeleton } from "@/components/ui/skeleton";

export function AsideNoteCardSkeleton() {
  return (
    <div className="flex h-[72px] animate-pulse flex-col items-start justify-between gap-2 rounded-md border-2 border-muted p-2">
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-1/2 rounded-lg" />
    </div>
  );
}

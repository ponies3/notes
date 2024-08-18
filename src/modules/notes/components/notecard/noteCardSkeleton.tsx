import { Skeleton } from "@/components/ui/skeleton";

export function NoteCardSkeleton() {
  return (
    <div className="flex h-[86px] animate-pulse flex-col items-start justify-between gap-2 rounded-md border-2 border-muted p-2">
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-1/2 rounded-lg" />
    </div>
  );
}

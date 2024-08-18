import { Skeleton } from "@/components/ui/skeleton";
import { type Note } from "@/modules/notes/domain/note";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface AsideNoteCardProps {
  note: Note;
}

export function AsideNoteCard({ note }: AsideNoteCardProps) {
  return (
    <Card className="hover:shadow-lg">
      <Link href={`/notes/edit/${note.id}`}>
        <CardContent className="p-3">
          <h3 className="truncate text-base font-semibold"> {note.title}</h3>
          <span className="text-sm text-muted-foreground">
            {note.updatedAt?.toLocaleString()}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}

export function NoteCardSkeleton() {
  return (
    <div className="flex h-[100px] animate-pulse flex-col items-start justify-between gap-2 rounded-md border-2 border-muted p-2">
      <Skeleton className="h-6 w-1/2 rounded-lg" />
      <Skeleton className="h-6 w-full rounded-lg" />
    </div>
  );
}

export function NoteCardListSkeleton() {
  const items = Array.from({ length: 8 });

  return (
    <>
      {items.map((_, index) => (
        <NoteCardSkeleton key={index} />
      ))}
    </>
  );
}

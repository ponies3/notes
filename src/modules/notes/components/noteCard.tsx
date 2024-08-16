import { Card, CardContent } from "@/components/ui/card";
import { Note } from "../domain/note";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface NoteCardProps {
  note: Note;
}
export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="hover:shadow-lg">
      <Link href={`/notes/edit?id=${note.id}`} key={note.id}>
        {/* <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
          Aqui iria una preview.
        </div> */}
        <CardContent className="p-4">
          <h3 className="truncate text-lg font-semibold"> {note.title}</h3>
          <span className="text-sm text-muted-foreground">
            {note.createdAt.toDateString()}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}

export function NoteCardSkeleton() {
  return (
    <div className="flex h-[86px] animate-pulse flex-col items-start justify-between gap-2 rounded-md border-2 border-muted p-2">
      <Skeleton className="h-6 w-full rounded-lg" />
      <Skeleton className="h-6 w-1/2 rounded-lg" />
    </div>
  );
}

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

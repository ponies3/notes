import { Card, CardContent } from "@/components/ui/card";
import { Note } from "../domain/note";
import Link from "next/link";

interface NoteCardProps {
  note: Note;
}
export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="group hover:shadow-lg">
      <Link href={`/notes/edit?id=${note.id}`} key={note.id}>
        <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
          {/* preview */}
        </div>
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

import { Card, CardContent } from "@/components/ui/card";
import { type Note } from "../../domain/note";
import Link from "next/link";

interface NoteCardProps {
  note: Note;
}
export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card className="hover:shadow-lg">
      <Link href={`/notes/edit/${note?.id}`} key={note.id}>
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

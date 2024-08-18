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

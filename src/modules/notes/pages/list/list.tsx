import Link from "next/link";
import { Button } from "~/components/ui/button";
import { HydrateClient, api } from "~/trpc/server";

export async function NotesList() {
  const notes = await api.notes.geAll();
  return (
    <HydrateClient>
      <main>
        <h1>Notes</h1>
        <div>
          <Button asChild>
            <Link href="/notes/create">Create Note</Link>
          </Button>
        </div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </main>
    </HydrateClient>
  );
}

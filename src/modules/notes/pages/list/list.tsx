import { HydrateClient, api } from "@/trpc/server";
import { CreateNewNoteDialog } from "../../components/createNoteButton";
import Link from "next/link";

export async function NotesList() {
  const notes = await api.notes.geAll();
  return (
    <HydrateClient>
      <main>
        <h1>Notes</h1>
        <div>
          <CreateNewNoteDialog />
        </div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link href={`/notes/edit?id=${note.id}`} key={note.id}>
                {note.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </HydrateClient>
  );
}

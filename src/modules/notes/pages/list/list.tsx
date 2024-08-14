import { HydrateClient, api } from "@/trpc/server";
import { CreateNewNoteDialog } from "../../components/createNoteButton";

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
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </main>
    </HydrateClient>
  );
}

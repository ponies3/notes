import { HydrateClient, api } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreateNewNoteDialog } from "../../components/createNoteButton";
import Link from "next/link";
import { NoteCard } from "../../components/noteCard";

export async function NotesList() {
  const notes = await api.notes.geAll();
  return (
    <main>
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Notes</h2>
          <CreateNewNoteDialog />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </section>
    </main>
  );
}

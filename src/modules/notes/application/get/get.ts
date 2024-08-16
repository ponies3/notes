import { db } from "@/server/db";
import { Note } from "../../domain/note";

export async function getNoteById(id: number) {
  return await db.query.notes.findFirst({
    where: (note, { eq }) => eq(note.id, id),
  });
}

export async function getAllNotesTitle() {
  const allNotes = await db.query.notes.findMany({
    columns: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: (note, { desc }) => [desc(note.createdAt)],
  });

  return allNotes as Note[];
}

export async function getLast5NotesUpdated() {
  const allNotes = await db.query.notes.findMany({
    columns: {
      id: true,
      title: true,
      updatedAt: true,
    },
    orderBy: (note, { desc }) => [desc(note.updatedAt)],
    limit: 5,
  });

  return allNotes as Note[];
}

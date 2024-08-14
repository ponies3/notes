import { db } from "@/server/db";

export async function getNoteById(id: number) {
  return await db.query.notes.findFirst({
    where: (note, { eq }) => eq(note.id, id),
  });
}

export async function getAllNotesTitle() {
  return await db.query.notes.findMany({
    columns: {
      id: true,
      title: true,
    },
  });
}

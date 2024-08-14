import { db } from "~/server/db";
import { notes } from "~/server/db/schema";

export async function createNote(title: string, content?: string) {
  const newNote = await db.insert(notes).values({
    title: title,
    content: content,
  });

  return newNote.toJSON();
}

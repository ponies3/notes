import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NoteUpdateData } from "../../domain/note";

export function updateNote(id: number, data: NoteUpdateData) {
  return db
    .update(notes)
    .set({
      ...data,
    })
    .where(eq(notes.id, id));
}

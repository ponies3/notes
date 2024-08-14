import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export function updateNote(id: number, content?: string) {
  return db
    .update(notes)
    .set({
      content: content,
    })
    .where(eq(notes.id, id));
}

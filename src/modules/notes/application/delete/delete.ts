import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteNote(noteId: number) {
  await db.delete(notes).where(eq(notes.id, noteId));
  revalidatePath("/notes", "layout");
  revalidatePath("/notes", "page");
}

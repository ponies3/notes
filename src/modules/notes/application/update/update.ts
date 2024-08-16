"use server";

import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NoteUpdateData } from "../../domain/note";
import { revalidatePath } from "next/cache";

export async function updateNote(id: number, data: NoteUpdateData) {
  await db
    .update(notes)
    .set({
      ...data,
    })
    .where(eq(notes.id, id));
  revalidatePath("/notes", "layout");
}

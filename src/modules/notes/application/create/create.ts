"use server";

import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function createNote(title: string, content?: string) {
  const newNote = await db
    .insert(notes)
    .values({
      title: title,
      content: content,
    })
    .returning({ id: notes.id });
  revalidatePath("/notes", "page");
  return newNote[0] ?? null;
}

"use server";

import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { ErrorMessages } from "@/server/domain/error";
import { revalidatePath } from "next/cache";

export async function createNote(
  title: string,
  content?: string,
): Promise<{ id: number } | ErrorMessages | null> {
  const newNote = await db
    .insert(notes)
    .values({
      title: title,
      content: content,
    })
    .returning({ id: notes.id })
    .catch((error) => {
      console.error(error);
      return {
        error: true,
        type: "database",
        module: "notes",
        message: "Error creating note",
      } as ErrorMessages;
    });

  if ("error" in newNote) {
    return newNote;
  }

  revalidatePath("/notes", "page");

  return newNote[0] ?? null;
}

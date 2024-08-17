"use server";

import { db } from "@/server/db";
import { notes } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NoteUpdateData } from "../../domain/note";
import { revalidatePath } from "next/cache";
import { ErrorMessages } from "@/server/domain/error";

export async function updateNote(
  id: number,
  data: NoteUpdateData,
): Promise<void | ErrorMessages> {
  const result = await db
    .update(notes)
    .set({
      ...data,
    })
    .where(eq(notes.id, id))
    .catch((error) => {
      console.error(error);
      return {
        error: true,
        type: "database",
        module: "notes",
        message: "Error updating note",
      } as ErrorMessages;
    });
  if ("error" in result) {
    return result;
  }
  revalidatePath("/notes", "layout");
}

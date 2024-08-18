import { db } from "@/server/db";
import { type Note } from "@/modules/notes/domain/note";
import { type ErrorMessages } from "@/server/domain/error";
import { cache } from "react";

export const getNoteById = cache((id: number) => {
  return db.query.notes.findFirst({
    where: (note, { eq }) => eq(note.id, id),
  });
});

export async function getAllNotesTitle(): Promise<Note[] | ErrorMessages> {
  const allNotes = await db.query.notes
    .findMany({
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: (note, { desc }) => [desc(note.createdAt)],
    })
    .catch((error) => {
      console.error(error);

      return {
        error: true,
        type: "database",
        module: "notes",
        message: "Error getting getAllNotesTitle",
      } as ErrorMessages;
    });

  return allNotes as Note[];
}

export async function getLast5NotesUpdated(): Promise<Note[] | ErrorMessages> {
  const allNotes = await db.query.notes
    .findMany({
      columns: {
        id: true,
        title: true,
        updatedAt: true,
      },
      orderBy: (note, { desc }) => [desc(note.updatedAt)],
      limit: 5,
    })
    .catch((error) => {
      console.error(error);

      return {
        error: true,
        type: "database",
        module: "notes",
        message: "Error getting getLast5NotesUpdated",
      } as ErrorMessages;
    });

  return allNotes as Note[];
}

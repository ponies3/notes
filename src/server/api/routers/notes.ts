import { z } from "zod";
import { createNote } from "@/modules/notes/application/create/create";
import {
  getLast5NotesUpdated,
  getNoteById,
  searchNotes,
} from "@/modules/notes/application/get/get";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { updateNote } from "@/modules/notes/application/update/update";
import { type NoteUpdateData } from "@/modules/notes/domain/note";

export const notesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return await createNote(input.title);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .query(async ({ input }) => {
      return getNoteById(input.id);
    }),

  search: publicProcedure
    .input(z.object({ search: z.string().nullable().optional() }))
    .query(async ({ input }) => {
      const notes = await searchNotes(input.search ?? "");
      return notes ?? [];
    }),

  getLastUpdates: publicProcedure.query(async () => {
    const notes = await getLast5NotesUpdated();

    return notes ?? [];
  }),

  save: publicProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        content: z.string().optional(),
        title: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const noteData = {} as NoteUpdateData;

      if (input.content) {
        noteData.content = input.content;
      }
      if (input.title) {
        noteData.title = input.title;
      }

      return await updateNote(input.id, noteData);
    }),
});

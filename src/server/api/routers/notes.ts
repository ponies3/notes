import { z } from "zod";
import { createNote } from "@/modules/notes/application/create/create";
import {
  getAllNotesTitle,
  getNoteById,
} from "@/modules/notes/application/get/get";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { updateNote } from "@/modules/notes/application/update/update";

export const notesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await createNote(input.title);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .query(async ({ input }) => {
      return getNoteById(input.id);
    }),

  geAll: publicProcedure.query(async ({ ctx }) => {
    const notes = await getAllNotesTitle();

    return notes ?? [];
  }),

  save: publicProcedure
    .input(
      z.object({
        id: z.number().nonnegative(),
        title: z.string().min(1),
        content: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await updateNote(input.id, input.title, input.content);
    }),
});

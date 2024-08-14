import { z } from "zod";
import { createNote } from "~/modules/notes/application/create/create";
import { getNoteById } from "~/modules/notes/application/get/get";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await createNote(input.title);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number().nonnegative() }))
    .query(async ({ input }) => {
      return getNoteById(input.id);
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),
});

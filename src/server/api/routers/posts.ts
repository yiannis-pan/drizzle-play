import { z } from "zod";
import { posts } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.drizzle.query.posts.findMany({
      columns: {
        id: true,
        title: true,
      },
    });
  }),
  addPost: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.drizzle.insert(posts).values({
        title: input.title,
      });
    }),
});
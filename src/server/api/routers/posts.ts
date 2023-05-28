import { z } from "zod";
import { posts } from "~/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.drizzle.query.posts.findMany({
      columns: {
        id: true,
        title: true,
      },
    });
  }),
  addPost: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const test = ctx.auth;
      console.log(test.userId);
      return await ctx.drizzle.insert(posts).values({
        title: input.title,
      });
    }),
});

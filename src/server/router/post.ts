import { createRouter } from './context'
import { z } from 'zod'

export const postRouter = createRouter()
  .query('getSpecificPost', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input: { id } }) {
      return await ctx.prisma.post.findUnique({
        where: {
          id,
        },
        include: {
          likes: {
            include: {
              user: true,
            },
          },
          author: true,
          comments: {
            include: {
              user: true,
              likes: true,
            },
          },
        },
      })
    },
  })
  .mutation('comment', {
    input: z.object({
      userId: z.string(),
      comment: z.string(),
      postId: z.number(),
    }),
    async resolve({ ctx, input: { comment, postId, userId } }) {
      return await ctx.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          comments: {
            create: {
              text: comment,
              userId,
            },
          },
        },
      })
    },
  })

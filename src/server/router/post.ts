import { createRouter } from './context'
import { z } from 'zod'

export const postsRouter = createRouter()
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
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        include: {
          author: true,
          comments: true,
          likes: {
            include: {
              user: true
            }
          },
        },
      })
    },
  })
  .mutation('toggleLike', {
    input: z.object({
      userId: z.string(),
      postId: z.number(),
      likeId: z.number().optional(),
      action: z.enum(['remove', 'add']),
    }),
    async resolve({ ctx, input: { userId, postId, action, likeId } }) {
      if (action === 'add') {
        return await ctx.prisma.like.create({
          data: {
            userId,
            postId,
          },
        })
      } else {
        return await ctx.prisma.like.delete({
          where: {
            id: likeId,
          },
        })
      }
    },
  })

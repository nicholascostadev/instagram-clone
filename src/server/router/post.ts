import { TRPCError } from '@trpc/server'
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
              user: true,
            },
          },
        },
      })
    },
  })
  .mutation('toggleLike', {
    input: z.object({
      userId: z.string(),
      postId: z.number(),
      likeId: z.number(),
    }),
    async resolve({ ctx, input: { userId, postId, likeId } }) {
      const userHasLiked = await ctx.prisma.like.findFirst({
        where: {
          id: likeId,
          userId,
          postId,
        },
      })

      if (!userHasLiked) {
        const hasRepeatedUser = await ctx.prisma.post.findMany({
          where: {
            id: postId,
            likes: {
              some: {
                userId,
              },
            },
          },
        })

        if (hasRepeatedUser.length === 0) {
          return await ctx.prisma.like.create({
            data: {
              userId,
              postId,
            },
          })
        } else {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User has already liked this post',
          })
        }
      } else {
        return await ctx.prisma.like.delete({
          where: {
            id: likeId,
          },
        })
      }
    },
  })

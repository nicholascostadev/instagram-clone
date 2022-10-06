import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const protectedPostRouter = createProtectedRouter()
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
  .mutation('toggleLike', {
    input: z.object({
      userId: z.string(),
      postId: z.number(),
    }),
    async resolve({ ctx, input: { userId, postId } }) {
      const userHasLiked = await ctx.prisma.like.findFirst({
        where: {
          userId,
          postId,
        },
      })

      if (!userHasLiked) {
        return await ctx.prisma.like.create({
          data: {
            userId,
            postId,
          },
        })
      } else {
        return await ctx.prisma.like.delete({
          where: {
            id: userHasLiked.id,
          },
        })
      }
    },
  })
  .mutation('create', {
    input: z.object({
      imageUrl: z.string(),
      description: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.create({
        data: {
          image: input.imageUrl,
          authorId: input.userId,
          description: input.description,
        },
      })
    },
  })

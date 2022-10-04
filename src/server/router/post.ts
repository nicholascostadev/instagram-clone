import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const postsRouter = createProtectedRouter()
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
        orderBy: {
          createdAt: 'desc',
        },
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
  .mutation('getImageUrl', {
    input: z.object({
      file: z.any(),
    }),
    async resolve({ input }) {
      const data = await fetch(
        'https://api.cloudinary.com/v1_1/dk9q7uxls/image/upload',
        { method: 'POST', body: input.file },
      ).then((response) => response.json())

      return data
    },
  })

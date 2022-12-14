import { z } from 'zod'

import { publicProcedure, router, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const postRouter = router({
  getSpecificPost: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
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
    }),
  postModalInfo: publicProcedure
    .input(
      z.object({
        id: z.number(),
        profileUsername: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const allPosts = await ctx.prisma.post.findMany({
        where: {
          author: {
            username: input.profileUsername,
          },
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
      const postIndex = allPosts.findIndex((post) => post.id === input.id)

      return allPosts.filter(
        (_, index) =>
          index + 1 === postIndex ||
          index === postIndex ||
          index - 1 === postIndex,
      )
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
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
  }),

  comment: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        comment: z.string(),
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { comment, postId, userId } }) => {
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
    }),

  toggleLike: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input: { userId, postId } }) => {
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
    }),

  create: protectedProcedure
    .input(
      z.object({
        imageUrl: z.string(),
        description: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: {
          image: input.imageUrl,
          authorId: input.userId,
          description: input.description,
        },
      })
    }),

  delete: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const postToDelete = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      })

      if (ctx.session.user.id !== postToDelete?.authorId)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          cause: "You're not the author of the post you're trying to delete",
          message: 'You are not authorized to delete this post',
        })

      return await ctx.prisma.post.delete({
        where: {
          id: input.postId,
        },
      })
    }),
})

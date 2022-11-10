import { z } from 'zod'
import { createRouter } from './context'

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
  .query('postModalInfo', {
    input: z.object({
      id: z.number(),
      profileUsername: z.string(),
    }),
    async resolve({ ctx, input }) {
      // Query for the post and the previous and next post
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
    },
  })

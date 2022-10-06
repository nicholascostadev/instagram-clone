import { z } from 'zod'
import { createRouter } from './context'

export const postsRouter = createRouter()
  // TODO: Routes for getting posts and a specific post, should be public
  // only creating a post should be protected, because as in Instagram, you
  // can see posts without being logged in, but you can't create a post
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

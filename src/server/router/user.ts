import { createRouter } from './context'
import { z } from 'zod'

export const userRouter = createRouter()
  .mutation('create', {
    input: z.object({
      email: z.string().min(1).max(20),
      password: z.string().min(1, 'password is required'),
    }),
    async resolve({ input, ctx }) {
      const response = await ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      })
      return {
        response,
        greeting: `Hello ${input?.email ?? 'world'}`,
      }
    },
  })
  .query('getUserInfo', {
    input: z
      .object({
        username: z.string().optional(),
        id: z.string().optional(),
      })
      .optional(),
    async resolve({ ctx, input }) {
      const id = input?.id ?? ctx?.session?.user?.id
      return await ctx.prisma.user.findUnique({
        // Can't use both username and id for query, so I check if I have received
        // username or id and use it for query
        where: {
          [input?.username ? 'username' : 'id']: input?.username
            ? input?.username
            : id,
        },
        include: {
          followers: {
            include: {
              follower: {
                include: {
                  followers: true,
                },
              },
            },
          },
          following: true,
          posts: {
            include: {
              comments: true,
              likes: true,
              author: true,
            },
          },
        },
      })
    },
  })
  .mutation('getUserInfo', {
    input: z.object({
      username: z.string().optional(),
      id: z.string().optional(),
    }),
    async resolve({ ctx, input: { username, id } }) {
      if (username) {
        return await ctx.prisma.user.findUnique({
          where: {
            username,
          },
          include: {
            followers: true,
            following: true,
            posts: {
              include: {
                comments: true,
                likes: true,
                author: true,
              },
            },
          },
        })
      }

      return await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          followers: true,
          following: true,
          posts: {
            include: {
              comments: true,
              likes: true,
              author: true,
            },
          },
        },
      })
    },
  })

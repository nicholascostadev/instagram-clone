import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const userRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany()
    },
  })
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
      } else {
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
      }
    },
  })
  .mutation('changeUsername', {
    input: z.object({
      oldUsername: z.string(),
      newUsername: z.string(),
    }),
    async resolve({ ctx, input: { oldUsername, newUsername } }) {
      if (newUsername.trim() === oldUsername)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username must be different than last one',
          cause: newUsername,
        })

      if (newUsername.trim() === '')
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid username',
          cause: newUsername,
        })

      if (newUsername.length > 20)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Username must have less than 20 characters',
          cause: newUsername,
        })

      return await ctx.prisma.user.update({
        where: {
          username: oldUsername,
        },
        data: {
          username: newUsername,
        },
      })
    },
  })

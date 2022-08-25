import { createRouter } from './context'
import { z } from 'zod'

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
      username: z.string(),
    }),
    async resolve({ ctx, input: { username } }) {
      return await ctx.prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          Post: true,
        },
      })
    },
  })

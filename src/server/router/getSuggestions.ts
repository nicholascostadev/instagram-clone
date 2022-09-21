import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const suggestionsRouter = createProtectedRouter().query('feed', {
  input: z.object({
    userId: z.string().optional(),
    amount: z.number().optional(),
  }),
  async resolve({ input, ctx }) {
    if (!input.userId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No userId received',
      })
    }

    return await ctx.prisma.user.findMany({
      take: input.amount,
      where: {
        id: {
          not: {
            equals: input.userId,
          },
        },
      },
      include: {
        followers: {
          where: {
            followerId: {
              not: {
                equals: input.userId,
              },
            },
          },
          include: {
            follower: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    })
  },
})

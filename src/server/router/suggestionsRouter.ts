import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const suggestionsRouter = createProtectedRouter().query('feed', {
  input: z.object({
    amount: z.number().optional(),
  }),
  async resolve({ input, ctx }) {
    const amount = input.amount ?? 5
    if (!ctx.session.user.id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No userId received',
      })
    }

    // pegar usuarios que o usuario logado nao segue
    return await ctx.prisma.user.findMany({
      take: amount,
      where: {
        followers: {
          none: {
            followerId: ctx.session.user.id,
          },
        },
        id: {
          not: {
            equals: ctx.session.user.id,
          },
        },
      },
      include: {
        followers: {
          include: {
            follower: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
      },
    })
  },
})

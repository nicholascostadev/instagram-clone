import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const suggestionsRouter = createProtectedRouter()
  .query('feed', {
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
  .query('explore', {
    input: z.object({
      amount: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const amount = input.amount ?? 5
      const users = await ctx.prisma.user.findMany({
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
          followers: true,
          following: true,
        },
      })

      const userWithFollowing = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          following: {
            include: {
              following: {
                include: {
                  following: {
                    include: {
                      following: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const usersWithReason = users.map((user) => {
        const userFollows =
          user.following.findIndex((follow) => {
            return follow.followingId === ctx.session.user.id
          }) !== -1

        if (userFollows) {
          return {
            ...user,
            recommendationReason: 'follows you',
          } as const
        }

        let usersToRecommend = [] as User[]

        userWithFollowing?.following.forEach((user) => {
          user.following.following.forEach((item) => {
            usersToRecommend.push(item.following)
          })
        })

        usersToRecommend = usersToRecommend.filter((user) => {
          return user.id !== ctx.session.user.id
        })

        return {
          ...user,
          recommendationReason: 'followed by',
          followedByRecommendations: usersToRecommend,
        } as const
      })

      return usersWithReason
    },
  })

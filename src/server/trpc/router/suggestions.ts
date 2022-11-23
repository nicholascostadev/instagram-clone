import { User } from '@prisma/client'
import { z } from 'zod'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const suggestionsRouter = router({
  feed: protectedProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const amount = input.amount ?? 5
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
    }),
  explore: protectedProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
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
    }),
})

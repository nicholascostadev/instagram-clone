import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'

export const suggestionsRouter = router({
  explore: protectedProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const amount = input.amount ?? 5

      const followsLoggedUser = await ctx.prisma.user.findMany({
        take: amount,
        where: {
          followers: {
            none: {
              followerId: ctx.session.user.id,
            },
          },
          following: {
            some: {
              followingId: ctx.session.user.id,
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

      const loggedUser = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          followers: true,
          following: {
            include: {
              following: {
                include: {
                  following: {
                    include: {
                      following: {
                        include: {
                          following: true,
                          followers: true,
                        },
                      },
                      follower: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      const followsSomeoneYouFollow = loggedUser?.following
        .map((followingUser) => {
          return followingUser.following.following.map((following) => ({
            user: following.following,
            followedByUser: followingUser.following,
            recommendationReason: 'followed by' as const,
          }))
        })
        .flat(2)

      return {
        followsLoggedUser: followsLoggedUser.map((user) => ({
          user,
          recommendationReason: 'follows you' as const,
        })),
        followsSomeoneYouFollow,
      }
    }),

  getByFollowersId: protectedProcedure
    .input(
      z.object({
        followerId: z.array(z.string()).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.follows.findMany({
        where: {
          followerId: {
            in: input.followerId,
          },
        },
        include: {
          following: true,
          follower: true,
        },
      })
    }),
})

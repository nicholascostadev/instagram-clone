import { z } from 'zod'

import { protectedProcedure, publicProcedure, router } from '../trpc'

export const userRouter = router({
  getUserInfo: publicProcedure
    .input(
      z
        .object({
          username: z.string().optional(),
          id: z.string().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
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
    }),

  create: publicProcedure
    .input(
      z.object({
        email: z.string().min(1).max(20),
        password: z.string().min(1, 'password is required'),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const response = await ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      })
      return {
        response,
        greeting: `Hello ${input?.email ?? 'world'}`,
      }
    }),
  protectedGetUserInfo: protectedProcedure
    .input(
      z.object({
        username: z.string().optional(),
        id: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input: { username, id } }) => {
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
    }),
  updateUserInfo: protectedProcedure
    .input(
      z.object({
        newUsername: z.string(),
        description: z.string(),
        website: z.string(),
        newName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Pick user data for checking his info
      const userHistory: any = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
      })

      // Variables to see if the user is updating their username, name or both
      const isUsernameChanging = input.newUsername !== userHistory?.username
      const isNameChanging = input.newName !== userHistory?.name

      // Variables only for readability
      const lastUpdatedNameTime = userHistory?.updatedNameAt
      const lastUpdatedUsernameTime = userHistory?.updatedUsernameAt
      const fourteenDays = 1000 * 60 * 60 * 24 * 14

      // New object so we can manipulate it and make a single query only
      // to the database at the end of the function
      const newUserObject = {
        ...userHistory,
        description: input.description,
        website: input.website,
      }

      // Since we can't throw an error, because we want to pass through every
      // route here, we have to use a variable to record if there were any errors
      // or not
      type TErrorObject = {
        errorName?: string
        errorUsername?: string
      }
      const errorObject: TErrorObject = {}

      // We chain the ifs so we can make something if user is changing his
      // username and also if user is changing his name, and at the end, query
      // the database only once
      if (isUsernameChanging) {
        if (
          lastUpdatedUsernameTime &&
          lastUpdatedUsernameTime.getTime() - new Date().getTime() <
            fourteenDays
        ) {
          if (userHistory.updatedUsernameTimes + 1 > 2) {
            // If the user has updated their username more than 2 times in the
            // last 14 days, we will throw an error
            errorObject.errorUsername =
              "You can't change your username more than 2 times in 14 days"
          } else {
            // Set the new values to the object
            newUserObject.updatedUsernameTimes =
              userHistory.updatedUsernameTimes + 1

            newUserObject.username = input.newUsername
          }
        } else {
          // Set the new values to the object
          newUserObject.updatedUsernameTimes = 1
          newUserObject.username = input.newUsername
          newUserObject.updatedUsernameAt = new Date()
        }
      }

      if (isNameChanging) {
        if (
          lastUpdatedNameTime &&
          lastUpdatedNameTime.getTime() - new Date().getTime() < fourteenDays
        ) {
          if (userHistory.updatedNameTimes + 1 > 2) {
            // If the user has updated their name more than 2 times in the
            // last 14 days, we will throw an error
            errorObject.errorName =
              "You can't change your name more than 2 times in 14 days"
          } else {
            // Set the new values to the object
            newUserObject.updatedNameTimes = userHistory.updatedNameTimes + 1
            newUserObject.name = input.newName
          }
        } else {
          // Set the new values to the object
          newUserObject.updatedNameTimes = 1
          newUserObject.name = input.newName
          newUserObject.updatedNameAt = new Date()
        }
      }

      // Final query to the database, with all the results from all if
      // statements, now we have everything that we need to update, as
      // the number of times he updated his username and name + the new
      // data
      return {
        data: await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user?.id,
          },
          data: newUserObject,
        }),
        error: errorObject,
      }
    }),
  toggleFollow: protectedProcedure
    .input(
      z.object({
        followingId: z.string(),
        followerId: z.string(),
        action: z.enum(['follow', 'unfollow']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      switch (input.action) {
        case 'follow':
          return await ctx.prisma.follows.create({
            data: {
              followerId: input.followerId,
              followingId: input.followingId,
            },
          })
        case 'unfollow':
          return await ctx.prisma.follows.delete({
            where: {
              followerId_followingId: {
                followerId: input.followerId,
                followingId: input.followingId,
              },
            },
          })
        default:
          throw new Error('Invalid action')
      }
    }),
})

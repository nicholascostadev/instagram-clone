import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const protectedUserRouter = createProtectedRouter()
  .mutation('updateUserInfo', {
    input: z.object({
      newUsername: z.string(),
      description: z.string(),
      website: z.string(),
      newName: z.string(),
    }),
    async resolve({ ctx, input }) {
      // TODO: Comment more
      const userHistory = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
      })

      const isUsernameChanging = input.newUsername !== userHistory?.username
      const isNameChanging = input.newName !== userHistory?.name

      const lastUpdatedNameTime = userHistory?.updatedNameAt
      const lastUpdatedUsernameTime = userHistory?.updatedUsernameAt
      const fourteenDays = 1000 * 60 * 60 * 24 * 14

      const newUserObject = {
        ...userHistory,
        description: input.description,
        website: input.website,
      }

      type ErrorObject = {
        errorName?: string
        errorUsername?: string
      }

      const errorObject: ErrorObject = {}

      if (isUsernameChanging) {
        if (
          lastUpdatedUsernameTime &&
          lastUpdatedUsernameTime.getTime() - new Date().getTime() <
            fourteenDays
        ) {
          if (userHistory.updatedUsernameTimes + 1 > 2) {
            errorObject.errorUsername =
              "You can't change your username more than 2 times in 14 days"
          } else {
            newUserObject.updatedUsernameTimes =
              userHistory.updatedUsernameTimes + 1

            newUserObject.username = input.newUsername
          }
        } else {
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
            errorObject.errorName =
              "You can't change your name more than 2 times in 14 days"
          } else {
            newUserObject.updatedNameTimes = userHistory.updatedNameTimes + 1
            newUserObject.name = input.newName
          }
        } else {
          newUserObject.updatedNameTimes = 1
          newUserObject.name = input.newName
          newUserObject.updatedNameAt = new Date()
        }
      }

      return {
        data: await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user?.id,
          },
          data: newUserObject,
        }),
        error: errorObject,
      }
    },
  })
  .mutation('toggleFollow', {
    input: z.object({
      followingId: z.string(),
      followerId: z.string(),
      action: z.enum(['follow', 'unfollow']),
    }),
    async resolve({ input, ctx }) {
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
      }
    },
  })

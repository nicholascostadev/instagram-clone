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
  // TODO: Move to protected route
  .mutation('updateUserInfo', {
    input: z.object({
      newUsername: z.string(),
      description: z.string(),
      website: z.string(),
      newName: z.string(),
    }),
    async resolve({ ctx, input }) {
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
  // TODO: Move to protected route
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

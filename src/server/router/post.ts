import { z } from 'zod'
import { createRouter } from './context'

export const postsRouter = createRouter().query('getSpecificPost', {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ ctx, input: { id } }) {
    return await ctx.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
        author: true,
        comments: {
          include: {
            user: true,
            likes: true,
          },
        },
      },
    })
  },
})

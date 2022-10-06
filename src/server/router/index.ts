// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { userRouter } from './user'
import { postsRouter } from './post'
import { suggestionsRouter } from './suggestionsRouter'
import { protectedUserRouter } from './protected-user-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('protectedUser.', protectedUserRouter)
  .merge('post.', postsRouter)
  .merge('suggestions.', suggestionsRouter)

// export type definition of API
export type AppRouter = typeof appRouter

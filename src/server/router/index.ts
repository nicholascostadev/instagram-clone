// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { exampleRouter } from './example'
import { protectedExampleRouter } from './protected-example-router'
import { userRouter } from './user'
import { postsRouter } from './post'
import { suggestionsRouter } from './suggestionsRouter'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('user.', userRouter)
  .merge('post.', postsRouter)
  .merge('suggestions.', suggestionsRouter)

// export type definition of API
export type AppRouter = typeof appRouter

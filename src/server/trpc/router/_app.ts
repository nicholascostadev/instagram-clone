import { router } from '../trpc'
import { postRouter } from './postRouter'
import { suggestionsRouter } from './suggestionsRouter'
import { userRouter } from './userRouter'

export const appRouter = router({
  user: userRouter,
  post: postRouter,
  suggestions: suggestionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

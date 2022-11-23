import { router } from '../trpc'
import { authRouter } from './auth'
import { postRouter } from './post'
import { suggestionsRouter } from './suggestions'
import { userRouter } from './user'

export const appRouter = router({
  auth: authRouter,
  post: postRouter,
  user: userRouter,
  suggestions: suggestionsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

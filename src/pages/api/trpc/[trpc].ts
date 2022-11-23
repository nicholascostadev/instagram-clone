// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { createContext } from '../../../server/trpc/router/context'
import { appRouter } from '../../../server/trpc/router/_app'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})

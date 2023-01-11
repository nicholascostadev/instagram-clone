import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '../utils/api'

import '../styles/globals.css'
import { type AppType } from 'next/app'
import { ProfilePostModalStateContextProvider } from '../contexts/profilePostModalStateContext'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ProfilePostModalStateContextProvider>
        <Component {...pageProps} />
      </ProfilePostModalStateContextProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)

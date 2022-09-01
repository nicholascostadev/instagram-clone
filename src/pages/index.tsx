import { useSession } from 'next-auth/react'

import { FeedPage } from '../components/Feed/FeedPage'
import { LoadingPage } from '../components/LoadingPage'
import { LoginPage } from '../components/Login/LoginPage'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { status } = useSession()

  // If user is logged in, render the Instagram Feed
  if (status !== 'loading' && status === 'authenticated') {
    return <FeedPage />
  }
  // If the authentication status is "loading" render a loading page(Spinner)
  if (status === 'loading') return <LoadingPage />

  // Since it's a full page, it's fine to have the <Head> on it's own file
  return <LoginPage />
}

export default Home

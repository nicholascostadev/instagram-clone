import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import { Spinner } from 'phosphor-react'
import { Feed } from '../components/Feed'
import { LoginPage } from '../components/LoginPage'

const Home: NextPage = () => {
  const { status } = useSession()

  // If user is logged in, render the Instagram Feed
  if (status !== 'loading' && status === 'authenticated') {
    return (
      <>
        <Head>
          <title>Feed</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Feed />
      </>
    )
  }
  // If the authentication status is "loading" render a loading page(Spinner)
  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Loading...</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Spinner className="animate-spin" />
      </>
    )
  }
  // Since it's a full page, it's fine to have the <Head> on it's own file
  return <LoginPage />
}

export default Home

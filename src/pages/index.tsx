import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import { Spinner } from 'phosphor-react'
import { Feed } from '../components/Feed'
import { Header } from '../components/Header'
import { LoginPage } from '../components/Login/LoginPage'

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
        <Header />
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
        <div className="h-screen flex justify-center items-center">
          <Spinner size={50} className="animate-spin text-gray-400" />
        </div>
      </>
    )
  }
  // Since it's a full page, it's fine to have the <Head> on it's own file
  return <LoginPage />
}

export default Home

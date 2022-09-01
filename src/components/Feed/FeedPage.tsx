import Head from 'next/head'
import { Feed } from '.'
import { Header } from '../Header'

export const FeedPage = () => {
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

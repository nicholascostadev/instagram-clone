import Head from 'next/head'
import { Spinner } from 'phosphor-react'

export const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen items-center justify-center">
        <Spinner size={50} className="animate-spin text-gray-400" />
      </div>
    </>
  )
}

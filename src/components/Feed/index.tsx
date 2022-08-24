import { FeedPosts } from './FeedPosts'
import { Stories } from '../Stories'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const Feed = () => {
  const { data } = useSession()
  return (
    <>
      <main className="max-w-5xl xl:max-w-5xl mx-auto px-2 h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
        <div className="max-w-lg lg:max-w-full mx-auto">
          <Stories />
          <FeedPosts />
        </div>
        <div className="max-w-xs">
          <div className="w-full h-[107px] flex items-center">
            <div className="flex items-center gap-4 w-full">
              <Link href={`/${data?.user?.name}`} passHref>
                <a>
                  <Image
                    src="https://github.com/nicholascostadev.png"
                    alt=""
                    layout="fixed"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </a>
              </Link>
              <div>
                <strong>nicholas_m_costa</strong>
                <p>Nicholas M</p>
              </div>
              <Link href="/" passHref>
                <a className="text-blue-400 text-sm ml-auto">Switch</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

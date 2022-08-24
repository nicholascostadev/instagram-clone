import { FeedPosts } from './FeedPosts'
import { Stories } from '../Stories'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { FeedFollowSuggestions } from './FollowSuggestions'
import useWindowSize from '../../hooks/useWindowSize'

export const Feed = () => {
  const { data } = useSession()
  const { width } = useWindowSize()
  return (
    <>
      <main className="max-w-5xl xl:max-w-5xl mx-auto px-2 h-screen grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
        <div className="max-w-lg lg:max-w-full mx-auto">
          <Stories />
          <FeedPosts />
        </div>
        {width && width > 1024 && (
          <div className="max-w-xs">
            <div className="w-full h-[107px] flex items-center">
              <div className="flex items-center gap-4 w-full">
                <Link href={`/${data?.user?.name}`} passHref>
                  <a className="flex items-center border rounded-full">
                    <Image
                      src="https://github.com/nicholascostadev.png"
                      alt=""
                      layout="fixed"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </a>
                </Link>
                <div>
                  <Link href={`${data?.user?.name}`} passHref>
                    <a className="font-bold text-sm">nicholas_m_costa</a>
                  </Link>
                  <p className="text-sm text-gray-400">Nicholas M</p>
                </div>
                <Link href="/" passHref>
                  <a className="text-blue-500 text-sm ml-auto font-bold">
                    Switch
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <strong className="text-gray-400 text-sm">
                Suggestions for you
              </strong>
              <a href="#" className="text-sm">
                See All
              </a>
            </div>
            <FeedFollowSuggestions />
          </div>
        )}
      </main>
    </>
  )
}

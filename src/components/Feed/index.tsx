import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import useWindowSize from '../../hooks/useWindowSize'
import { trpc } from '../../utils/trpc'
import { Stories } from '../Stories'
import { FeedPosts } from './FeedPosts'
import { FeedFollowSuggestions } from './FollowSuggestions'

export const Feed = () => {
  const { data } = useSession()

  const { data: userInfo } = trpc.useQuery(
    [
      'user.getUserInfo',
      {
        id: data?.user?.id,
      },
    ],
    { refetchOnWindowFocus: false },
  )
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
                <Link href={`/${userInfo?.username}`} passHref>
                  <a className="flex items-center border rounded-full">
                    <Image
                      src={userInfo?.image || ''}
                      alt=""
                      layout="fixed"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  </a>
                </Link>
                <div>
                  <Link href={`${userInfo?.username}`} passHref>
                    <a className="font-bold text-sm">{userInfo?.username}</a>
                  </Link>
                  <p className="text-sm text-gray-400">{userInfo?.name}</p>
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

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '../../utils/api'
import { Stories } from '../Stories'
import { FeedPosts } from './FeedPosts'
import { FeedFollowSuggestions } from './FollowSuggestions'

export const Feed = () => {
  const { data } = useSession()

  const { data: userInfo } = api.user.getUserInfo.useQuery(
    {
      id: data?.user?.id,
    },
    { refetchOnWindowFocus: false, staleTime: 1000 * 60 * 5 },
  )

  return (
    <div>
      <main className="mx-auto grid h-screen max-w-full grid-cols-1 gap-10 px-2 pt-10 lg:grid-cols-2 xl:max-w-5xl">
        <div className="mx-auto max-w-full lg:max-w-full">
          <Stories />
          <FeedPosts />
        </div>

        <div className="hidden max-w-xs lg:block">
          <div className="flex h-[90px] w-full items-center">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-4">
                <Link
                  href={`/${userInfo?.username}`}
                  passHref
                  className="flex items-center rounded-full border"
                >
                  <Image
                    src={userInfo?.image || ''}
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </Link>
                <div>
                  <Link
                    href={`${userInfo?.username}`}
                    passHref
                    className="text-sm font-bold"
                  >
                    {userInfo?.username}
                  </Link>
                  <p className="text-sm text-gray-400">{userInfo?.name}</p>
                </div>
              </div>
              <button
                className="ml-auto text-sm font-bold text-blue-500"
                onClick={() => signOut()}
                type="button"
              >
                Switch
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <strong className="text-sm text-gray-400">
              Suggestions for you
            </strong>
            <Link href="/explore/people" className="text-sm">
              See All
            </Link>
          </div>
          <FeedFollowSuggestions />
        </div>
      </main>
    </div>
  )
}

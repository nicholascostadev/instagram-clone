import { Comment, Follows, Like, Post, User } from '@prisma/client'
import DOMPurify from 'dompurify'
import { Session } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DotsThree, Gear, User as UserIcon } from 'phosphor-react'

import { trpc } from '../../utils/trpc'

type UserInfoProps =
  | (User & {
      posts: (Post & {
        author: User
        likes: Like[]
        comments: Comment[]
      })[]
      followers: (Follows & {
        follower: {
          id: string
          username: string | null
        }
      })[]
      following: Follows[]
    })
  | null
  | undefined

type TFollower = Follows & {
  follower: {
    id: string
    username: string | null
  }
}
interface ProfileHeaderProps {
  userInfo: UserInfoProps
  sessionData: Session | null
  userFollows: boolean
  followedBy: TFollower[]
  toggleUserFollows: () => void
}

interface ProfileHeaderDescriptionProps {
  websiteURL?: string | null
  description?: string | null
  userInfo: UserInfoProps
  followedBy: TFollower[]
  userSession: Session | null
}

const ProfileHeaderMainInfo = ({
  websiteURL,
  description,
  userInfo,
  followedBy,
  userSession,
}: ProfileHeaderDescriptionProps) => {
  const formattedDescription = DOMPurify.sanitize(
    description?.replace(/\n/g, '<br>\n') ?? '',
  )

  const isProfileOwner = userInfo?.id === userSession?.user?.id
  const filteredFollowedBy = followedBy.filter(
    (follow) => follow.followerId !== userSession?.user?.id,
  )
  const followedByLength = filteredFollowedBy.length

  if (!websiteURL) {
    return (
      <div>
        <strong className="text-sm font-bold md:text-base">
          {userInfo?.name}
        </strong>
        {formattedDescription && (
          <p
            className="h-[108px] w-full overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
          />
        )}
        {!isProfileOwner && followedByLength > 0 && (
          <p className="my-2 text-sm text-gray-500">
            Followed by{' '}
            <Link href={`/${filteredFollowedBy[0]?.follower.username}`}>
              <a className="font-bold text-black">
                {filteredFollowedBy[0]?.follower.username}
              </a>
            </Link>
            {followedByLength > 1 && ` + ${followedByLength - 1} more`}
          </p>
        )}
      </div>
    )
  }
  const formattedWebsiteURL = websiteURL.split('https://')[1]
  return (
    <div className="flex flex-col text-sm md:text-base">
      <strong className="font-bold">{userInfo?.name}</strong>
      {formattedDescription && (
        <p
          className="h-[108px] w-full overflow-y-scroll"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        ></p>
      )}

      {!isProfileOwner && followedByLength > 0 && (
        <p className="my-2 text-sm text-gray-500">
          Followed by{' '}
          <Link href={`/${filteredFollowedBy[0]?.follower.username}`}>
            <a className="font-bold text-black">
              {filteredFollowedBy[0]?.follower.username}
            </a>
          </Link>
          {followedByLength > 1 && ` + ${followedByLength - 1} more`}
        </p>
      )}

      {websiteURL && (
        <a
          href={websiteURL}
          className="font-bold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {formattedWebsiteURL}
        </a>
      )}
    </div>
  )
}

const ProfileHighlight = ({
  highlightImage,
  highlightId,
  highlightName,
}: {
  highlightImage: string | null
  highlightId: string
  highlightName: string
}) => {
  return (
    <Link
      href={`/stories/highlights/${highlightId}`}
      passHref
      className="max-w-[119px]"
    >
      <a className="flex w-full flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center rounded-full border border-red-500 p-1">
          <Image
            src={highlightImage || 'https://github.com/nicholascostadev.png'}
            alt=""
            layout="fixed"
            width={77}
            height={77}
            className="rounded-full"
          />
        </div>
        <p className="overflow-hidden" aria-valuetext={highlightName}>
          {highlightName.length > 12
            ? `${highlightName.slice(0, 9)}...`
            : highlightName}
        </p>
      </a>
    </Link>
  )
}

const ProfileHighlights = () => {
  return (
    <div className="col-span-full mt-20 flex items-center gap-4 ">
      <div className="scrollbar-hide mx-auto flex max-w-full items-center justify-start gap-12 overflow-x-auto md:ml-28">
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Highlight 1"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Highlight 2"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Highlight 3"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Highlight 4"
        />
        <ProfileHighlight
          highlightId=""
          highlightImage=""
          highlightName="Highlight 5"
        />
      </div>
    </div>
  )
}

export const ProfileHeader = ({
  userInfo,
  sessionData,
  userFollows,
  followedBy,
  toggleUserFollows,
}: ProfileHeaderProps) => {
  const router = useRouter()

  const followMutation = trpc.useMutation(['protectedUser.toggleFollow'])
  const utils = trpc.useContext()

  const toggleFollow = () => {
    if (!sessionData || !sessionData.user || !sessionData?.user.id) return

    followMutation.mutate(
      {
        followerId: sessionData?.user.id,
        followingId: userInfo?.id as string,
        action: userFollows ? 'unfollow' : 'follow',
      },
      {
        onError: () => {
          toggleUserFollows()
        },
        onSettled: () => {
          toggleUserFollows()
        },
        onSuccess: () => {
          utils.invalidateQueries(['user.getUserInfo'])
        },
      },
    )
  }

  const followButtonStyles = userFollows
    ? 'px-3 py-1 rounded-md bg-transparent text-gray-600 font-bold border'
    : 'px-3 py-1 rounded-md bg-blue-600 text-white font-bold'

  return (
    <header className="flex max-w-4xl flex-col">
      <div className="flex">
        <div className="flex h-48 w-32 max-w-full items-start justify-start md:w-96 md:items-center md:justify-center">
          {userInfo?.image ? (
            <div className="relative h-[100px] w-[100px] md:h-[150px] md:w-[150px]">
              <Image
                src={userInfo?.image}
                alt=""
                layout="fill"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="rounded-full bg-gray-300">
              <UserIcon
                size={150}
                className="rounded-full"
                color="rgb(156 163 175)"
              />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex items-end justify-between gap-2">
            <p className="text-xl">{userInfo?.username}</p>
            {userInfo?.id === sessionData?.user?.id ? (
              <div className="flex items-center justify-center gap-3">
                <button
                  className="rounded-md border px-2 py-1 text-sm font-bold"
                  onClick={() => router.push('/accounts/edit')}
                  type="button"
                >
                  Edit Profile
                </button>
                <Gear size={25} className="cursor-pointer" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <button
                  className={`${followButtonStyles} hidden md:flex`}
                  onClick={toggleFollow}
                  type="button"
                >
                  {userFollows ? 'Unfollow' : 'Follow'}
                </button>
                <DotsThree size={25} />
              </div>
            )}
          </div>
          <div className="flex gap-8">
            <p className="text-sm">
              <span className="font-bold">{userInfo?.posts?.length}</span> posts
            </p>
            <p className="text-sm">
              <span className="font-bold">{userInfo?.followers?.length}</span>{' '}
              followers
            </p>
            <p className="text-sm">
              <span className="font-bold">{userInfo?.following?.length}</span>{' '}
              following
            </p>
          </div>

          <ProfileHeaderMainInfo
            websiteURL={userInfo?.website}
            description={userInfo?.description}
            userInfo={userInfo}
            followedBy={followedBy}
            userSession={sessionData}
          />
        </div>
      </div>
      <ProfileHighlights />
    </header>
  )
}

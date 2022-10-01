import { Follows } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { trpc } from '../../utils/trpc'

interface SuggestionProps {
  name: string
  image: string
  followedBy: (Follows & {
    follower: {
      username: string | null
    }
  })[]
  id: string
}

export const FeedSuggestion = ({
  name,
  image,
  followedBy,
  id,
}: SuggestionProps) => {
  const { data: loggedUser } = useSession()
  const { invalidateQueries } = trpc.useContext()
  const { mutate: toggleFollow } = trpc.useMutation(['user.toggleFollow'])

  console.log(followedBy)

  function handleToggleFollow(action: 'follow' | 'unfollow') {
    if (loggedUser?.user?.id) {
      toggleFollow(
        {
          action,
          followerId: loggedUser?.user?.id,
          followingId: id,
        },
        {
          onError: (err) => console.error(err),
          onSuccess: () => invalidateQueries(['suggestions.feed']),
        },
      )
    }
  }

  const userFollows =
    followedBy.findIndex(
      (followers) => followers.followerId === loggedUser?.user?.id,
    ) !== -1

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center rounded-full border">
        <Image
          src={image}
          alt=""
          width={30}
          height={30}
          layout="fixed"
          className="rounded-full"
        />
      </div>
      <div>
        <Link href={`/${name}`} passHref>
          <a className="text-sm font-bold">{name}</a>
        </Link>
        <p className="text-xs text-gray-400">
          {followedBy.length > 0 && (
            <>
              Followed by {followedBy[0]?.follower.username}{' '}
              {followedBy.length > 1
                ? `+ ${
                    userFollows ? followedBy.length - 1 : followedBy.length
                  } more`
                : ''}
            </>
          )}
        </p>
      </div>
      <a
        href="#"
        className="ml-auto text-xs font-bold text-blue-500"
        onClick={() => handleToggleFollow(userFollows ? 'unfollow' : 'follow')}
      >
        {userFollows ? 'Unfollow' : 'Follow'}
      </a>
    </div>
  )
}

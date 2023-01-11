import { Follows } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { formatFollow } from '../../utils/formatters'
import { api } from '../../utils/api'

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
  const { mutate: toggleFollow } = api.user.toggleFollow.useMutation()

  const followedByCopy = followedBy.filter(
    (follower) => follower.followerId !== loggedUser?.user?.id,
  )

  const followingUser = followedBy.findIndex(
    (follower) => follower.followerId === loggedUser?.user?.id,
  )
  const [userFollows, setUserFollows] = useState(followingUser !== -1)

  function handleToggleFollow(action: 'follow' | 'unfollow') {
    if (loggedUser?.user?.id) {
      toggleFollow(
        {
          action,
          followerId: loggedUser?.user?.id,
          followingId: id,
        },
        {
          onSuccess: () => {
            if (action === 'follow') {
              setUserFollows(true)
            } else {
              setUserFollows(false)
            }
          },
        },
      )
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center rounded-full border">
        <Image
          src={image}
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
      <div>
        <Link href={`/${name}`} passHref className="text-sm font-bold">
          {name}
        </Link>
        <p className="text-xs text-gray-400">
          {followedBy.length > 0 && (
            <>
              {formatFollow(followedByCopy)}

              {followedByCopy.length > 1 &&
                ` + ${followedByCopy.length - 1} more`}
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

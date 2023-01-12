import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { api } from '../../../utils/api'
import { User } from '@prisma/client'

type SuggestionRowProps = {
  image: string | null
  userId: string
  username: string | null
  name: string | null
  recommendationReason: 'follows you' | 'followed by'
  followedByRecommendation?: User
}

export const SuggestionRow = (props: SuggestionRowProps) => {
  const { data } = useSession()
  const { mutate: toggleFollow } = api.user.toggleFollow.useMutation()
  const [follows, setFollows] = useState(false)

  const handleToggleFollow = (action: 'follow' | 'unfollow') => {
    if (data?.user)
      toggleFollow(
        {
          action,
          followerId: data?.user?.id,
          followingId: props.userId,
        },
        {
          onError: (err) => {
            setFollows((prev) => !prev)
            throw new Error(err.message)
          },
          onSettled: () => {
            setFollows((prev) => !prev)
          },
        },
      )
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-center gap-4">
        <div className="relative h-12 w-12">
          <Image
            style={{ objectFit: 'contain' }}
            src={props.image ?? ''}
            alt=""
            fill
            className="rounded-full"
          />
        </div>
        <div className="flex flex-1 flex-col text-sm">
          <Link
            href={`/${props.username || '/'}`}
            className="text-md font-bold"
          >
            {props.username}
          </Link>
          <p className="text-gray-500">{props.name}</p>
          {props.recommendationReason === 'follows you' && (
            <p className="text-gray-400">Follows you</p>
          )}
          {props.recommendationReason === 'followed by' && (
            <p className="text-gray-400">
              Followed by {props.followedByRecommendation?.username ?? ''}
            </p>
          )}
        </div>
      </div>
      <button
        className="rounded-md bg-blue-400 py-1 px-6 text-white"
        onClick={() => handleToggleFollow(follows ? 'unfollow' : 'follow')}
        type="button"
      >
        {follows ? 'Unfolow' : 'Follow'}
      </button>
    </div>
  )
}

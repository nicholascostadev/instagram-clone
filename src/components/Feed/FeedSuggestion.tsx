import { Follows } from '@prisma/client'
import Image from 'next/image'

interface SuggestionProps {
  name: string
  image: string
  followedBy: (Follows & {
    follower: {
      username: string | null
    }
  })[]
}

export const FeedSuggestion = ({
  name,
  image,
  followedBy,
}: SuggestionProps) => {
  console.log(followedBy)
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="border rounded-full flex justify-center items-center">
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
        <strong className="text-sm">{name}</strong>
        <p className="text-xs text-gray-400">
          {followedBy.length > 0 && (
            <>
              Followed by {followedBy[0]?.follower.username}{' '}
              {followedBy.length > 1 ? `+ ${followedBy.length} more` : ''}
            </>
          )}
        </p>
      </div>
      <a href="#" className="ml-auto text-xs text-blue-500 font-bold">
        Follow
      </a>
    </div>
  )
}

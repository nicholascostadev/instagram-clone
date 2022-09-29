import { Follows } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

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
              {followedBy.length > 1 ? `+ ${followedBy.length} more` : ''}
            </>
          )}
        </p>
      </div>
      <a href="#" className="ml-auto text-xs font-bold text-blue-500">
        Follow
      </a>
    </div>
  )
}

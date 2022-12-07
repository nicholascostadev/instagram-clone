import { Like, User } from '@prisma/client'
import Image from 'next/image'

type TLike = Like & {
  user: User | null
}
interface PostLikedByListProps {
  likedByList: TLike[]
}

export const PostLikedByList = ({ likedByList }: PostLikedByListProps) => {
  if (likedByList.length > 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex rounded-full">
          <Image
            src={likedByList[0]?.user?.image || ''}
            alt=""
            height={20}
            width={20}
            className="h-5 w-5 rounded-full"
          />
        </div>

        <p className="text-sm">
          Liked by{' '}
          <span className="font-bold">{likedByList[0]?.user?.username}</span>{' '}
          {likedByList.length > 1 && (
            <span className="font-bold">and {likedByList.length} others</span>
          )}
        </p>
      </div>
    )
  }

  return null
}

import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { Session } from 'next-auth'
import Image from 'next/image'

interface PostLikedByListProps {
  post: TPost & {
    author: User
    comments: Comment[]
    likes: (Like & {
      user: User | null
    })[]
  }
  userSession: Session | null
}

export const PostLikedByList = ({
  post,
  userSession,
}: PostLikedByListProps) => {
  const likedByList = post?.likes.filter(
    (like) => like.userId !== userSession?.user?.id,
  )
  // TODO: maybe pass this condition to the parent component
  if (likedByList.length > 0)
    return (
      <div className="flex items-center gap-2">
        <div className="flex rounded-full">
          <Image
            src={likedByList[0]?.user?.image || ''}
            layout="fixed"
            alt=""
            height={20}
            width={20}
            className="rounded-full "
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

  return <></>
}

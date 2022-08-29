import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BookmarkSimple, Chat, Heart, PaperPlaneTilt } from 'phosphor-react'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'

interface PostActionsProps {
  post: TPost & {
    author: User
    comments: Comment[]
    likes: (Like & {
      user: User | null
    })[]
  }
}

export const PostActions = ({ post }: PostActionsProps) => {
  const [saved, setSaved] = useState(false)
  const like = trpc.useMutation(['post.toggleLike'])
  const { data } = useSession()
  const utils = trpc.useContext()
  const router = useRouter()

  const userHasLiked = post.likes.find((like) => like.userId === data?.user?.id)

  const handleToggleLikeOnPost = () => {
    if (userHasLiked) {
      like.mutate(
        {
          action: 'remove',
          likeId: Number(userHasLiked?.id),
          postId: post?.id,
          userId: String(data?.user?.id),
        },
        {
          onError: (e) => console.error(e.message),
        },
      )

      utils.invalidateQueries('post.getAll')
    } else {
      like.mutate(
        {
          action: 'add',
          postId: post?.id,
          userId: String(data?.user?.id),
        },
        {
          onError: (e) => console.error(e.message),
        },
      )

      utils.invalidateQueries('post.getAll')
    }
  }

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex justify-between items-center gap-5">
        <button onClick={handleToggleLikeOnPost}>
          <Heart
            weight={userHasLiked ? 'fill' : 'regular'}
            size={30}
            className={`${
              userHasLiked
                ? 'text-red-600 transition-colors'
                : 'hover:text-gray-400'
            }`}
          />
        </button>
        <button>
          <Chat
            size={30}
            className="hover:text-gray-400"
            onClick={() => router.push(`/p/${post?.id}`)}
          />
        </button>
        <button>
          <PaperPlaneTilt size={30} className="hover:text-gray-400" />
        </button>
      </div>
      <button>
        <BookmarkSimple
          weight={saved ? 'fill' : 'regular'}
          onClick={() => setSaved((prev) => !prev)}
          size={30}
          className={`${saved ? 'text-gray-900' : 'hover:text-gray-400'}`}
        />
      </button>
    </div>
  )
}

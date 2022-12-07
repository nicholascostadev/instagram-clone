import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { BookmarkSimple, Chat, Heart, PaperPlaneTilt } from 'phosphor-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { v4 as uuidv4 } from 'uuid'
import { UserHasLiked } from '.'

interface PostActionsProps {
  post: TPost & {
    author: User
    comments: Comment[]
    likes: (Like & {
      user: User | null
    })[]
  }
  setPostState: Dispatch<
    SetStateAction<
      TPost & {
        author: User
        comments: Comment[]
        likes: (Like & {
          user: User | null
        })[]
      }
    >
  >
  setUserHasLiked: Dispatch<SetStateAction<UserHasLiked>>
  userHasLiked: UserHasLiked
}

export const PostActions = ({
  post,
  setPostState,
  setUserHasLiked,
  userHasLiked,
}: PostActionsProps) => {
  const [saved, setSaved] = useState(false)
  const likeMutation = trpc.post.toggleLike.useMutation()

  const { data } = useSession()

  useEffect(() => {
    setUserHasLiked(post?.likes.find((like) => like?.userId === data?.user?.id))
  }, [data, setUserHasLiked, post])

  const router = useRouter()

  const handleToggleLikeOnPost = () => {
    if (!data?.user) throw new Error("User isn't logged in")

    if (userHasLiked) {
      likeMutation.mutate(
        {
          postId: post.id,
          userId: data.user.id,
        },
        {
          onSettled: () => {
            setPostState((prev) => {
              const newLikes = prev.likes.filter(
                (like) => like.userId !== data.user?.id,
              )

              return {
                ...prev,
                likes: newLikes,
              }
            })
          },
        },
      )
    } else {
      likeMutation.mutate(
        {
          postId: Number(post?.id),
          userId: String(data?.user?.id),
        },
        {
          onSettled: () => {
            setPostState((prev) => {
              return {
                ...prev,
                likes: [
                  ...prev.likes,
                  {
                    postId: post?.id,
                    user: data?.user as User,
                    id: Number(Math.floor(Math.random() * 10)),
                    commentId: Number(uuidv4()),
                    userId: data.user?.id as string,
                  },
                ],
              }
            })
          },
        },
      )
    }
  }

  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center justify-between gap-5">
        <button onClick={handleToggleLikeOnPost} type="button">
          <Heart
            weight={userHasLiked ? 'fill' : 'regular'}
            size={30}
            className={`${
              userHasLiked
                ? 'text-red-600 transition-colors'
                : 'transition-colors hover:text-gray-400'
            }`}
          />
        </button>
        <button type="button">
          <Chat
            size={30}
            className="hover:text-gray-400"
            onClick={() => router.push(`/p/${post?.id}`)}
          />
        </button>
        <button type="button">
          <PaperPlaneTilt size={30} className="hover:text-gray-400" />
        </button>
      </div>
      <button type="button">
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

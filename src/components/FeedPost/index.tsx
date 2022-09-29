import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from 'phosphor-react'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { PostActions } from './PostActions'
import { PostCommentSection } from './PostCommentSection'
import { PostHeader } from './PostHeader'
import { PostLikedByList } from './PostLikedByList'

interface PostProps {
  // optional just for testing
  post: TPost & {
    author: User
    comments: Comment[]
    likes: (Like & {
      user: User | null
    })[]
  }
  isLoading: boolean
  userId: string
}
export type UserHasLiked =
  | (Like & {
      user: User | null
    })
  | undefined

export const Post = ({ isLoading, userId, post }: PostProps) => {
  const { data } = trpc.useQuery([
    'user.getUserInfo',
    { id: String(post?.likes[0]?.userId) },
  ])

  const [postState, setPostState] = useState(post)
  const [userHasLiked, setUserHasLiked] = useState<UserHasLiked>(
    postState.likes[0],
  )

  return (
    <div className="relative flex flex-col rounded-lg border bg-white">
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <PostHeader
          postOwner={String(postState?.author.username)}
          postOwnerImage={String(postState?.author.image)}
        />
      </div>
      <div className="relative h-[470px] w-full border-y">
        {postState?.image && (
          <Image
            objectFit="contain"
            layout="fill"
            src={
              postState?.image ??
              'https://instagram.fsdu6-1.fna.fbcdn.net/v/t51.2885-15/300057970_811470696932602_5375264863153378571_n.jpg?stp=dst-jpg_e0_s480x480&cb=9ad74b5e-b94cae63&_nc_ht=instagram.fsdu6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=1InzZCrD2pUAX9H17Sn&tn=jEdauWXTd9iECMi_&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=MjkwOTMwMjk4NTA1NDc3MzcwNw%3D%3D.2-ccb7-5&oh=00_AT-Ud4g9kweKg7y9TgB7Kl9OH4GcWvSyla3hWT6t4BxzqQ&oe=630B4460&_nc_sid=cff2a4'
            }
            alt=""
          />
        )}
        {(!postState?.image || isLoading) && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size={40} className="animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 border-b p-2 pb-5">
        <PostActions
          setPostState={setPostState}
          post={postState}
          userHasLiked={userHasLiked}
          setUserHasLiked={setUserHasLiked}
        />
        {postState.likes.length > 0 && (
          <PostLikedByList userInfo={data} post={postState} />
        )}
        <div>
          <p className="text-sm">
            <span className="font-bold">{postState?.author?.username}</span>{' '}
            {postState?.description}
          </p>
        </div>
        <div>
          <Link href={`/p/${postState?.id}`} passHref>
            <a className="text-sm text-gray-400">
              {postState?.comments.length > 0 &&
                `See all ${postState?.comments.length} comments`}
            </a>
          </Link>
        </div>
        <div>
          <p className="cursor-pointer text-xs uppercase text-gray-400">
            {formatDistanceToNow(
              new Date(String(postState.updatedAt || postState.createdAt)),
              {
                addSuffix: true,
              },
            )}
          </p>
        </div>
      </div>
      <PostCommentSection postId={postState?.id} userId={userId} />
    </div>
  )
}

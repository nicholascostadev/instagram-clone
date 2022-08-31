import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { format, formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { BookmarkSimple, Chat, Heart, PaperPlaneTilt } from 'phosphor-react'
import { formatPostLikes } from '../../utils/post/formatters'
import { trpc } from '../../utils/trpc'
import { PostAddCommentSection } from './PostAddCommentSection'
import { PostInfoCommentSection } from './PostInfoCommentSection'
import { PostThreeDotsButton } from './ThreeDotsButton'

export interface PostInfoProps {
  // this interface is a copy-paste from
  // postData's type in [postId].tsx file
  postData:
    | (TPost & {
        author: User
        comments: (Comment & {
          user: User | null
          likes: Like[]
        })[]
        likes: (Like & {
          user: User | null
        })[]
      })
    | null
    | undefined
}

export const PostInfo = ({ postData }: PostInfoProps) => {
  const { data: userSession } = useSession()
  const like = trpc.useMutation(['post.toggleLike'])
  const utils = trpc.useContext()

  const userHasLiked = postData?.likes.find(
    (like) => like.userId === userSession?.user?.id,
  )

  const handleLikeComment = (commentId: number) => {
    // call api
  }

  const handleToggleLikeOnPost = () => {
    if (userHasLiked) {
      like.mutate(
        {
          likeId: Number(userHasLiked?.id),
          postId: Number(postData?.id),
          userId: String(userSession?.user?.id),
        },
        {
          onSettled: () => utils.invalidateQueries('post.getSpecificPost'),
        },
      )

      utils.invalidateQueries()
    } else {
      like.mutate(
        {
          postId: Number(postData?.id),
          userId: String(userSession?.user?.id),
        },
        {},
      )

      utils.invalidateQueries()
    }
  }

  return (
    <div className="flex-1 bg-white relative">
      <div className="flex items-center p-4 gap-10 border-b">
        <div className="flex items-center gap-3 w-full">
          <Image
            alt=""
            src={postData?.author.image || ''}
            layout="fixed"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm font-bold">{postData?.author.username}</p>
        </div>
        <PostThreeDotsButton postData={postData} />
      </div>

      <div className="h-[366px] overflow-y-auto">
        <div className="flex gap-2 p-4">
          <Image
            src={postData?.author.image ?? ''}
            alt=""
            layout="fixed"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-xs flex-1">
            <strong>{postData?.author.username}</strong>
            <span className="ml-1 md:ml-2 ">{postData?.description}</span>
            <div className="flex gap-2">
              <span className="text-xs text-gray-400 text-bold">
                {formatDistanceToNow(new Date(String(postData?.createdAt)), {
                  locale: enUS,
                  includeSeconds: true,
                })}
              </span>
            </div>
          </div>
        </div>
        <PostInfoCommentSection
          handleLikeComment={handleLikeComment}
          userSession={userSession}
          postData={postData}
        />
      </div>

      <div>
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex gap-2">
            <button onClick={handleToggleLikeOnPost}>
              <Heart
                size={25}
                weight={userHasLiked ? 'fill' : 'regular'}
                className={`${
                  userHasLiked
                    ? 'text-red-600 transition-colors'
                    : 'hover:text-gray-400'
                }`}
              />
            </button>
            <Chat size={25} className="cursor-pointer" />
            <PaperPlaneTilt size={25} className="cursor-pointer" />
          </div>
          <BookmarkSimple size={25} className="cursor-pointer" />
        </div>
        {postData?.likes && postData?.likes.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-1">
            <Image
              src={postData?.author.image || ''}
              alt=""
              layout="fixed"
              width={20}
              height={20}
              className="rounded-full"
            />
            {formatPostLikes(postData?.likes, postData)}
          </div>
        )}
        <span className="text-xs block text-gray-400 px-4 pt-2">
          {format(new Date(String(postData?.createdAt)), 'MMMM dd, yyyy')}
        </span>
      </div>

      <PostAddCommentSection postData={postData} userSession={userSession} />
    </div>
  )
}

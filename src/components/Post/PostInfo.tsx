import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { format, formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
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
  const like = trpc.post.toggleLike.useMutation()
  const utils = trpc.useContext()

  const userHasLiked =
    postData?.likes.findIndex(
      (like) => like.userId === userSession?.user?.id,
    ) !== -1

  // TODO: Make this funcion work(not implemented)
  const handleLikeComment = (commentId: number) => {
    // call api
  }

  const likedByList = postData?.likes.filter(
    (like) => like.userId !== userSession?.user?.id,
  )

  const handleToggleLikeOnPost = () => {
    like.mutate(
      {
        postId: Number(postData?.id),
        userId: String(userSession?.user?.id),
      },
      {
        onSettled: () => {
          utils.post.getSpecificPost.invalidate()
          utils.post.postModalInfo.invalidate()
        },
      },
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <div className="flex items-center gap-10 border-b border-l p-4">
        <div className="flex w-full items-center gap-3">
          <Image
            alt=""
            src={postData?.author.image || ''}
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className="text-sm font-bold">{postData?.author.username}</p>
        </div>
        <PostThreeDotsButton />
      </div>

      <div className="flex-1 overflow-y-auto border-l">
        <div className="flex gap-2 p-4">
          <Image
            src={postData?.author.image ?? ''}
            alt="author image"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1 text-xs">
            <strong>{postData?.author.username}</strong>
            <span className="ml-1 md:ml-2 ">{postData?.description}</span>
            <div className="flex gap-2">
              <span className="text-bold text-xs text-gray-400">
                {formatDistanceToNow(
                  new Date(String(postData?.createdAt ?? new Date())),
                  {
                    locale: enUS,
                    includeSeconds: true,
                  },
                )}
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
        <div className="flex items-center justify-between border-t border-l px-4 py-2">
          <div className="flex gap-2">
            <button onClick={handleToggleLikeOnPost} type="button">
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
        {postData && likedByList && likedByList.length > 0 && (
          <div className="flex items-center gap-2 border-l px-4 py-1">
            <Image
              src={likedByList[0]?.user?.image || ''}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-full"
            />
            {formatPostLikes(likedByList, postData)}
          </div>
        )}
        <span
          className={`block border-l px-4 pt-2 text-xs text-gray-400 ${
            !userSession ? 'pb-5' : ''
          }`}
        >
          {format(
            new Date(String(postData?.createdAt ?? new Date())),
            'MMMM dd, yyyy',
          )}
        </span>
      </div>

      {userSession ? (
        <PostAddCommentSection postData={postData} userSession={userSession} />
      ) : (
        <div className="flex max-h-full flex-1 border-t border-l p-4">
          <p className="text-sm text-gray-400">
            <Link href="/" className="text-blue-700">
              Log in
            </Link>
            to like or comment.
          </p>
        </div>
      )}
    </div>
  )
}

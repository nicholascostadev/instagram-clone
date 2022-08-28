import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { format, formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useSession } from 'next-auth/react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import {
  BookmarkSimple,
  Chat,
  DotsThree,
  Heart,
  PaperPlaneTilt,
  Smiley,
  SpinnerGap,
} from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { PostActionModal } from './PostActionModal'

interface PostInfoProps {
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

type TLikes =
  | (Like & {
      user: User | null
    })[]
  | undefined

export const PostInfo = ({ postData }: PostInfoProps) => {
  const { data: userSession } = useSession()
  const [input, setInput] = useState('')
  const { mutate, isLoading } = trpc.useMutation(['post.comment'])
  const utils = trpc.useContext()

  const disabled = input.length === 0 || isLoading

  const formatCommentLikes = (commentsAmount: number) => {
    if (commentsAmount === 1) {
      return `${commentsAmount} like`
    } else {
      return `${commentsAmount} likes`
    }
  }

  const formatPostLikes = (likes: TLikes) => {
    if (likes) {
      if (likes.length === 1) {
        return (
          <p className="text-sm">
            Liked by{' '}
            <span className="font-bold">{likes[0]?.user?.username}</span>
          </p>
        )
      } else {
        return (
          <p className="text-sm">
            Liked by{' '}
            <span className="font-bold">{likes[0]?.user?.username}</span> and{' '}
            {likes?.length - 1} others
          </p>
        )
      }
    } else return ''
  }

  const handleLikeComment = (commendId: number) => {
    // call api
  }

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        comment: input,
        postId: Number(postData?.id),
        userId: String(userSession?.user?.id),
      },
      {
        onError: (e) => console.log(e.message),
        onSuccess: (addedComment) => {
          setInput('')
          console.log(addedComment)
          utils.invalidateQueries()
        },
      },
    )
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
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="flex justify-center items-center">
              <DotsThree size={25} className="cursor-pointer" />
            </button>
          </Dialog.Trigger>
          <PostActionModal postId={postData?.id} />
        </Dialog.Root>
      </div>

      <div className="h-[367px] overflow-y-auto">
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
        {postData?.comments.map((comment) => {
          return (
            <div key={comment.id} className="flex gap-2 p-4">
              <Image
                src={String(comment.user?.image) || ''}
                alt=""
                layout="fixed"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-xs flex-1">
                <strong>{comment?.user?.username}</strong>
                <span className="ml-1 md:ml-2 ">{comment?.text}</span>
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 text-bold">
                    {formatDistanceToNow(new Date(String(comment.createdAt)), {
                      locale: enUS,
                      includeSeconds: true,
                    })}
                  </span>
                  {comment?.likes.length > 0 && (
                    <span>{formatCommentLikes(comment?.likes.length)}</span>
                  )}
                  <span className="text-gray-400 font-bold text-xs cursor-pointer">
                    Reply
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Heart
                  size={12}
                  weight={
                    postData.likes.findIndex(
                      (like) => like.userId === userSession?.user?.id,
                    ) === -1
                      ? 'regular'
                      : 'fill'
                  }
                  color="red"
                  className="cursor-pointer"
                  onClick={() => handleLikeComment(comment.id)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex gap-2">
            <Heart
              size={25}
              weight="fill"
              color="red"
              className="cursor-pointer"
            />
            <Chat size={25} className="cursor-pointer" />
            <PaperPlaneTilt size={25} className="cursor-pointer" />
          </div>
          <BookmarkSimple size={25} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 px-4 py-1">
          <Image
            src={postData?.author.image || ''}
            alt=""
            layout="fixed"
            width={20}
            height={20}
            className="rounded-full"
          />
          {postData?.likes && formatPostLikes(postData?.likes)}
        </div>
        <span className="text-xs block text-gray-400 px-4 pt-2">
          {format(new Date(String(postData?.createdAt)), 'MMMM dd, yyyy')}
        </span>
      </div>

      <div className="border-t flex justify-between py-6 px-4 items-center text-sm">
        <Smiley size={25} className="cursor-pointer" />
        <form
          onSubmit={handleAddComment}
          className="flex flex-1 justify-between mx-2"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 mr-2"
          />
          <button
            type="submit"
            className="text-blue-500 disabled:text-blue-200 font-bold"
            disabled={disabled}
          >
            {isLoading ? (
              <SpinnerGap className="animate-spin" size={12} />
            ) : (
              'Post'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

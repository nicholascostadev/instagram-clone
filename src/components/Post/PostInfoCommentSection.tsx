import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Session } from 'next-auth'
import Image from 'next/image'
import { Heart } from 'phosphor-react'
import { formatCommentLikes } from '../../utils/post/formatters'
import { PostInfoProps } from './PostInfo'

interface PostInfoCommentSectionProps extends PostInfoProps {
  userSession: Session | null
  handleLikeComment: (commentId: number) => void
}

export const PostInfoCommentSection = ({
  postData,
  userSession,
  handleLikeComment,
}: PostInfoCommentSectionProps) => {
  return (
    <>
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
    </>
  )
}

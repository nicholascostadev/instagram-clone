// eslint-disable-next-line import/no-duplicates
import { formatDistanceToNow } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import enUS from 'date-fns/locale/en-US'
import Image from 'next/image'
import { Heart } from 'phosphor-react'
import { formatCommentLikes } from '../../utils/post/formatters'
import { PostInfoProps } from './PostInfo'
import Link from 'next/link'

interface PostInfoCommentSectionProps extends PostInfoProps {
  handleLikeComment: (commentId: number) => void
}

export const PostInfoCommentSection = ({
  postData,
  handleLikeComment,
}: PostInfoCommentSectionProps) => {
  return (
    <div>
      {postData?.comments.map((comment) => {
        return (
          <div key={comment.id} className="flex gap-2 p-4">
            <Image
              src={String(comment.user?.image) || ''}
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1 text-xs">
              <Link
                href={`/${comment?.user?.username}`}
                className="font-medium"
              >
                {comment?.user?.username}
              </Link>
              <span className="ml-1 md:ml-2 ">{comment?.text}</span>
              <div className="flex gap-2">
                <span className="text-bold text-xs text-gray-400">
                  {formatDistanceToNow(new Date(String(comment.createdAt)), {
                    locale: enUS,
                    includeSeconds: true,
                  })}
                </span>
                {comment?.likes.length > 0 && (
                  <span>{formatCommentLikes(comment?.likes.length)}</span>
                )}
                <span className="cursor-pointer text-xs font-bold text-gray-400">
                  Reply
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {/* TODO: Make liking comment work */}
              <Heart
                size={12}
                className="cursor-pointer"
                onClick={() => handleLikeComment(comment.id)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

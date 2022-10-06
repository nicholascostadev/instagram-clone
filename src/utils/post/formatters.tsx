import { Comment, Like, Post, User } from '@prisma/client'

/**
 * Simple pluralize function, takes an amount an returns either 'like' or 'likes'
 * @param {number} commentsAmount - number
 * @returns A function that takes in a number and returns a string.
 */
export const formatCommentLikes = (commentsAmount: number) => {
  if (commentsAmount === 1) {
    return `${commentsAmount} like`
  } else {
    return `${commentsAmount} likes`
  }
}

type TLikes =
  | (Like & {
      user: User | null
    })[]
  | undefined

type PostData = Post & {
  author: User
  comments: (Comment & {
    user: User | null
    likes: Like[]
  })[]
  likes: (Like & {
    user: User | null
  })[]
}

export const formatPostLikes = (likes: TLikes, postData: PostData) => {
  if (likes && postData) {
    if (likes.length === 1) {
      return (
        <p className="text-sm">
          Liked by <span className="font-bold">{likes[0]?.user?.username}</span>
        </p>
      )
    } else {
      return (
        <p className="text-sm">
          Liked by{' '}
          <span className="font-bold">
            {postData?.likes[0]?.user?.username}
          </span>{' '}
          {postData?.likes?.length > 1 ? (
            <span className="font-bold">
              and {postData?.likes?.length - 1} others
            </span>
          ) : (
            ''
          )}
        </p>
      )
    }
  } else return ''
}

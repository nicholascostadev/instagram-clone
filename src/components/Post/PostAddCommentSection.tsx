import { Session } from 'next-auth'
import { Smiley, SpinnerGap } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { PostInfoProps } from './PostInfo'

interface PostAddCommentSectionProps extends PostInfoProps {
  userSession: Session | null
}

export const PostAddCommentSection = ({
  userSession,
  postData,
}: PostAddCommentSectionProps) => {
  const [input, setInput] = useState('')
  const { mutate: addComment, isLoading } = trpc.post.comment.useMutation()

  const disabled = input.length === 0 || isLoading

  const utils = trpc.useContext()

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addComment(
      {
        comment: input,
        postId: Number(postData?.id),
        userId: String(userSession?.user?.id),
      },
      {
        onSuccess: () => {
          setInput('')
          utils.post.postModalInfo.invalidate()
          utils.post.getSpecificPost.invalidate()
        },
      },
    )
  }

  return (
    <div className="flex w-full items-center justify-between self-end justify-self-end border-t border-l p-4 py-6 text-sm">
      <Smiley size={25} className="cursor-pointer" />
      <form
        onSubmit={handleAddComment}
        className="mx-2 flex flex-1 justify-between"
      >
        <input
          type="text"
          placeholder="Add a comment..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="mr-2 flex-1"
        />
        <button
          type="submit"
          className="font-bold text-blue-500 disabled:text-blue-200"
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
  )
}

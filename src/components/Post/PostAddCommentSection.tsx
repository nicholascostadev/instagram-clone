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
  const { mutate, isLoading } = trpc.useMutation(['post.comment'])

  const disabled = input.length === 0 || isLoading

  const utils = trpc.useContext()

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        comment: input,
        postId: Number(postData?.id),
        userId: String(userSession?.user?.id),
      },
      {
        onError: (e) => console.error(e.message),
        onSuccess: () => {
          setInput('')
          utils.invalidateQueries()
        },
      },
    )
  }

  return (
    <div className="border-t flex justify-between justify-self-end self-end py-6 p-4 items-center text-sm">
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
  )
}

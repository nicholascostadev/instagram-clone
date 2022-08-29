import { useRouter } from 'next/router'
import { Smiley, Spinner } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { trpc } from '../../utils/trpc'

interface PostCommentSectionProps {
  postId: number | null
  userId: string | null
}

export const PostCommentSection = ({
  postId,
  userId,
}: PostCommentSectionProps) => {
  const [input, setInput] = useState('')
  const { mutate, isLoading } = trpc.useMutation(['post.comment'])
  const disabled = input.length === 0
  const utils = trpc.useContext()
  const router = useRouter()

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        comment: input,
        postId: Number(postId),
        userId: String(userId),
      },
      {
        onError: (e) => console.log(e.message),
        onSuccess: () => {
          setInput('')
          utils.invalidateQueries()
        },
      },
    )
    setInput('')
    router.push(`/p/${postId}`)
  }
  return (
    <div className="flex justify-between items-center gap-2 py-3 pl-2 pr-6">
      <Smiley className="cursor-pointer" size={30} />
      <form onSubmit={handleAddComment} className="flex-1 flex text-sm gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="disabled:text-blue-300 disabled:cursor-default text-blue-600 cursor-pointer"
          disabled={disabled}
          type="submit"
        >
          {isLoading ? (
            <Spinner size={12} className="animate-spin" />
          ) : (
            'Publish'
          )}
        </button>
      </form>
    </div>
  )
}

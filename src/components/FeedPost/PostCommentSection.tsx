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
  const { mutate, isLoading } = trpc.post.comment.useMutation()
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
        onSuccess: () => {
          setInput('')
          utils.post.getSpecificPost.invalidate()
        },
      },
    )
    setInput('')
    router.push(`/p/${postId || '1'}`)
  }
  return (
    <div className="flex items-center justify-between gap-2 py-3 pl-2 pr-6">
      <Smiley className="cursor-pointer" size={30} />
      <form onSubmit={handleAddComment} className="flex flex-1 gap-2 text-sm">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 outline-none"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="text-blue-600 disabled:cursor-default disabled:text-blue-300"
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

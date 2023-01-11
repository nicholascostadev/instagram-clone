import * as Dialog from '@radix-ui/react-dialog'
import { DotsThree } from 'phosphor-react'
import { PostActionModal } from './PostActionModal'

// TODO: Make this work

type PostThreeDotsButtonProps = {
  userId: string | undefined
  postId: number | undefined
}

export const PostThreeDotsButton = ({
  postId,
  userId,
}: PostThreeDotsButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center justify-center" type="button">
          <DotsThree size={25} className="cursor-pointer" />
        </button>
      </Dialog.Trigger>
      <PostActionModal userId={userId} postId={postId} />
    </Dialog.Root>
  )
}

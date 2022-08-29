import * as Dialog from '@radix-ui/react-dialog'
import { DotsThree } from 'phosphor-react'
import { PostActionModal } from './PostActionModal'
import { PostInfoProps } from './PostInfo'

export const PostThreeDotsButton = ({ postData }: PostInfoProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex justify-center items-center">
          <DotsThree size={25} className="cursor-pointer" />
        </button>
      </Dialog.Trigger>
      <PostActionModal postId={postData?.id} />
    </Dialog.Root>
  )
}

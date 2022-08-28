import * as Dialog from '@radix-ui/react-dialog'
import { DotsThree } from 'phosphor-react'
import { FeedPostActionModal } from './PostActionsModal'

export const PostThreeDotsButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex justify-center items-center">
          <DotsThree size={20} className="cursor-pointer" />
        </button>
      </Dialog.Trigger>
      <FeedPostActionModal />
    </Dialog.Root>
  )
}

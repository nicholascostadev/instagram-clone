import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import { api } from '../../utils/api'
import { usePostModalState } from '../../hooks/usePostModalState'

type PostActionModalProps = {
  userId: string | undefined
  postId: number | undefined
}
// TODO: Receive a postId(getting the poster's ID) for the actions as unfollow / follow
// On the backend, we can get the ctx user and follow / unfollow easily
export const PostActionModal = ({ userId, postId }: PostActionModalProps) => {
  const { data } = useSession()
  const ownsPost = data?.user?.id === userId
  const PostActionModalButtonBaseStyles =
    'hover:bg-gray-100 p-3 border-b border-solid border-gray-500/30'

  const { mutate: deletePost } = api.post.delete.useMutation()
  const { isModalOpen, setIsModalOpen } = usePostModalState()
  const utils = api.useContext()

  const handleAction = (action: string) => {
    // TODO: action
    switch (action) {
      case 'UNFOLLOW':
        //
        break
      default:
        break
    }
  }

  const handleDeletePost = async (postId: number | undefined) => {
    if (!postId) return

    deletePost({
      postId,
    })

    await Promise.all([
      utils.post.getAll.invalidate(),
      utils.post.getSpecificPost.invalidate(),
      utils.post.postModalInfo.invalidate(),
      utils.user.getUserInfo.invalidate(),
    ])

    if (isModalOpen) setIsModalOpen(false)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-screen bg-black/40" />

      <Dialog.Content
        className="fixed top-[55%] right-[42.5%] z-50 grid w-96 translate-x-[50%] translate-y-[-50%] rounded-lg border bg-white lg:translate-x-[-20%]
      "
      >
        {ownsPost && (
          <button
            className={`${PostActionModalButtonBaseStyles} rounded-t-lg p-3 font-bold text-red-500 hover:bg-red-100`}
            type="button"
            onClick={() => handleDeletePost(postId)}
          >
            Delete Post
          </button>
        )}
        <button
          className={`${PostActionModalButtonBaseStyles} rounded-t-lg p-3 font-bold text-red-500 hover:bg-gray-100`}
          type="button"
        >
          Report
        </button>
        <button
          className={`${PostActionModalButtonBaseStyles} p-3 font-bold text-red-500 hover:bg-gray-100`}
          onClick={() => handleAction('UNFOLLOW')}
          type="button"
        >
          Unfollow
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`} type="button">
          Add to favorites
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`} type="button">
          Go to post
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`} type="button">
          Share to...
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`} type="button">
          Copy link
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`} type="button">
          Embed
        </button>

        <Dialog.Close asChild>
          <button
            className={`${PostActionModalButtonBaseStyles} rounded-b-lg border-b-0`}
            type="button"
          >
            Cancelar
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

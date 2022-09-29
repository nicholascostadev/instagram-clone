import * as Dialog from '@radix-ui/react-dialog'

export const FeedPostActionModal = () => {
  const PostActionModalButtonBaseStyles =
    'hover:bg-gray-100 p-3 border-b border-solid border-gray-500/30'

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-screen bg-black/40" />

      <Dialog.Content
        className="fixed top-[55%] right-[50%] grid w-96 translate-x-[50%] translate-y-[-50%] rounded-lg border bg-white lg:translate-x-[-20%]
      "
      >
        <button
          className={`${PostActionModalButtonBaseStyles} rounded-t-lg p-3 font-bold text-red-500 hover:bg-gray-100`}
        >
          Report
        </button>
        <button
          className={`${PostActionModalButtonBaseStyles} p-3 font-bold text-red-500 hover:bg-gray-100`}
        >
          Unfollow
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`}>
          Add to favorites
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`}>
          Go to post
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`}>
          Share to...
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`}>
          Copy link
        </button>
        <button className={`${PostActionModalButtonBaseStyles}`}>Embed</button>

        <Dialog.Close asChild>
          <button
            className={`${PostActionModalButtonBaseStyles} rounded-b-lg border-b-0`}
          >
            Cancelar
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

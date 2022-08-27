import * as Dialog from '@radix-ui/react-dialog'

export const PostActionModal = () => {
  const PostActionModalButtonBaseStyles =
    'hover:bg-gray-100 p-3 border-b border-solid border-gray-500/30'

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen inset-0 bg-black/40" />

      <Dialog.Content
        className="w-96 rounded-lg bg-white border fixed top-[55%] right-[50%] translate-x-[50%] lg:translate-x-[-20%] translate-y-[-50%] grid
      "
      >
        <button
          className={`${PostActionModalButtonBaseStyles} hover:bg-gray-100 rounded-t-lg p-3 text-red-500 font-bold`}
        >
          Report
        </button>
        <button
          className={`${PostActionModalButtonBaseStyles} hover:bg-gray-100 p-3 text-red-500 font-bold`}
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
            className={`${PostActionModalButtonBaseStyles} border-b-0 rounded-b-lg`}
          >
            Cancelar
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

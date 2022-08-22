import * as Dialog from '@radix-ui/react-dialog'

export const PostActionModal = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen inset-0 bg-black/40" />

      <Dialog.Content
        className="w-96 rounded-lg bg-white border fixed top-[50%] right-[50%] translate-x-[-25%] translate-y-[-50%] grid

      "
      >
        <button className="hover:bg-gray-100 rounded-t-lg p-2 text-red-500 font-bold border-b border-gray-500/30">
          Denunciar
        </button>
        <button className="hover:bg-gray-100 p-2 text-red-500 font-bold border-b border-gray-500/30">
          Deixar de seguir
        </button>
        <button className="hover:bg-gray-100 p-2 border-b border-gray-500/30">
          Adicionar aos favoritos
        </button>
        <button className="hover:bg-gray-100 p-2 border-b border-gray-500/30">
          Ir para a publicação
        </button>

        <Dialog.Close asChild>
          <button className="hover:bg-gray-100 rounded-b-lg p-2">
            Cancelar
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

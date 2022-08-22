import * as Dialog from '@radix-ui/react-dialog'

export const PostActionModal = () => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen inset-0 bg-black/40" />

      <Dialog.Content
        className="w-96 rounded-lg bg-white border fixed top-[50%] right-[50%] translate-x[-50%] translate-y-[-50%] grid

      "
      >
        <ul className="flex flex-col w-full cursor-pointer rounded-lg text-center">
          <li className="hover:bg-gray-100 rounded-t-lg p-2 text-red-500 font-bold border-b border-gray-500/30">
            Denunciar
          </li>
          <li className="hover:bg-gray-100 p-2 text-red-500 font-bold border-b border-gray-500/30">
            Deixar de seguir
          </li>
          <li className="hover:bg-gray-100 p-2 border-b border-gray-500/30">
            Adicionar aos favoritos
          </li>
          <li className="hover:bg-gray-100 p-2 border-b border-gray-500/30">
            Ir para a publicação
          </li>

          <Dialog.Close>
            <li className="hover:bg-gray-100 rounded-b-lg p-2">Cancelar</li>
          </Dialog.Close>
        </ul>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

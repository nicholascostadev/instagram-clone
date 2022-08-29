import * as Dialog from '@radix-ui/react-dialog'
import { Image, X } from 'phosphor-react'

export const CreatePostModal = () => {

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen inset-0 bg-black/70" />
      <Dialog.Close asChild className='absolute top-5 right-5 text-white cursor-pointer'>
        <X size={25} className="cursor-pointer" />
      </Dialog.Close>

      <Dialog.Content
        className="w-1/3 h-3/4 rounded-2xl bg-white border fixed top-[15%] right-[50%] -translate-x-[-50%] 
        "
      >

        <h1 className='border-b p-2 text-center'>Create new Post</h1>

        <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
          <Image size={80} />
          <h1 className='text-xl'>Drag Photos and videos here</h1>
          <button className='bg-sky-500 text-white text-sm px-2 py-1 rounded-sm'>Select from computer</button>
        </div>


      </Dialog.Content>
    </Dialog.Portal>
  )
}
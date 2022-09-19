import * as Dialog from '@radix-ui/react-dialog'
import { Image, Smiley, X } from 'phosphor-react'
import NextImage from 'next/image'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'

export const CreatePostModal = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const postMutation = trpc.useMutation(['post.create'])
  const { data } = useSession()

  function clearAllInfo() {
    setImageSrc('')
    setPostDescription('')
  }

  async function handleCreatePost() {
    postMutation.mutate(
      {
        imageUrl: imageSrc,
        description: postDescription,
        userId: data?.user?.id as string,
      },
      {
        onError: (error) => console.log(error),
        onSuccess: (data) => {
          clearAllInfo()
          console.log(data)
        },
      },
    )
  }

  async function handleSelectImage(file: FileList | null) {
    if (file) {
      const formData = new FormData()

      formData.append('file', file[0] as File)
      formData.append('upload_preset', 'my-uploads')

      const data = await fetch(
        'https://api.cloudinary.com/v1_1/dk9q7uxls/image/upload',
        { method: 'POST', body: formData },
      ).then((response) => response.json())

      setImageSrc(data.secure_url)
    }
  }

  // function handleFileUpload() {
  //   postMutation.mutate(
  //     { file: image },
  //     {
  //       onError: (error) => console.log(error),
  //       onSuccess: (data) => console.log(data),
  //     },
  //   )
  // }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed h-screen inset-0 bg-black/70" />
      <Dialog.Close
        asChild
        className="absolute top-5 right-5 text-white cursor-pointer"
      >
        <X size={25} className="cursor-pointer" />
      </Dialog.Close>

      <Dialog.Content
        className={`${
          imageSrc ? 'w-2/3' : 'w-1/3'
        }  h-3/4 rounded-2xl bg-white border fixed top-[15%] right-[50%] -translate-x-[-50%] 
        `}
      >
        <div className="border-b p-2 text-center flex relative justify-center">
          <h1>Create new Post</h1>
          {imageSrc && (
            <button
              className="absolute text-blue-600 right-4"
              onClick={handleCreatePost}
            >
              Share
            </button>
          )}
        </div>

        <form
          className={`relative w-full h-full flex ${
            imageSrc ? 'flex-row' : 'flex-col'
          } gap-4 justify-center items-center`}
        >
          {!imageSrc && (
            <>
              <Image size={80} alt="" />
              <h1 className="text-xl">Drag Photos and videos here</h1>
              <label
                htmlFor="file-upload"
                className="bg-blue-400 text-white p-1 rounded-sm cursor-pointer"
              >
                Select from computer
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept=".jpg, .png, .jpeg"
                className="hidden"
                onChange={(e) => handleSelectImage(e.target.files)}
              />
            </>
          )}
          {imageSrc && (
            <>
              <div className="h-[calc(100%-40px)] w-[70%] absolute left-0 top-0 rounded-lg">
                {' '}
                <NextImage
                  src={imageSrc}
                  alt="Picture of the author"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                  className="rounded-xl"
                />
              </div>
              <div className="h-[calc(100%-40px)] absolute top-0 right-0 w-[30%]">
                <div className="flex items-center p-4 gap-2">
                  <NextImage
                    src={data?.user?.image ?? ''}
                    className="rounded-full"
                    width={35}
                    height={35}
                    alt=""
                  />
                  <p>{data?.user?.name}</p>
                </div>

                <textarea
                  cols={30}
                  rows={10}
                  onChange={(e) => setPostDescription(e.target.value)}
                  maxLength={2000}
                  className="w-full px-4 resize-none outline-none text-sm scrollbar-hide"
                  placeholder="Write a caption..."
                />
                <div className="flex justify-between items-center border-b py-2 px-4">
                  <Smiley size={20} />
                  <p className="text-sm">{postDescription.length}/2,000</p>
                </div>
              </div>
            </>
          )}
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

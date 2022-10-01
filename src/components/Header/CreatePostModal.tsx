import * as Dialog from '@radix-ui/react-dialog'
import { Image, Smiley, Trash, X } from 'phosphor-react'
import NextImage from 'next/image'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useSession } from 'next-auth/react'

export const CreatePostModal = () => {
  const [imageSrc, setImageSrc] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const postMutation = trpc.useMutation(['post.create'])
  const { invalidateQueries } = trpc.useContext()
  const { data } = useSession()

  function clearInfo(img?: boolean, description?: boolean) {
    if (!img && !description) {
      setImageSrc('')
      setPostDescription('')
      return
    }

    if (img && !description) {
      return setImageSrc('')
    } else if (description && !img) {
      return setPostDescription('')
    } else {
      setImageSrc('')
      setPostDescription('')
    }
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
        onSuccess: () => {
          clearInfo()
          invalidateQueries(['post.getAll'])
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
      <Dialog.Overlay className="fixed inset-0 h-screen bg-black/70" />
      <Dialog.Close
        asChild
        className="absolute top-5 right-5 cursor-pointer text-white"
      >
        <X size={25} className="cursor-pointer" />
      </Dialog.Close>

      <Dialog.Content
        className={`${
          imageSrc ? 'w-2/3' : 'w-1/3'
        }  fixed top-[15%] right-[50%] h-3/4 -translate-x-[-50%] rounded-2xl border bg-white 
        `}
      >
        <div className="relative flex justify-center border-b p-2 text-center">
          <h1>Create new Post</h1>
          {imageSrc && (
            <button
              className="absolute right-4 text-blue-600"
              onClick={handleCreatePost}
            >
              Share
            </button>
          )}
        </div>

        <form
          className={`relative flex h-full w-full ${
            imageSrc ? 'flex-row' : 'flex-col'
          } items-center justify-center gap-4`}
        >
          {!imageSrc && (
            <>
              <Image size={80} alt="" />
              <h1 className="text-xl">Drag Photos and videos here</h1>
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-sm bg-blue-400 p-1 text-white"
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
              <div className="absolute left-0 top-0 h-[calc(100%-40px)] w-[70%] rounded-lg">
                {' '}
                <button onClick={() => clearInfo(true)}>
                  <Trash
                    color="red"
                    className="absolute top-5 right-5 z-10"
                    size={20}
                  />
                </button>
                <NextImage
                  src={imageSrc}
                  alt="Picture of the author"
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                  className="rounded-xl"
                />
              </div>
              <div className="absolute top-0 right-0 h-[calc(100%-40px)] w-[30%]">
                <div className="flex items-center gap-2 p-4">
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
                  className="scrollbar-hide w-full resize-none px-4 text-sm outline-none"
                  placeholder="Write a caption..."
                />
                <div className="flex items-center justify-between border-b py-2 px-4">
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

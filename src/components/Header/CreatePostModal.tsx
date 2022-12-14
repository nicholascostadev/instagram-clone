import * as Dialog from '@radix-ui/react-dialog'
import { Image, Smiley, Trash, X } from 'phosphor-react'
import NextImage from 'next/image'
import { useState } from 'react'
import { api } from '../../utils/api'
import { useSession } from 'next-auth/react'
import { env } from '../../env/client.mjs'

interface CreatePostModalProps {
  closeModal: () => void
}

export const CreatePostModal = ({ closeModal }: CreatePostModalProps) => {
  const [imageSrc, setImageSrc] = useState('')
  const [postDescription, setPostDescription] = useState('')
  const [file, setFile] = useState<File | null>()
  const [loading, setLoading] = useState(false)
  const { mutate: createPost } = api.post.create.useMutation()
  const utils = api.useContext()
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

  // TODO: Maybe transfer this function to backend? I guess it's the best option
  // for security (using TRPC route)
  async function handleCreatePost() {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'my-uploads')
    await fetch(env.NEXT_PUBLIC_CLOUDINARY_FOLDER, {
      method: 'POST',
      body: formData,
    })
      .then(async (fData) => {
        const response = await fData.json()
        createPost(
          {
            imageUrl: response.secure_url,
            description: postDescription,
            userId: data?.user?.id as string,
          },
          {
            onError: (error) => {
              throw new Error(error.message)
            },
            onSuccess: async () => {
              clearInfo()

              await Promise.all([
                utils.post.getAll.invalidate(),
                utils.post.getSpecificPost.invalidate(),
                utils.post.postModalInfo.invalidate(),
                utils.user.getUserInfo.invalidate(),
              ])
            },
          },
        )
        setLoading(false)
        closeModal()
      })
      .catch(() => {
        throw new Error('message')
      })
  }

  const handleSelectImage = (files: FileList | null) => {
    if (files) {
      setImageSrc(URL.createObjectURL(files[0] as Blob))
      setFile(files[0])
    }
  }

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
              type="button"
            >
              {loading ? 'Loading...' : 'Post'}
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
                <button onClick={() => clearInfo(true)} type="button">
                  <Trash
                    color="red"
                    className="absolute top-5 right-5 z-10"
                    size={20}
                  />
                </button>
                <NextImage
                  src={imageSrc}
                  alt="Picture of the author"
                  fill
                  style={{ objectFit: 'contain' }}
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

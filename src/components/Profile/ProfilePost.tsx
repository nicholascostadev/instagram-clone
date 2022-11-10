import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { Chat, Heart } from 'phosphor-react'

interface ProfilePostProps {
  likesAmount: number
  commentsAmount: number
  image: string
  postId: number
  changePostId: (postId: number) => void
}

export const ProfilePost = ({
  commentsAmount,
  likesAmount,
  postId,
  image,
  changePostId,
}: ProfilePostProps) => {
  const handlePostClick = () => {
    changePostId(postId)
  }

  return (
    <Dialog.Trigger asChild onClick={handlePostClick}>
      <div className="relative block w-auto cursor-pointer md:h-[250px] md:w-[250px]">
        <div className="relative h-[150px] w-[150px] sm:h-[250px] sm:w-[250px]">
          <Image
            src={image}
            alt=""
            layout="fill"
            className="w-auto"
            objectFit="cover"
          />
        </div>
        <div
          className="absolute inset-0 z-10 flex items-center
                     justify-center gap-6 leading-none
                     text-white opacity-0 transition-all hover:bg-black/50 hover:opacity-100
                    "
        >
          <div className="flex gap-2">
            <Heart size={12} weight="fill" color="white" />
            <p>{likesAmount}</p>
          </div>
          <div className="flex gap-2">
            <Chat size={12} weight="fill" color="white" />
            <p>{commentsAmount}</p>
          </div>
        </div>
      </div>
    </Dialog.Trigger>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { Chat, Heart } from 'phosphor-react'

interface ProfilePostProps {
  likesAmount: number
  commentsAmount: number
  image: string
  postId: string
}

export const ProfilePost = ({
  commentsAmount,
  likesAmount,
  postId,
  image,
}: ProfilePostProps) => {
  return (
    <Link href={`/p/${postId}`} passHref className="w-[250px] h-[250px]">
      <a className="relative block">
        <Image src={image} alt="" layout="fixed" width={257} height={257} />
        <div
          className="absolute inset-0 z-10 leading-none opacity-0
                     hover:opacity-100 hover:bg-black/50 transition-all
                    flex justify-center items-center gap-6 text-white
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
      </a>
    </Link>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { SpinnerGap } from 'phosphor-react'

import { PostThreeDotsButton } from './PostThreeDotsButton'

interface PostHeaderProps {
  postOwnerImage: string
  postOwner: string
}

export const PostHeader = ({ postOwner, postOwnerImage }: PostHeaderProps) => {
  return (
    <header className="flex w-full items-center justify-between border-gray-200 pb-2">
      <div className="flex items-center gap-2">
        {postOwnerImage ? (
          <Link href={`/${postOwner}`}>
            <div className="flex rounded-full border-2 border-purple-300">
              <Image
                src={postOwnerImage ?? ''}
                alt=""
                layout="fixed"
                width={40}
                height={40}
                className="rounded-full outline-red-300 ring-offset-1"
              />
            </div>
          </Link>
        ) : (
          <SpinnerGap size={40} className="animate-spin" />
        )}
        <Link href={`/${postOwner}`}>
          <p className="text-sm font-bold">{postOwner ?? 'nicholascostadev'}</p>
        </Link>
      </div>
      <PostThreeDotsButton />
    </header>
  )
}

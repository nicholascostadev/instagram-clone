import Image from 'next/image'
import { SpinnerGap } from 'phosphor-react'
import { PostThreeDotsButton } from './PostThreeDotsButton'

interface PostHeaderProps {
  postOwnerImage: string
  postOwner: string
}

export const PostHeader = ({ postOwner, postOwnerImage }: PostHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-gray-200 w-full pb-2">
      <div className="flex items-center gap-2">
        {postOwnerImage ? (
          <div className="flex rounded-full border-2 border-purple-300">
            <Image
              src={postOwnerImage ?? 'https://github.com/nicholascostadev.png'}
              alt=""
              layout="fixed"
              width={40}
              height={40}
              className="rounded-full outline-red-300 ring-offset-1"
            />
          </div>
        ) : (
          <SpinnerGap size={40} className="animate-spin" />
        )}
        <p>{postOwner ?? 'nicholascostadev'}</p>
      </div>
      <PostThreeDotsButton />
    </header>
  )
}

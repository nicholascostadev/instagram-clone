import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { DotsThree, Spinner, SpinnerGap } from 'phosphor-react'
import { PostActions } from './PostActions'
import { PostActionModal } from './PostActionsModal'
import { PostCommentSection } from './PostCommentSection'
import { PostLikedByList } from './PostLikedByList'

interface PostProps {
  postOwner: string
  postOwnerImage: string
  postImage: string
}

export const Post = ({ postOwner, postOwnerImage, postImage }: PostProps) => {
  return (
    <div className="border bg-white rounded-lg relative flex flex-col">
      <div className="flex justify-between items-center px-3 pt-3 pb-1">
        <div className="flex items-center justify-between border-b border-gray-200 w-full pb-2">
          <div className="flex items-center gap-2">
            {postOwnerImage ? (
              <div className="flex rounded-full border-2 border-purple-300">
                <Image
                  src={
                    postOwnerImage ?? 'https://github.com/nicholascostadev.png'
                  }
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
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex justify-center items-center">
                <DotsThree size={20} className="cursor-pointer" />
              </button>
            </Dialog.Trigger>
            <PostActionModal />
          </Dialog.Root>
        </div>
      </div>
      <div className="relative w-full h-[470px]">
        {postImage ? (
          <Image
            layout="fill"
            src={
              postImage ??
              'https://instagram.fsdu6-1.fna.fbcdn.net/v/t51.2885-15/300057970_811470696932602_5375264863153378571_n.jpg?stp=dst-jpg_e0_s480x480&cb=9ad74b5e-b94cae63&_nc_ht=instagram.fsdu6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=1InzZCrD2pUAX9H17Sn&tn=jEdauWXTd9iECMi_&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=MjkwOTMwMjk4NTA1NDc3MzcwNw%3D%3D.2-ccb7-5&oh=00_AT-Ud4g9kweKg7y9TgB7Kl9OH4GcWvSyla3hWT6t4BxzqQ&oe=630B4460&_nc_sid=cff2a4'
            }
            alt=""
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size={40} className="animate-spin" />
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col gap-2 border-b pb-5">
        <PostActions />
        <PostLikedByList />
        <div>
          <a href="#" className="text-gray-400 text-sm">
            See all 295 comments
          </a>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase">32 minutes ago</p>
        </div>
      </div>
      <PostCommentSection />
    </div>
  )
}

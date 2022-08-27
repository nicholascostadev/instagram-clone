import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from 'phosphor-react'
import { PostActions } from './PostActions'
import { PostCommentSection } from './PostCommentSection'
import { PostHeader } from './PostHeader'
import { PostLikedByList } from './PostLikedByList'

interface PostProps {
  // optional just for testing
  postId?: number
  postOwner: string
  postOwnerImage: string
  postImage: string
}

export const Post = ({
  postId = 1,
  postOwner,
  postOwnerImage,
  postImage,
}: PostProps) => {
  return (
    <div className="border bg-white rounded-lg relative flex flex-col">
      <div className="flex justify-between items-center px-3 pt-3 pb-1">
        <PostHeader postOwner={postOwner} postOwnerImage={postOwnerImage} />
      </div>
      <div className="relative w-full h-[470px] border-y">
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
            <Spinner size={40} className="animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col gap-2 border-b pb-5">
        <PostActions />
        <PostLikedByList />
        <div>
          <Link href={`/p/${postId}`} passHref>
            <a className="text-gray-400 text-sm">See all 295 comments</a>
          </Link>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase cursor-pointer">
            32 minutes ago
          </p>
        </div>
      </div>
      <PostCommentSection />
    </div>
  )
}

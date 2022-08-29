import { Comment, Like, Post as TPost, User } from '@prisma/client'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from 'phosphor-react'
import { PostActions } from './PostActions'
import { PostCommentSection } from './PostCommentSection'
import { PostHeader } from './PostHeader'
import { PostLikedByList } from './PostLikedByList'

interface PostProps {
  // optional just for testing
  post: (TPost & {
    author: User;
    comments: Comment[];
    likes: (Like & {
      user: User | null;
    })[];
  })
  isLoading: boolean
  userId: string
}

export const Post = ({ isLoading, userId, post }: PostProps) => {
  return (
    <div className="border bg-white rounded-lg relative flex flex-col">
      <div className="flex justify-between items-center px-3 pt-3 pb-1">
        <PostHeader
          postOwner={String(post?.author.username)}
          postOwnerImage={String(post?.author.image)}
        />
      </div>
      <div className="relative w-full h-[470px] border-y">
        {post?.image && (
          <Image
            layout="fill"
            src={
              post?.image ??
              'https://instagram.fsdu6-1.fna.fbcdn.net/v/t51.2885-15/300057970_811470696932602_5375264863153378571_n.jpg?stp=dst-jpg_e0_s480x480&cb=9ad74b5e-b94cae63&_nc_ht=instagram.fsdu6-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=1InzZCrD2pUAX9H17Sn&tn=jEdauWXTd9iECMi_&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=MjkwOTMwMjk4NTA1NDc3MzcwNw%3D%3D.2-ccb7-5&oh=00_AT-Ud4g9kweKg7y9TgB7Kl9OH4GcWvSyla3hWT6t4BxzqQ&oe=630B4460&_nc_sid=cff2a4'
            }
            alt=""
          />
        )}
        {(!post?.image || isLoading) && (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner size={40} className="animate-spin text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-2 flex flex-col gap-2 border-b pb-5">
        <PostActions post={post} />
        {post.likes.length > 0 && <PostLikedByList post={post} />}
        <div>
          <p className='text-sm'><span className='font-bold'>{post?.author?.username}</span> {post?.description}</p>
        </div>
        <div>
          <Link href={`/p/${post?.id}`} passHref>
            <a className="text-gray-400 text-sm">
              {post?.comments.length > 0 &&
                `See all ${post?.comments.length} comments`}
            </a>
          </Link>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase cursor-pointer">
            {formatDistanceToNow(new Date(String(post.updatedAt || post.createdAt)), {
              addSuffix: true
            })}
          </p>
        </div>
      </div>
      <PostCommentSection postId={post?.id} userId={userId} />
    </div>
  )
}

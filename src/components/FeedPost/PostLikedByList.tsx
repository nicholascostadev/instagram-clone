import { Comment, Like, Post as TPost, User } from '@prisma/client';
import Image from 'next/image';

interface PostLikedByListProps {
  post: TPost & {
    author: User;
    comments: Comment[];
    likes: (Like & {
      user: User | null;
    })[];
  }
}

export const PostLikedByList = ({ post }: PostLikedByListProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex rounded-full">
        <Image
          src={post.likes[0]?.user?.image || ""}
          layout="fixed"
          alt=""
          height={20}
          width={20}
          className="rounded-full "
        />
      </div>
      {post.likes.length > 0 && (
        <p className="text-sm">Liked by <span className='font-bold'>{post.likes[0]?.user?.username}</span> {post.likes.length > 1 ? <span className='font-bold'>and {post.likes.length - 1} others</span> : ""}</p>
      )
      }
    </div >
  )
}

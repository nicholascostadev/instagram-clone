import { useSession } from 'next-auth/react'
import { trpc } from '../../utils/trpc'
import { Post } from '../FeedPost'

export const FeedPosts = () => {
  const { data: posts, isLoading } = trpc.useQuery(['post.getAll'], { refetchOnWindowFocus: false, })
  const { data: userSession } = useSession()
  const userId = userSession?.user?.id
  return (
    <div className="mt-4 flex flex-col gap-3">
      {posts?.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            isLoading={isLoading}
            userId={String(userId)}
          />
        )
      })}
    </div>
  )
}

import { useSession } from 'next-auth/react'
import { trpc } from '../../utils/trpc'
import { Post } from '../FeedPost'

export const FeedPosts = () => {
  const { data: feedPosts, isLoading } = trpc.post?.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  const { data: userSession } = useSession()
  const userId = userSession?.user?.id
  return (
    <div className="mt-4  flex flex-col gap-3 ">
      {feedPosts?.map((post) => {
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

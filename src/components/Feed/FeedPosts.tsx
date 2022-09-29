import { useSession } from 'next-auth/react'
import { useFeedPosts } from '../../hooks/useFeedPosts'
import { Post } from '../FeedPost'

export const FeedPosts = () => {
  const { feedPosts, isLoading } = useFeedPosts()

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

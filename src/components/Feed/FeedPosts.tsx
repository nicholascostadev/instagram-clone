import { Post } from '../FeedPost'

export const FeedPosts = () => {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <Post
        postImage=""
        postOwner="nicholascostadev"
        postOwnerImage="https://github.com/nicholascostadev.png"
      />
      <Post
        postOwner="diego3g"
        postImage="https://github.com/nicholascostadev.png"
        postOwnerImage="https://github.com/diego3g.png"
      />
    </div>
  )
}

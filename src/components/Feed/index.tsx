import { FeedPosts } from './FeedPosts'
import { Stories } from '../Stories'

export const Feed = () => {
  return (
    <>
      <main className="px-96  h-screen grid grid-cols-2 pt-10">
        <div>
          <Stories />
          {/* Content */}
          <FeedPosts />
        </div>
        <div>{/* Other things */}</div>
      </main>
    </>
  )
}

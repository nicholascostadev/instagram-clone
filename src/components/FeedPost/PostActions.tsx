import { useRouter } from 'next/router'
import { BookmarkSimple, Chat, Heart, PaperPlaneTilt } from 'phosphor-react'
import { useState } from 'react'

export const PostActions = ({ postId }: { postId: number }) => {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex justify-between items-center gap-5">
        <button onClick={() => setLiked((prev) => !prev)}>
          <Heart
            weight={liked ? 'fill' : 'regular'}
            size={30}
            className={`${
              liked ? 'text-red-600 transition-colors' : 'hover:text-gray-400'
            }`}
          />
        </button>
        <button>
          <Chat
            size={30}
            className="hover:text-gray-400"
            onClick={() => router.push(`/p/${postId}`)}
          />
        </button>
        <button>
          <PaperPlaneTilt size={30} className="hover:text-gray-400" />
        </button>
      </div>
      <button>
        <BookmarkSimple
          weight={saved ? 'fill' : 'regular'}
          onClick={() => setSaved((prev) => !prev)}
          size={30}
          className={`${saved ? 'text-gray-900' : 'hover:text-gray-400'}`}
        />
      </button>
    </div>
  )
}

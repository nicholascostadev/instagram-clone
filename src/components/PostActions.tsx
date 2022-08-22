import { Bookmark, Chat, Heart, PaperPlaneTilt } from 'phosphor-react'

export const PostActions = () => {
  return (
    <div className="flex justify-between items-center mb-1">
      <div className="flex justify-between items-center gap-5">
        <button>
          <Heart size={30} />
        </button>
        <button>
          <Chat size={30} />
        </button>
        <button>
          <PaperPlaneTilt size={30} />
        </button>
      </div>
      <Bookmark size={30} />
    </div>
  )
}

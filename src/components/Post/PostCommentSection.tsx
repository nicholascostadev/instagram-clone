import { Smiley } from 'phosphor-react'

export const PostCommentSection = () => {
  return (
    <div className="flex justify-between items-center gap-2 py-3 pl-2 pr-6">
      <Smiley
        onClick={() => console.log('Clicked on emoji')}
        className="cursor-pointer"
        size={30}
      />
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 text-sm"
      />
      <button
        className="disabled:text-blue-300 disabled:cursor-default text-blue-600 cursor-pointer"
        disabled
      >
        Publicar
      </button>
    </div>
  )
}

import Image from 'next/image'

interface SuggestionProps {
  name: string
  suggestion: string
  suggestionAmount: number | null
  image: string
}

export const FeedSuggestion = ({
  name,
  suggestion,
  suggestionAmount,
  image,
}: SuggestionProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="border rounded-full flex justify-center items-center">
        <Image
          src={image || 'https://github.com/nicholascostadev.png'}
          alt=""
          width={30}
          height={30}
          layout="fixed"
          className="rounded-full"
        />
      </div>
      <div>
        <strong className="text-sm">{name || 'nicholas_m_costa'}</strong>
        <p className="text-xs text-gray-400">
          Followed by {suggestion || 'mauricio_fcarv'}{' '}
          {suggestionAmount ? `+ ${suggestionAmount} more` : ''}
        </p>
      </div>
      <a href="#" className="ml-auto text-xs text-blue-500 font-bold">
        Follow
      </a>
    </div>
  )
}

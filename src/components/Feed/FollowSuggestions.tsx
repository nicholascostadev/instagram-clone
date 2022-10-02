import { trpc } from '../../utils/trpc'
import { FeedSuggestion } from './FeedSuggestion'

export const FeedFollowSuggestions = () => {
  const { data: feedSuggestions } = trpc.useQuery([
    'suggestions.feed',
    { amount: 5 },
  ])

  return (
    <div className="mt-4 flex flex-col gap-2">
      {feedSuggestions?.map((suggestion) => (
        <FeedSuggestion
          key={suggestion.username}
          image={suggestion.image as string}
          name={suggestion.username as string}
          followedBy={suggestion.followers}
          id={suggestion.id}
        />
      ))}
    </div>
  )
}

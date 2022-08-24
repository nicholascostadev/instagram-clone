import { FeedSuggestion } from './FeedSuggestion'

export const FeedFollowSuggestions = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <FeedSuggestion image="" name="" suggestion="" suggestionAmount={5} />
      <FeedSuggestion image="" name="" suggestion="" suggestionAmount={null} />
      <FeedSuggestion image="" name="" suggestion="" suggestionAmount={5} />
      <FeedSuggestion image="" name="" suggestion="" suggestionAmount={5} />
      <FeedSuggestion image="" name="" suggestion="" suggestionAmount={null} />
    </div>
  )
}

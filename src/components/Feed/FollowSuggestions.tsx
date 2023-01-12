import { api } from '../../utils/api'
import { FeedSuggestion } from './FeedSuggestion'

export const FeedFollowSuggestions = () => {
  const { data } = api.suggestions.explore.useQuery(
    { amount: 10 },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  const followsLoggedUser = data?.followsLoggedUser
  const followsSomeoneYouFollow = data?.followsSomeoneYouFollow

  const filteredData = [followsLoggedUser, followsSomeoneYouFollow]
    .flat()
    .filter((user, index, self) => {
      return (
        index ===
        self.findIndex((t) => {
          return t?.user.id === user?.user.id
        })
      )
    }) as typeof followsLoggedUser | typeof followsSomeoneYouFollow

  return (
    <div className="mt-4 flex flex-col gap-2">
      {filteredData?.map((suggestion) => (
        <FeedSuggestion
          key={suggestion?.user.username}
          image={suggestion?.user.image as string}
          name={suggestion?.user.username as string}
          followedBy={suggestion?.user.followers}
          id={suggestion?.user.id}
        />
      ))}
    </div>
  )
}

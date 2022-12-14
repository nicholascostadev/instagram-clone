import { Header } from '../../components/Header'
import { SuggestionRow } from '../../components/pages/explore/SuggestionRow'
import { api } from '../../utils/api'

export default function Explore() {
  const { data } = api.suggestions.explore.useQuery(
    { amount: 10 },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  )

  const filteredData = data?.filter((item) => {
    // recommending only users that follow you or your friends(people you follow),
    // follow too
    return (
      (item.recommendationReason === 'followed by' &&
        item.followedByRecommendations.length > 0) ||
      item.recommendationReason === 'follows you'
    )
  })

  return (
    <>
      <Header />
      <div className="mt-10 flex items-start justify-center md:mt-40">
        <div className="mx-auto w-[600px] max-w-full">
          <h1>Suggested</h1>
          <div className="mt-2 flex flex-col gap-4 rounded-sm bg-white p-4">
            {filteredData?.length === 0 && (
              <div>
                <p className="text-gray-500">
                  No suggestions for you right now :D
                </p>
              </div>
            )}
            {filteredData &&
              filteredData?.map((suggestion) => {
                if (suggestion.recommendationReason === 'followed by') {
                  return (
                    <SuggestionRow
                      key={suggestion.id}
                      recommendationReason="followed by"
                      image={suggestion.image}
                      userId={suggestion.id}
                      username={suggestion.username}
                      name={suggestion.name}
                      followedByRecommendations={
                        suggestion.followedByRecommendations
                      }
                    />
                  )
                }

                return (
                  <SuggestionRow
                    key={suggestion.id}
                    recommendationReason="follows you"
                    image={suggestion.image}
                    userId={suggestion.id}
                    username={suggestion.username}
                    name={suggestion.name}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

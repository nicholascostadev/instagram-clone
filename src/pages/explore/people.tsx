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
                if (!suggestion) return null
                if (suggestion?.recommendationReason === 'followed by') {
                  return (
                    <SuggestionRow
                      key={suggestion.user.id}
                      recommendationReason="followed by"
                      image={suggestion.user.image}
                      userId={suggestion.user.id}
                      username={suggestion.user.username}
                      name={suggestion.user.name}
                      followedByRecommendation={suggestion.followedByUser}
                    />
                  )
                }

                return (
                  <SuggestionRow
                    key={suggestion.user.id}
                    recommendationReason="follows you"
                    image={suggestion.user.image}
                    userId={suggestion.user.id}
                    username={suggestion.user.username}
                    name={suggestion.user.name}
                  />
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

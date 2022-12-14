import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { api } from '../../utils/api'
import { SearchResult } from './SearchResult'

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [search, queryUtils] = useDebounce(searchQuery, 300)
  const searchModalOpen = searchQuery.length > 0
  const isPending = queryUtils.isPending()
  const { data: searchResults, isLoading } = api.user.search.useQuery(
    {
      query: search,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 60 minutes
    },
  )

  return (
    <>
      <input
        placeholder="Search"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-32 rounded-lg bg-gray-100 pt-3 pb-1.5 pl-8 text-sm font-thin sm:w-64"
      />
      <MagnifyingGlass
        size={20}
        className="absolute top-2.5 left-1.5 text-gray-200"
      />
      <div
        className={`absolute top-[38px] z-40 w-full rounded-lg border bg-white ${
          searchModalOpen ? 'flex' : 'hidden'
        } `}
      >
        <ul className="flex w-full flex-col gap-2 [&_li]:w-full [&_li]:px-2 [&_li]:py-1 [&_li:hover]:bg-gray-200 [&_li:first-child]:rounded-t-md [&_li:last-child]:rounded-b-md">
          {(isLoading || isPending) && (
            <p className="p-2 text-center text-sm text-gray-500">Loading...</p>
          )}
          {!isLoading && !isPending && searchResults?.length === 0 && (
            <p className="p-2">No results for your search :(</p>
          )}
          {!isPending &&
            searchResults?.map((user) => (
              <SearchResult
                key={user.name}
                userImage={user.image}
                userName={user.name}
                username={user.username}
              />
            ))}
          <p className="text-center text-xs text-gray-500">
            Showing only at max 5 people
          </p>
        </ul>
      </div>
    </>
  )
}

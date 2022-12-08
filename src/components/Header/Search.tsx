import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { trpc } from '../../utils/trpc'

const getUserInitials = (name: string | null): string => {
  if (!name) return ''

  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
}

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [search, queryUtils] = useDebounce(searchQuery, 300)
  const searchModalOpen = searchQuery.length > 0
  const isPending = queryUtils.isPending()
  const { data: searchResults, isLoading } = trpc.user.search.useQuery(
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
              <li>
                <Link
                  href={`/${user.username}`}
                  className="flex items-center gap-2"
                >
                  <Avatar.Root className="AvatarRoot flex h-8 w-8 items-center justify-center rounded-full">
                    <Avatar.Image
                      className="AvatarImage flex items-center justify-center rounded-full object-cover"
                      src={user.image ?? ''}
                      alt={`${user?.name ?? ''} profile picture`}
                    />

                    <Avatar.Fallback
                      className="AvatarFallback flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 p-1 text-sm text-white"
                      delayMs={600}
                    >
                      {getUserInitials(user.name)}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <div>
                    <strong>{user.username}</strong>
                    <p className="text-sm">{user.name}</p>
                  </div>
                </Link>
              </li>
            ))}
          <p className="text-center text-xs text-gray-500">
            Showing only at max 5 people
          </p>
        </ul>
      </div>
    </>
  )
}

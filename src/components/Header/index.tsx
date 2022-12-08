import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  CaretDown,
  ChatCircleText,
  Compass,
  Heart,
  House,
  MagnifyingGlass,
  PlusCircle,
} from 'phosphor-react'
import { useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import InstagramLogo from '../../assets/instagram-logo.png'
import { trpc } from '../../utils/trpc'
import { CreatePostModal } from './CreatePostModal'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'

export const Header = () => {
  const [input, setInput] = useState('')
  const [searchQuery, queryUtils] = useDebounce(input, 500)
  const { data } = useSession()
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const searchModalOpen = input.length > 0

  const { data: userInfo } = trpc.user.getUserInfo.useQuery(
    {
      id: data?.user?.id,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  )

  const { data: searchResults, isLoading } = trpc.user.search.useQuery(
    {
      query: searchQuery,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 60 minutes
    },
  )

  const { pathname } = useRouter()
  const isPending = queryUtils.isPending()

  const closeModal = useMemo(() => setProfileModalOpen(false), [])

  return (
    <header className="sticky z-10 w-full overflow-visible border-b bg-white py-5 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-2">
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/"
            passHref
            className="mt-2 flex items-center justify-center text-xl"
          >
            <Image
              src={InstagramLogo}
              alt="Instagram Logo"
              width={96}
              height={32}
              className="h-8 w-24"
            />
          </Link>
          <CaretDown size={15} weight="bold" className="cursor-pointer" />
        </div>
        <div className="relative hidden items-center justify-center gap-4 overflow-visible lg:flex">
          <input
            placeholder="Search"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-32 rounded-lg bg-gray-100 pt-3 pb-1.5 pl-8 text-sm font-thin sm:w-64"
          />
          <MagnifyingGlass
            size={20}
            className="absolute top-2.5 left-1.5 text-gray-200"
          />
          <div
            className={`absolute top-[38px] z-40 w-full rounded-lg border bg-white ${
              searchModalOpen ? 'flex' : 'hidden '
            } `}
          >
            <ul className="flex w-full flex-col gap-2 [&_li]:w-full [&_li]:px-2 [&_li]:py-1 [&_li:hover]:bg-gray-200 [&_li:first-child]:rounded-t-md [&_li:last-child]:rounded-b-md">
              {(isLoading || isPending) && (
                <p className="p-2 text-center text-sm text-gray-500">
                  Loading...
                </p>
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
                          alt={`${userInfo?.name ?? ''} profile picture`}
                        />

                        <Avatar.Fallback
                          className="AvatarFallback flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-500 p-1 text-sm text-white"
                          delayMs={600}
                        >
                          {user?.name &&
                            user.name
                              .split(' ')
                              .map((name) => name[0])
                              .join('')}
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
        </div>
        {data && (
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <House
                className="cursor-pointer"
                size={30}
                weight={pathname === '/' ? 'fill' : 'regular'}
              />
            </Link>
            <ChatCircleText className="cursor-pointer" size={30} />
            <Dialog.Root
              open={profileModalOpen}
              onOpenChange={setProfileModalOpen}
            >
              <Dialog.Trigger asChild>
                <button
                  className="flex items-center justify-center"
                  type="button"
                >
                  <PlusCircle className="cursor-pointer" size={30} />
                </button>
              </Dialog.Trigger>
              <CreatePostModal closeModal={() => closeModal} />
            </Dialog.Root>

            <Compass className="cursor-pointer" size={30} />
            <Heart className="cursor-pointer" size={30} />
            <HeaderProfileDropdown userInfo={userInfo} />
          </div>
        )}
      </nav>
    </header>
  )
}

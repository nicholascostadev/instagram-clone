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
  PlusCircle,
} from 'phosphor-react'
import { useMemo, useState } from 'react'
import InstagramLogo from '../../assets/instagram-logo.png'
import { trpc } from '../../utils/trpc'
import { CreatePostModal } from './CreatePostModal'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'
import { Search } from './Search'

export const Header = () => {
  const { data } = useSession()
  const [profileModalOpen, setProfileModalOpen] = useState(false)

  const { data: userInfo } = trpc.user.getUserInfo.useQuery(
    {
      id: data?.user?.id,
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  )

  const { pathname } = useRouter()

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
          <Search />
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

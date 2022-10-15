import * as Dialog from '@radix-ui/react-dialog'
import { useSession } from 'next-auth/react'
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
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { CreatePostModal } from './CreatePostModal'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'
import InstagramLogo from '../../assets/instagram-logo.png'
import Image from 'next/image'

export const Header = () => {
  const [input, setInput] = useState('')
  const { data } = useSession()
  const [modalOpen, setModalOpen] = useState(false)
  const { data: userInfo } = trpc.useQuery(
    [
      'user.getUserInfo',
      {
        id: data?.user?.id,
      },
    ],
    { refetchOnWindowFocus: true },
  )
  const router = useRouter()

  const closeModal = () => setModalOpen(false)

  return (
    <header className="sticky w-full overflow-hidden border-b bg-white py-5 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-2">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" passHref>
            <a className="mt-2 flex items-center justify-center text-xl">
              <Image
                src={InstagramLogo}
                alt=""
                layout="fixed"
                width={100}
                height={30}
              />
            </a>
          </Link>
          <CaretDown size={15} weight="bold" className="cursor-pointer" />
        </div>
        <div className="relative hidden items-center justify-center gap-4 lg:flex ">
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
        </div>
        {data && (
          <div className="flex items-center justify-center gap-4">
            <House
              className="cursor-pointer"
              size={30}
              weight={router.pathname === '/' ? 'fill' : 'regular'}
              onClick={() => router.push('/')}
            />
            <ChatCircleText className="cursor-pointer" size={30} />
            <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
              <Dialog.Trigger asChild>
                <button
                  className="flex items-center justify-center"
                  type="button"
                >
                  <PlusCircle className="cursor-pointer" size={30} />
                </button>
              </Dialog.Trigger>
              <CreatePostModal closeModal={closeModal} />
            </Dialog.Root>

            <Compass className="cursor-pointer" size={30} />
            <Heart className="cursor-pointer" size={30} />
          </div>
        )}
        <HeaderProfileDropdown userInfo={userInfo} />
      </nav>
    </header>
  )
}

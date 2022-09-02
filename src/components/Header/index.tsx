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
  const { status, data } = useSession()
  const { data: userInfo } = trpc.useQuery(
    [
      'user.getUserInfo',
      {
        id: data?.user?.id,
      },
    ],
    { refetchOnWindowFocus: false },
  )
  const router = useRouter()
  if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <header className="py-5 border-b shadow-sm sticky w-full bg-white">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-2">
        <div className="flex justify-center items-center gap-2">
          <Link href="/" passHref>
            <a className="text-xl flex justify-center items-center mt-2">
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
        <div className="relative">
          <input
            placeholder="Search"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-100 pt-3 pb-1.5 rounded-lg text-sm w-32 sm:w-64 pl-8 font-thin"
          />
          <MagnifyingGlass
            size={20}
            className="absolute text-gray-200 top-2.5 left-1.5"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <House
            className="cursor-pointer"
            size={30}
            weight={router.pathname === '/' ? 'fill' : 'regular'}
            onClick={() => router.push('/')}
          />
          <ChatCircleText className="cursor-pointer" size={30} />
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="flex justify-center items-center">
                <PlusCircle className="cursor-pointer" size={30} />
              </button>
            </Dialog.Trigger>
            <CreatePostModal />
          </Dialog.Root>

          <Compass className="cursor-pointer" size={30} />
          <Heart className="cursor-pointer" size={30} />
          <HeaderProfileDropdown userInfo={userInfo} />
        </div>
      </nav>
    </header>
  )
}

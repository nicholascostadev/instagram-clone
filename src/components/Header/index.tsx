import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ChatCircleText,
  Compass,
  Heart,
  House,
  MagnifyingGlass,
  PlusCircle,
} from 'phosphor-react'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'

export const Header = () => {
  const [input, setInput] = useState('')
  const { status, data } = useSession()
  const { data: userInfo } = trpc.useQuery(['user.getUserInfo', {
    id: data?.user?.id
  }])
  const router = useRouter()

  if (status === 'unauthenticated') {
    router.push('/')
  }

  return (
    <header className="py-5 border-b shadow-sm sticky w-full bg-white">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-2">
        <div>
          <Link href="/" passHref>
            <a className="text-xl">Instagram</a>
          </Link>
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
          <House className="cursor-pointer" size={30} weight="fill" onClick={() => router.push("/")} />
          <ChatCircleText className="cursor-pointer" size={30} />
          <PlusCircle className="cursor-pointer" size={30} />
          <Compass className="cursor-pointer" size={30} />
          <Heart className="cursor-pointer" size={30} />
          <HeaderProfileDropdown userInfo={userInfo} />
        </div>
      </nav>
    </header>
  )
}

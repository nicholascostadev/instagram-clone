import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'

export const Header = () => {
  const [input, setInput] = useState('')
  const { data } = useSession()

  if (!data) {
    return (
      <div className="container flex justify-center items-center gap-2 text-gray-400 py-3 bg-white">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2"
          onClick={() => signIn('google')}
        >
          Entrar
        </button>
      </div>
    )
  }
  return (
    <div className="flex justify-between items-center py-5 px-96 border-b shadow-sm sticky w-full bg-white">
      <div>
        <Link href="/feed" passHref>
          <a className="text-xl">Instagram</a>
        </Link>
      </div>
      <div className="relative">
        <input
          placeholder="Pesquisar"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-100 pt-3 pb-1.5 rounded-lg text-sm w-64 pl-8 font-thin"
        />
        <MagnifyingGlass
          size={20}
          className="absolute text-gray-200 top-2.5 left-1.5"
        />
      </div>
      <div>
        <HeaderProfileDropdown />
      </div>
    </div>
  )
}

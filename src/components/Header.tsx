import { signIn, useSession } from 'next-auth/react'
import { HeaderProfileDropdown } from './HeaderProfileDropdown'

export const Header = () => {
  const { data } = useSession()
  if (!data) {
    return (
      <div className="container flex justify-center items-center gap-2 text-gray-400 py-3">
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
    <div className="flex justify-between items-center py-5 px-96 border-b shadow-sm">
      <div>
        <h1>Instagram</h1>
      </div>
      <div>
        <input value="asd" type="text" />
      </div>
      <div>
        <HeaderProfileDropdown />
      </div>
    </div>
  )
}

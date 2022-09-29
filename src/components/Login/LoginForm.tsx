import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { FacebookLogo } from 'phosphor-react'
import { FormEvent } from 'react'
import InstagramLogo from '../../assets/instagram-logo.png'

export const LoginForm = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const inputClasses =
    'border border-slate-200 bg-gray-100 outline-none p-2 rounded-sm placeholder:text-xs'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-sm bg-transparent px-12 pt-12 pb-5 md:border md:bg-white"
    >
      <div className="mb-5 flex justify-center">
        <Image
          src={InstagramLogo}
          alt="logo"
          layout="fixed"
          height={51}
          width={175}
        />
      </div>
      <input
        type="text"
        placeholder="Phone number, username, or email"
        className={inputClasses}
      />
      <input placeholder="Password" type="text" className={inputClasses} />
      <button
        className="mt-2 rounded-md bg-blue-500 p-1 text-white hover:bg-blue-600"
        onClick={() => signIn('google')}
      >
        Log in
      </button>

      <div className="flex items-center justify-between gap-5 py-3 text-gray-400">
        <hr className="flex-1 border" />
        OR
        <hr className="flex-1 border" />
      </div>

      <a
        href="#"
        className="flex items-center justify-center gap-2 text-sm text-blue-800 hover:underline"
      >
        <FacebookLogo size={20} />
        Log in with Facebook
      </a>

      <a
        href="#"
        className="mt-2 flex items-center justify-center gap-2 text-xs text-blue-900 hover:underline"
      >
        Forgot password?
      </a>
    </form>
  )
}

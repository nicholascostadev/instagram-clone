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
      className="bg-transparent md:bg-white md:border flex flex-col pt-12 px-12 pb-5 gap-2 rounded-sm"
    >
      <div className="flex justify-center mb-5">
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
        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2"
        onClick={() => signIn('google')}
      >
        Log in
      </button>

      <div className="flex justify-between items-center gap-5 text-gray-400 py-3">
        <hr className="border flex-1" />
        OR
        <hr className="border flex-1" />
      </div>

      <a
        href="#"
        className="text-blue-800 text-sm hover:underline flex justify-center items-center gap-2"
      >
        <FacebookLogo size={20} />
        Log in with Facebook
      </a>

      <a
        href="#"
        className="text-blue-900 text-xs hover:underline flex justify-center items-center gap-2 mt-2"
      >
        Forgot password?
      </a>
    </form>
  )
}

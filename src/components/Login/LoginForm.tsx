import { signIn } from 'next-auth/react'
import { FacebookLogo } from 'phosphor-react'
import { FormEvent } from 'react'

export const LoginForm = () => {
  // const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])
  const inputClasses =
    'border border-slate-200 bg-gray-100 outline-none p-2 rounded-sm placeholder:text-xs'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border flex flex-col pt-12 px-12 pb-5 gap-2 rounded-sm"
    >
      <h1 className="text-3xl text-center mb-5">Instagram</h1>
      <input
        type="text"
        placeholder="Telefone, nome de usuário ou email"
        className={inputClasses}
      />
      <input placeholder="Senha" type="text" className={inputClasses} />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-md mt-2"
        onClick={() => signIn('google')}
      >
        Entrar
      </button>

      <div className="flex justify-between items-center gap-5 text-gray-400 py-3">
        <hr className="border flex-1" />
        OU
        <hr className="border flex-1" />
      </div>

      <a
        href="#"
        className="text-blue-800 text-sm hover:underline flex justify-center items-center gap-2"
      >
        <FacebookLogo size={20} />
        Entrar com o Facebook
      </a>

      <a
        href="#"
        className="text-blue-900 text-xs hover:underline flex justify-center items-center gap-2 mt-2"
      >
        Esqueceu a senha?
      </a>
    </form>
  )
}

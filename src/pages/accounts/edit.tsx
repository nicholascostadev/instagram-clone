import { useSession } from 'next-auth/react'
import { SpinnerGap } from 'phosphor-react'
import { FormEvent, useRef } from 'react'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'

const Edit = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: userSession } = useSession()
  const { data: userInfo } = trpc.useQuery([
    'user.getUserInfo',
    { id: userSession?.user?.id },
  ])
  const user = trpc.useMutation(['user.changeUsername'])
  const utils = trpc.useContext()

  const handleUsernameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    user.mutate(
      {
        oldUsername: String(userInfo?.username),
        newUsername: String(inputRef?.current?.value),
      },
      {
        onError: (e) => console.error(e),
      },
    )

    utils.invalidateQueries()
  }

  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-120px)] flex justify-center items-center">
        <div className="border bg-white rounded-md w-[60rem] h-[30rem]">
          <form
            onSubmit={handleUsernameChange}
            className="flex justify-center items-center p-8"
          >
            <div className="flex justify-center items-center gap-8">
              <label htmlFor="username" className="font-bold">
                Username
              </label>
              <input
                name="username"
                id="username"
                ref={inputRef}
                type="text"
                placeholder="Change your username"
                className="border rounded-sm px-2 py-1 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 text-white rounded-md px-2 py-1 ml-2"
            >
              {user.isLoading ? (
                <SpinnerGap size={12} className="animate-spin" />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit

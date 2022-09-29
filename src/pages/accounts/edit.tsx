import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { CheckCircle, SpinnerGap, X } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { Header } from '../../components/Header'
import { trpc } from '../../utils/trpc'

const Edit = () => {
  const [input, setInput] = useState('')
  const { data: userSession } = useSession()
  const { data: userInfo } = trpc.useQuery(
    ['user.getUserInfo', { id: userSession?.user?.id }],
    { staleTime: Infinity },
  )
  const [lastUsername, setLastUsername] = useState(userInfo?.username)
  const user = trpc.useMutation(['user.changeUsername'])
  const utils = trpc.useContext()

  const handleUsernameChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    user.mutate(
      {
        oldUsername: String(userInfo?.username),
        newUsername: String(input),
      },
      {
        onSuccess: (s) => setLastUsername(String(s.username)),
        onSettled: () => utils.invalidateQueries('user.getUserInfo'),
      },
    )
  }

  const invalidNewUsername = user.isError || input === lastUsername

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Header />
      <div className="flex h-[calc(100vh-7.5rem)] w-full items-center justify-center">
        <div className="h-[480px] w-[960px] rounded-md border bg-white">
          <form
            onSubmit={handleUsernameChange}
            className="flex flex-col items-center p-8"
          >
            <div className="flex items-center justify-center">
              <label htmlFor="username" className="mr-8 font-bold">
                Username
              </label>
              <input
                name="username"
                id="username"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Change your username"
                className={
                  user.isSuccess
                    ? 'rounded-sm border-2 border-green-400 px-2 py-1 text-sm'
                    : invalidNewUsername
                    ? 'rounded-sm border-2 border-red-400 px-2 py-1 text-sm text-red-400 focus:outline-red-400'
                    : 'rounded-sm border px-2 py-1 text-sm'
                }
              />
              <button
                type="submit"
                className={
                  user.isSuccess
                    ? 'edit-profile-base-submit-button bg-green-400'
                    : invalidNewUsername
                    ? 'edit-profile-base-submit-button bg-red-400'
                    : 'edit-profile-base-submit-button bg-blue-400'
                }
                disabled={invalidNewUsername}
              >
                {user.isLoading ? (
                  <SpinnerGap size={24} className="animate-spin" />
                ) : user.isSuccess ? (
                  <CheckCircle size={24} />
                ) : invalidNewUsername ? (
                  <X size={22} />
                ) : (
                  'Submit'
                )}
              </button>
            </div>

            {user.isError && (
              <p className="text-red-400">{user.error.message}</p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default Edit

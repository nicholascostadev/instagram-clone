import { useSession } from 'next-auth/react'
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
        onError: (e) => console.log(e),
        onSuccess: (s) => setLastUsername(String(s.username)),
        onSettled: () => utils.invalidateQueries('user.getUserInfo'),
      },
    )
  }

  const invalidNewUsername = user.isError || input === lastUsername

  return (
    <>
      <Header />
      <div className="w-full h-[calc(100vh-120px)] flex justify-center items-center">
        <div className="border bg-white rounded-md w-[60rem] h-[30rem]">
          <form
            onSubmit={handleUsernameChange}
            className="flex flex-col items-center p-8"
          >
            <div className="flex justify-center items-center">
              <label htmlFor="username" className="font-bold mr-8">
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
                    ? 'border-2 border-green-400 rounded-sm px-2 py-1 text-sm'
                    : invalidNewUsername
                    ? 'border-2 border-red-400 focus:outline-red-400 rounded-sm px-2 py-1 text-sm text-red-400'
                    : 'border rounded-sm px-2 py-1 text-sm'
                }
              />
              <button
                type="submit"
                className={
                  user.isSuccess
                    ? 'bg-green-400 edit-profile-base-submit-button'
                    : invalidNewUsername
                    ? 'bg-red-400 edit-profile-base-submit-button'
                    : 'bg-blue-400 edit-profile-base-submit-button'
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

import { useSession } from 'next-auth/react'
import { createContext, ReactNode } from 'react'
import { trpc } from '../utils/trpc'

interface UsernameContextProps {
  username: string
}

export const UsernameContext = createContext<UsernameContextProps>(
  {} as UsernameContextProps,
)

export const UsernameContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const { data: userInfo } = useSession()
  const { data } = trpc.useQuery([
    'user.getUserInfo',
    { id: userInfo?.user?.id },
  ])

  const username = String(data?.username)

  return (
    <UsernameContext.Provider value={{ username }}>
      {children}
    </UsernameContext.Provider>
  )
}

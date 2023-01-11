import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

interface ProfilePostModalStateProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfilePostModalStateContext =
  createContext<ProfilePostModalStateProps>({} as ProfilePostModalStateProps)

export const ProfilePostModalStateContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <ProfilePostModalStateContext.Provider
      value={{ isModalOpen, setIsModalOpen }}
    >
      {children}
    </ProfilePostModalStateContext.Provider>
  )
}

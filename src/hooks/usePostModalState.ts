import { useContext } from 'react'
import { ProfilePostModalStateContext } from '../contexts/profilePostModalStateContext'
export const usePostModalState = () => useContext(ProfilePostModalStateContext)

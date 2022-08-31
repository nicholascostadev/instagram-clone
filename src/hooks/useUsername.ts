import { UsernameContext } from './../contexts/usernameContext'
import { useContext } from 'react'

export const useUsername = () => useContext(UsernameContext)

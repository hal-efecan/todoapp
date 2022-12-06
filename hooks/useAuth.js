import React from 'react'
import { AuthContext } from '../context/authContext'

export function useAuthContext() {
  const useAuth = React.useContext(AuthContext)
  const { login, signUp, logout, user } = useAuth

  return {
    login,
    signUp,
    logout,
    user,
  }
}

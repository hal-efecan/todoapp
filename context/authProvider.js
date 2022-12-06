import React, { useContext } from 'react'
import { AuthContext } from './authContext'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState({
    uid: '',
    email: '',
  })
  const [loading, setloading] = React.useState(true)

  const useAuth = useContext(AuthContext)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      } else {
        setUser({
          uid: '',
          email: '',
        })
      }
      setloading(false)
      console.log(user)
    })

    return () => unsubscribe()
  }, [])

  // Functions
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser({
      uid: '',
      email: '',
    })
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, signUp, login, logout, useAuth }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

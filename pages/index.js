import React from 'react'
import NavBar from '../components/NavBar'
import { SignIn } from '../components/SignIn'
import { SignUp } from '../components/SignUp'
import { List } from '../components/List'

import { useAuthContext } from '../hooks/useAuth'

export default function Home() {
  const [login, setLogin] = React.useState({
    email: '',
    password: '',
  })

  const [signup, setSignup] = React.useState({
    email: '',
    password: '',
  })

  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  const handleSignupOpen = () => setOpen1(true)
  const handleSignupClose = () => setOpen1(false)

  const handleLoginOpen = () => setOpen2(true)
  const handleLoginClose = () => setOpen2(false)

  const { signUp, login: lgIn, logout, user } = useAuthContext()

  async function handleSignup() {
    try {
      const { email, password } = signup
      await signUp(email, password)
      setOpen1(false)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function handleLogin() {
    try {
      const { email, password } = login
      await lgIn(email, password)
      setOpen2(false)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function handleLogout() {
    try {
      await logout()
      setLogin({
        email: '',
        password: '',
      })
      setSignup({
        email: '',
        password: '',
      })
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <div>
      <NavBar
        handleSignupOpen={handleSignupOpen}
        handleLoginOpen={handleLoginOpen}
        user={user}
        handleLogout={handleLogout}
      />

      <SignUp
        signup={signup}
        setSignup={setSignup}
        handleSignup={handleSignup}
        handleSignupClose={handleSignupClose}
        open1={open1}
      />

      <SignIn
        login={login}
        setLogin={setLogin}
        handleLogin={handleLogin}
        handleLoginClose={handleLoginClose}
        open2={open2}
      />

      {user.email && <List />}
    </div>
  )
}

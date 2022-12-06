import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NavBar({
  handleSignupOpen,
  handleLoginOpen,
  user,
  handleLogout,
}) {
  React.useEffect(() => {
    console.log('user => Nav ', user)
  }, [user])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {user.email && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}

          {!user.email && (
            <>
              <Button color="inherit" onClick={(e) => handleSignupOpen(e)}>
                Sign Up
              </Button>

              <Button color="inherit" onClick={(e) => handleLoginOpen(e)}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

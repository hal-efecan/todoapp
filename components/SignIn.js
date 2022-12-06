import React from 'react'

// MUI
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export function SignIn({
  login,
  setLogin,
  handleLogin,
  handleLoginClose,
  open2,
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open2}
      onClose={handleLoginClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open2}>
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12} sx={{ p: 1, ml: 0.5 }}>
              <Typography variant="h5" component="h2">
                Sign In
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 1 }}>
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                type="email"
                autoComplete="off"
                size="small"
                value={login.email}
                onChange={(e) => {
                  setLogin({
                    ...login,
                    email: e.target.value,
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: 1 }}>
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                autoComplete="off"
                size="small"
                value={login.password}
                onChange={(e) => {
                  setLogin({
                    ...login,
                    password: e.target.value,
                  })
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ p: 1, mt: 1 }}>
              <Button variant="contained" onClick={handleLogin} size="small">
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  )
}

import React from 'react'

import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export function List() {
  const [todo, setTodo] = React.useState({ name: '' })
  const [list, setList] = React.useState([])

  async function handleTodo() {
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        name: todo.name,
        createdAt: new Date(),
      })
      console.log('Document written with ID: ', docRef.id)
      fetchDoc()
      setTodo({ name: '' })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  async function fetchDoc() {
    const d = []
    try {
      const docRef = collection(db, 'todos')
      const q = query(docRef, orderBy('createdAt'))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        d.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setList([...d])
    } catch (err) {
      console.log('err', err)
    }
  }

  async function handleUpdate(i) {
    const taskDocRef = doc(db, 'todos', i)
    try {
      const found = list.find((todo) => todo.id === i)
      await updateDoc(taskDocRef, found)
      fetchDoc()
    } catch (err) {
      console.log('err', err)
    }
  }

  async function handleDelete(i) {
    const taskDocRef = doc(db, 'todos', i)
    try {
      await deleteDoc(taskDocRef)
      fetchDoc()
    } catch (err) {
      console.log('err', err)
    }
  }

  React.useEffect(() => {
    console.log('todo', todo)
  }, [todo])

  React.useEffect(() => {
    if (list.length === 0) {
      console.log('list', list)
      fetchDoc()
    }
  }, [])

  return (
    <Container>
      <Grid container sx={{ mt: 3 }}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <TextField
            sx={{ minWidth: 400, ml: 5 }}
            id="standard-basic"
            label="To do"
            variant="standard"
            autoComplete="off"
            value={todo.name}
            onChange={(e) => setTodo({ name: e.target.value })}
          />
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
            onClick={handleTodo}
          >
            Add
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            ml: 3,
          }}
        >
          {list.length === 0 ? (
            'No Todos'
          ) : (
            <>
              {list.map((item) => {
                return (
                  <div key={item.id} style={{ marginBottom: '20px' }}>
                    <TextField
                      id="standard-basic"
                      variant="outlined"
                      value={item.name}
                      disabled={false}
                      sx={{ width: 350 }}
                      onChange={(e) => {
                        const found = list.find((todo) => todo.id === item.id)
                        console.log('found', found)
                        setList(
                          list.map((todo) => {
                            if (todo.id === found.id) {
                              return {
                                ...todo,
                                name: e.target.value,
                              }
                            } else {
                              return todo
                            }
                          })
                        )
                      }}
                    />
                    <IconButton
                      aria-label="edit"
                      sx={{ ml: 1, mt: 1 }}
                      onClick={(e) => handleUpdate(item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ ml: 1, mt: 1 }}
                      onClick={(e) => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )
              })}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

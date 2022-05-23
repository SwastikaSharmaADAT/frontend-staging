import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import { setUserData } from '../profile/myProfileSlice'

const initialState = {
  socketObj: null,
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocketObj: (state, action) => {
      state.socketObj = action.payload
    },
  },
})

export const { setSocketObj } = socketSlice.actions

export const connectSocket = () => async (dispatch) => {
  const authToken = localStorage.getItem('auth_token')
  const token = authToken.slice(4)

  const socket = io.connect(`${process.env.NEXT_PUBLIC_REACT_APP_SOCKET_ENDPOINT}`, {
    query: `token=${token}`,
  })

  if (socket !== null) {
    dispatch(setSocketObj(socket))
  }

  socket.on('connect_error', () => {
    setTimeout(() => {
      socket.connect()
    }, 1000)
  })
}

export const disconnectSocket = () => async (dispatch, getState) => {
  const oldState = getState()
  const socketObj = oldState.root.socket.socketObj
  const userDataState = oldState.root.myProfile.userData

  if (socketObj !== null) {
    socketObj.disconnect()
    dispatch(setSocketObj(null))

    const newObj = { ...userDataState, isActive: 'false' }
    dispatch(setUserData(newObj))
  }
}

export default socketSlice.reducer

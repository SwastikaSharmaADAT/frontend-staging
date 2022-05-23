import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'

/**
 * Thunk to get notifications listing
 */
export const getNotifications = createAsyncThunk('notifications/getNotifications', async (params) => {
  const {data,t}=params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}notifications`, {
      headers: {
        Authorization: token,
      },
      params: data,
    })
    if (response.status === 200 && response.data.success) {
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to get notifications listing
 */
export const getUnreadNotificationsCount = createAsyncThunk(
  'notifications/getUnreadNotificationsCount',
  async (params) => {
    const {data,t}=params
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}notifications/count/unread`, {
        headers: {
          Authorization: token,
        },
        params: data,
      })
      if (response.status === 200 && response.data.success) {
        return response.data
      }
    } catch (err) {
      const { status, data: errorData } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
      }
    }
  }
)

/**
 * Thunk to remove notification
 */
export const removeNotification = createAsyncThunk('notifications/removeNotification', async (params) => {
  const {data,t}=params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}notifications/${data._id}/remove`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      //notifySuccess(t(`successResponses:notification.notificationRemoved`))
      const newResponse = { ...response, _id: data._id }
      return newResponse
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**initial state for notification slice */
const initialState = {
  notifications: [],
  metadata: [],
  unreadCount: 0,
  loading: false,
  notificationsLoader: true,
  webNoti: false,
}
/**Notifications slice */
export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    incrementCount: (state, action) => {
      state.unreadCount = state.unreadCount + 1
    },
    setWebNoti: (state, action) => {
      state.webNoti = action.payload
    },

    setUnreadCount: (state, action) => {
      state.unreadCount = 0
    },
    clearNotifications: (state, action) => {
      state.notifications = []
      state.metadata = []
      state.unreadCount = 0
      state.loading = false
      state.notificationsLoader = true
    },
  },
  extraReducers: {
    [getNotifications.pending]: (state, action) => {
      state.loading = true
    },
    [getNotifications.fulfilled]: (state, action) => {
      if (action.payload) {
        if (action.payload.data.metadata.total === 0) {
          state.notifications = []
          state.metadata = []
        }
        if (action.payload.data.metadata.offset === '0') {
          state.notifications = action.payload.data.notifications
          state.metadata = action.payload.data.metadata
        } else {
          state.notifications = state.notifications.concat(action.payload.data.notifications)
          state.metadata = action.payload.data.metadata
        }
        state.loading = false
        state.notificationsLoader = false
      }
    },
    [removeNotification.fulfilled]: (state, action) => {
      if (action.payload) {
        state.notifications = state.notifications.filter((notif) => notif._id !== action.payload._id)
        state.metadata.total = state.metadata.total - 1
      }
    },
    [getUnreadNotificationsCount.fulfilled]: (state, action) => {
      if (action.payload) {
        state.unreadCount = action.payload.data.unreadCount
      }
    },
  },
})
export const { incrementCount, setUnreadCount, clearNotifications, setWebNoti } = notificationSlice.actions

export default notificationSlice.reducer

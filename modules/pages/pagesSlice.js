import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  setUsernameValidFormError,
  setEmailValidFormError,
  toggleLoading,
  setLoggedInUserData,
} from '../auth/authSlice'
import { notifySuccess, setAuthUserDetails } from '../profile/myProfileSlice'
import { connectSocket, disconnectSocket } from '../socket/socketSlice'
import { userPages } from '../newsFeed/newsFeedSlice'
import Router from 'next/router'
import { getUnreadNotificationsCount, clearNotifications } from '../notifications/notificationSlice'
import { clearMediaTags } from '../../modules/mediaLibrary/mediaLibrarySlice'
import { setLegacyWelcomeMsgPopup } from '../../modules/auth/authSlice'

const initialState = {
  addPageError: null,
  addPageFormError: null,
  addPageSuccess: false,
}

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setAddPageError: (state, action) => {
      state.addPageError = action.payload
    },
    setAddPageFormError: (state, action) => {
      state.addPageFormError = action.payload
    },
    setAddPageSuccess: (state, action) => {
      state.addPageSuccess = action.payload
    },
  },
})

export const { setAddPageError, setAddPageFormError, setAddPageSuccess } = pagesSlice.actions

/**
 * Add new page
 * @param {object} info Object containing page info
 */
export const addNewPage = (info, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}add-new-page/`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:pages.pageCreated`))
      dispatch(setUsernameValidFormError(null))
      dispatch(setEmailValidFormError(null))
      dispatch(setAddPageFormError(null))
      dispatch(setAddPageError(null))
      dispatch(setAddPageSuccess(true))
      dispatch(toggleLoading(false))
      dispatch(switchAnAccount(response.data.data.pageUserId, t))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setAddPageSuccess(false))
      dispatch(setAddPageError(err.response.data.messageCode))
    } else if (err.response.status === 422) {
      dispatch(setAddPageSuccess(false))
      dispatch(setAddPageFormError(err.response.data.errors))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Switch an account
 * @param {string} pageUserId Page account id if switching to page account and empty if switching to personal account
 */
export const switchAnAccount = (pageUserId, t) => async (dispatch, getState) => {
  try {
    dispatch(disconnectSocket())
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}switch-an-account/`,
      { pageUserId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(clearNotifications())
      const authUserInfo = getState().root.myProfile.authUserDetails
      const responseData = response.data.data

      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)
      const updatedUserInfoObj = {
        ...parsedUserInfo,
        username: responseData.username,
        accountType: responseData.accountType,
      }
      localStorage.setItem('user_info', JSON.stringify(updatedUserInfoObj))

      localStorage.setItem('auth_token', responseData.token)
      dispatch(
        setAuthUserDetails({
          ...authUserInfo,
          profilePicUrl: responseData.profilePicUrl,
          dateUpdated: responseData.dateUpdated,
        })
      )
      dispatch(clearMediaTags())
      dispatch(getUnreadNotificationsCount({ t }))
      dispatch(
        setLoggedInUserData({
          username: responseData.username,
        })
      )
      if (responseData.username) dispatch(userPages(responseData.username, 'forLoggedInUser'))
      dispatch(toggleLoading(false))
      Router.push(`/user/${responseData.username}`)
      if (responseData.legacyLogin) {
        dispatch(setLegacyWelcomeMsgPopup(true))
      }

      dispatch(connectSocket())
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

export default pagesSlice.reducer

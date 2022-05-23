import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { toggleLoading } from '../auth/authSlice'

/**
 * Thunk to delete user data
 */
export const deleteUserData = createAsyncThunk('myAccount/deleteUserData', async (data) => {
  const { t } = data
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}delete-data`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(
        data.type === 'userDelete'
          ? t(`successResponses:myAccount.userDelete`)
          : data.type === 'photos'
          ? t(`successResponses:myAccount.photosDelete`)
          : t(`successResponses:myAccount.userDataDelete`)
      )
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
 * Thunk to change Password of account
 */
export const changePassword = createAsyncThunk('myAccount/changePassword', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}change-password`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:myAccount.passwordUpdated`))
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get notifications settings
 */
export const getNotificationSettings = createAsyncThunk('myAccount/getNotificationSettings', async (t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}get-notification-settings`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to update notifications settings
 */
export const updateNotificationSettings = createAsyncThunk('myAccount/updateNotificationSettings', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}update-notification-settings`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:myAccount.notificationUpdated`))
      return { ...response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to disconnect social account
 */
export const disconnectSocialAccount = createAsyncThunk('myAccount/disconnectSocialAccount', async ({ data, t }) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}disconnect-social-account`,
      { type: data },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:myAccount.accountDisconnected`))
      return { ...response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
const initialState = {
  notificationSettings: {},
  privacySettings: {},
  webNotificationSettings: {},
}

export const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {
    setPrivacySettings: (state, action) => {
      state.privacySettings = action.payload
    },
    setWebNotificationSettings: (state, action) => {
      state.webNotificationSettings = action.payload
    },
  },
  extraReducers: {
    [getNotificationSettings.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data) {
        /**if we get an empty response, push static data with all true fields in state */
        if (isEmptyObj(action.payload.data.notificationSettings))
          state.notificationSettings = {
            newFollowers: true,
            newConnectionAdded: true,
            newConnectionRequest: true,
            groupPost: true,
            groupComments: true,
            privateMessage: true,
            unreadMessage: true,
          }
        else state.notificationSettings = action.payload.data.notificationSettings
      }
    },
    [updateNotificationSettings.fulfilled]: (state, action) => {
      /**update settings in state aswell */
      if (action.payload && action.payload.data) {
        state.notificationSettings = action.payload.reqData
      }
    },
  },
})

export const { setPrivacySettings, setWebNotificationSettings } = myAccountSlice.actions

export default myAccountSlice.reducer

/**
 * Get user privacy settings
 */
export const getUserSettings = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}get-user-settings`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      console.log(responseData)
      if (isEmptyObj(responseData.userPrivacySettings)) {
        const obj = {
          showProfile: 'everyone',
          activityWall: 'everyone',
          privateMessage: 'everyone',
          hideDirectory: false,
          showOnlineStatus: true,
        }
        dispatch(setPrivacySettings(obj))
      } else {
        dispatch(setPrivacySettings(responseData.userPrivacySettings))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Save user privacy settings
 */
export const saveUserSettings = (privacyData, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}save-user-settings`,
      privacyData,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:myAccount.privacySettingsUpdated`))
      dispatch(setPrivacySettings(privacyData))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get web notification settings
 */
export const getWebNotificationSettings = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}get-web-notifications`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      if (
        isEmptyObj(responseData.notificationDetails) ||
        isEmptyObj(responseData.notificationDetails.webNotifications)
      ) {
        const obj = {
          acceptConnection: true,
          groupInvitation: true,
          groupRequestApproved: true,
          groupRole: true,
          likeArtwork: true,
          newComments: true,
          newConnection: true,
          newFollower: true,
          newGroupRequest: true,
          newLike: true,
          newMention: true,
          newReplies: true,
          privateMessage: true,
          viewProfile: true,
        }
        dispatch(setWebNotificationSettings(obj))
      } else {
        dispatch(setWebNotificationSettings(responseData.notificationDetails.webNotifications))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Save web notification settings
 */
export const updateWebNotificationSettings = (updatedData, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}update-web-settings`,
      updatedData,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:myAccount.webNotificationsSettingsUpdated`))
      dispatch(setWebNotificationSettings(updatedData))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Download user data file
 */
export const downloadUserData = (password, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}download-user-data`,
      { password },
      {
        responseType: 'arraybuffer',
        headers: {
          Authorization: token,
          'Content-Disposition': 'attachment; filename=template.xlsx',
          'Content-Length': '100000',
        },
      }
    )
    if (response && response.status === 200) {
      const userInfo = localStorage.getItem('user_info')
      const loggedInUsername = userInfo && JSON.parse(userInfo).username

      const blob = new Blob([response.data], {
        type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
      })
      saveAs(blob, `Artmo_Data_${loggedInUsername}_${new Date().toISOString()}.xlsx`)

      notifySuccess(t(`successResponses:myAccount.dataDownload`))
      dispatch(toggleLoading(false))
      return 'success'
    }
  } catch (err) {
    const { status } = err.response
    const decodedString = String.fromCharCode.apply(null, new Uint8Array(err.response.data))
    const errorData = decodedString && JSON.parse(decodedString)

    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Download user photos
 */
export const downloadUserPhotos = (t) => async (dispatch) => {
  dispatch(toggleLoading(true))
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  // Request to get images Data
  const response = await dispatch(getPhotosData(t))

  if (response && response.data && !isEmptyObj(response.data)) {
    let imagesDataArr = [...response.data.imagesData]
    let allImagesDownloaded = false

    // Initialise zip
    const zip = new JSZip()

    if (imagesDataArr.length > 0) {
      for (let i = 0; i < imagesDataArr.length; i++) {
        // Request to get buffer of downloaded image from server for particular URL
        const newImageBuffer = await dispatch(downloadPhoto(imagesDataArr[i].url, t))
        if (!newImageBuffer) {
          return
        }

        // Creating blob of image from buffer
        const blob = new Blob([newImageBuffer], {
          type: 'image/jpeg, image/png, image/jpg',
        })

        // Adding blob image file to zip instance
        zip.file(imagesDataArr[i].name, blob)
      }
      allImagesDownloaded = true
    }

    if (allImagesDownloaded) {
      // Creation of zip
      zip.generateAsync({ type: 'blob' }).then(function (zippedFolder) {
        // Download zip
        saveAs(zippedFolder, `Artmo_Photos_${loggedInUsername}_${new Date().toISOString()}.zip`)
      })
      notifySuccess(t(`successResponses:myAccount.picsDownload`))
    }

    dispatch(toggleLoading(false))
  }
}

/** Method to call get pics data API */
const getPhotosData = (t) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}download-user-pics`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response && response.status === 200) {
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/** Method to call download pic API */
const downloadPhoto = (url, t) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}download-pic`,
      { imageUrl: url },
      {
        responseType: 'arraybuffer',
        headers: {
          Authorization: token,
        },
      }
    )
    if (response && response.status === 200) {
      return response.data
    }
  } catch (err) {
    const { status } = err.response
    const decodedString = String.fromCharCode.apply(null, new Uint8Array(err.response.data))
    const errorData = decodedString && JSON.parse(decodedString)

    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

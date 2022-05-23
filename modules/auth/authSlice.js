import axios from 'axios'
import { shiftCartFromLocal } from '../cart/cartSlice.js'
import { connectSocket } from '../socket/socketSlice'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { checkLegacyUserTestEmail } from '../../utilities/legacyUsersUtils'

/**
 * convert user to member
 */
export const convertToMember = createAsyncThunk('auth/convertToMember', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT}auth/convert-to-member`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(`Your account is now converted to Member's account. Please login.`)
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

const initialState = {
  value: 0,
  error: undefined,
  loading: false,
  openLoginPopup: false,
  openSignupPopup: false,
  openSnoozePopup: false,
  openConfirmEmailPopup: false,
  openResetEmailPopup: false,
  openForgetPassPopup: false,
  openSocialSignupPopup: false,
  openLegacyWelcomeMsgPopup: false,
  loginError: null,
  loginFormError: null,
  loggedIn: false,
  signupError: null,
  signupFormError: null,
  signupSuccess: null,
  usernameValid: true,
  usernameValidFormError: null,
  usernameValidError: null,
  emailValid: true,
  emailValidFormError: null,
  emailValidError: null,
  confirmSignup: false,
  resetPass: false,
  confirmSignupError: null,
  resetPassError: null,
  forgetPassError: null,
  socialUserError: null,
  socialSignupError: null,
  openLoginConfirmPopup: false,
  facebookData: {},
  linkedinData: {},
  currentSocialType: null,
  socialUserSignedUp: true,
  showNotification: false,
  notificationType: null,
  notificationMsg: null,
  loggedInUserData: {},
  redirectToProfile: { render: false, next: '' },
  showLoggedOutNoti: false,
  startSnoozeTimer: true,
  i18n: {},
  openPageLinkPopup: false,
  legacyPageUserId: '',
  pageBubble: false,
  credentials: null,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value = state.value + 1
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload
    },
    setUsernameValid: (state, action) => {
      state.usernameValid = action.payload
    },
    setUsernameValidFormError: (state, action) => {
      state.usernameValidFormError = action.payload
    },
    setUsernameValidError: (state, action) => {
      state.usernameValidError = action.payload
    },
    setEmailValid: (state, action) => {
      state.emailValid = action.payload
    },
    setEmailValidFormError: (state, action) => {
      state.emailValidFormError = action.payload
    },
    setEmailValidError: (state, action) => {
      state.emailValidError = action.payload
    },
    setSignupPopup: (state, action) => {
      state.openSignupPopup = action.payload
    },
    setLegacyWelcomeMsgPopup: (state, action) => {
      state.openLegacyWelcomeMsgPopup = action.payload
    },
    setOpenSnoozePopup: (state, action) => {
      state.openSnoozePopup = action.payload
    },
    setConfirmEmailPopup: (state, action) => {
      state.openConfirmEmailPopup = action.payload
    },
    setResetEmailPopup: (state, action) => {
      state.openResetEmailPopup = action.payload
    },
    setSignupSuccess: (state, action) => {
      state.signupSuccess = action.payload
    },
    setSignupFormError: (state, action) => {
      state.signupFormError = action.payload
    },
    setSignupError: (state, action) => {
      state.signupError = action.payload
    },
    setLoginPopup: (state, action) => {
      state.openLoginPopup = action.payload
    },
    setPageLinkPopup: (state, action) => {
      state.openPageLinkPopup = action.payload
    },
    setCredentials: (state, action) => {
      state.credentials = action.payload
    },
    setPageLinkId: (state, action) => {
      state.legacyPageUserId = action.payload
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload
    },
    setLoginFormError: (state, action) => {
      state.loginFormError = action.payload
    },
    setForgetPassPopup: (state, action) => {
      state.openForgetPassPopup = action.payload
    },
    setSocialSignupPopup: (state, action) => {
      state.openSocialSignupPopup = action.payload
    },
    setLoginConfirmPopup: (state, action) => {
      state.openLoginConfirmPopup = action.payload
    },
    closeAllModals: (state) => {
      state.openConfirmEmailPopup = false
      state.openResetEmailPopup = false
      state.openForgetPassPopup = false
      state.openLoginPopup = false
      state.openSignupPopup = false
      state.openSocialSignupPopup = false
      state.openSnoozePopup = false
      state.openPageLinkPopup = false
      state.openLoginConfirmPopup = false
    },
    setConfirmSignup: (state, action) => {
      state.confirmSignup = action.payload
    },
    setPageInfoBubble: (state, action) => {
      state.pageBubble = action.payload
    },
    setResetPass: (state, action) => {
      state.resetPass = action.payload
    },
    setFacebookData: (state, action) => {
      state.facebookData = action.payload
    },
    setLinkedinData: (state, action) => {
      state.linkedinData = action.payload
    },
    setConfirmSignupError: (state, action) => {
      state.confirmSignupError = action.payload
    },
    setResetPassError: (state, action) => {
      state.resetPassError = action.payload
    },
    setForgetPassError: (state, action) => {
      state.forgetPassError = action.payload
    },
    setSocialSignupError: (state, action) => {
      state.socialSignupError = action.payload
    },
    setSocialUserError: (state, action) => {
      state.socialUserError = action.payload
    },
    setCurrentSocialType: (state, action) => {
      state.currentSocialType = action.payload
    },
    setSocialUserSignedUp: (state, action) => {
      state.socialUserSignedUp = action.payload
    },
    setShowNotification: (state, action) => {
      state.showNotification = action.payload
    },
    setNotificationType: (state, action) => {
      state.notificationType = action.payload
    },
    setNotificationMsg: (state, action) => {
      state.notificationMsg = action.payload
    },
    setLoggedInUserData: (state, action) => {
      state.loggedInUserData = action.payload
    },
    setRedirectToProfile: (state, action) => {
      state.redirectToProfile.render = action.payload
    },
    setNextRoute: (state, action) => {
      state.redirectToProfile.next = action.payload
    },
    reset: () => {
      //
    },
    setShowLoggedOutNoti: (state, action) => {
      state.showLoggedOutNoti = action.payload
    },
    setStartSnoozeTimer: (state, action) => {
      state.startSnoozeTimer = action.payload
    },
    seti18n: (state, action) => {
      state.i18n = action.payload
    },
  },
})

export const {
  increment,
  toggleLoading,
  setUsernameValid,
  setUsernameValidFormError,
  setUsernameValidError,
  setSignupPopup,
  setNextRoute,
  setConfirmEmailPopup,
  setSignupSuccess,
  setSignupError,
  setSignupFormError,
  setLoginPopup,
  setLoggedIn,
  setLoginError,
  setLoginFormError,
  setForgetPassPopup,
  setSocialSignupPopup,
  closeAllModals,
  setEmailValid,
  setEmailValidFormError,
  setEmailValidError,
  setResetEmailPopup,
  setConfirmSignup,
  setResetPass,
  setFacebookData,
  setLinkedinData,
  setConfirmSignupError,
  setResetPassError,
  setForgetPassError,
  setSocialUserError,
  setSocialSignupError,
  setCurrentSocialType,
  setSocialUserSignedUp,
  setShowNotification,
  setNotificationType,
  setNotificationMsg,
  setLoggedInUserData,
  setRedirectToProfile,
  reset,
  setShowLoggedOutNoti,
  setOpenSnoozePopup,
  setStartSnoozeTimer,
  seti18n,
  setPageLinkPopup,
  setCredentials,
  setPageLinkId,
  setPageInfoBubble,
  setLegacyWelcomeMsgPopup,
  setLoginConfirmPopup
} = authSlice.actions

export const checkUsername = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const data = { username }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/username-validate',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUsernameValidFormError(null))
      dispatch(setUsernameValidError(null))
      dispatch(setUsernameValid(true))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setUsernameValidError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    } else if (err.response.status === 422) {
      dispatch(setUsernameValidFormError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const checkEmail = (email) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const data = { email }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/email-validate',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setEmailValidFormError(null))
      dispatch(setEmailValidError(null))
      dispatch(setEmailValid(true))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setEmailValidError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    } else if (err.response.status === 422) {
      dispatch(setEmailValidFormError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const signup = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/register',
      data
    )
    if (response.status === 200 && response.data.success) {
      if (response.config && response.config.data && JSON.parse(response.config.data)) {
        localStorage.setItem('registered_user_type', JSON.parse(response.config.data).roleType)
      }
      dispatch(setUsernameValidFormError(null))
      dispatch(setEmailValidFormError(null))
      dispatch(setSignupFormError(null))
      dispatch(setSignupError(null))
      dispatch(setSignupSuccess(true))
      dispatch(setSignupPopup(false))
      dispatch(setStartSnoozeTimer(false))
      dispatch(setOpenSnoozePopup(false))
      dispatch(setConfirmEmailPopup(true))
      dispatch(setLoginConfirmPopup(false))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setSignupSuccess(false))
      dispatch(setSignupError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    } else if (err.response.status === 422) {
      dispatch(setSignupSuccess(false))
      dispatch(setSignupFormError(err.response.data.errors))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/login', data)
    if (response.status === 200 && response.data.success) {
      if (response.data.messageCode === 'legacyPageUser') {
        dispatch(toggleLoading(false))
        return response.data
      }
      dispatch(setLoginFormError(null))
      dispatch(setLoginError(null))
      dispatch(setLoggedIn(true))
      localStorage.setItem('auth_token', response.data.data.token)
      const responseUserData = response.data.data.user
      const userInfoObj = {
        username: responseUserData.username,
        personalUsername: responseUserData.username,
        personalFirstName: responseUserData.firstName ? responseUserData.firstName : '',
        personalLastName: responseUserData.lastName ? responseUserData.lastName : '',
        personalUuid: responseUserData.uuid,
        accountType: 'personal',
        activeSubscription: response.data.data.activeSubscription ? true : false,
      }
      if (response.data.data.activeSubscription)
        localStorage.setItem('activeSubscription', JSON.stringify(response.data.data.activeSubscription))
      localStorage.setItem('user_info', JSON.stringify(userInfoObj))
      dispatch(shiftCartFromLocal(data.t))
      dispatch(connectSocket())
      localStorage.setItem('isUserActive', true)
      dispatch(
        setLoggedInUserData({
          username: response.data.data.user.username,
        })
      )
      /**Check if required fields are filled or else redirect to profile */
      const { firstName, lastName, country, city, dob, email, isOldArtmoUser } = response.data.data.user
      if (firstName === '' || lastName === '' || country.value === '' || city.value === '') {
        dispatch(setRedirectToProfile(true))
      } 
      else if (isEmptyObj(dob) || !dob.value) {
        dispatch(setRedirectToProfile(true))
      } else if (checkLegacyUserTestEmail({ email, isOldArtmoUser })) {
        dispatch(setRedirectToProfile(true))
      } else {
        dispatch(setNextRoute('landing'))
        dispatch(setRedirectToProfile(true))
      }
      dispatch(setLoginPopup(false))
      dispatch(setSignupPopup(false))
      dispatch(toggleLoading(false))
      if (responseUserData.legacyLogin) {
        dispatch(setLegacyWelcomeMsgPopup(true))
      }
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setLoggedIn(false))
      dispatch(setLoginError(err.response.data.messageCode))
      if(err.response.data.messageCode === 'confirmLoginEmail') {
        dispatch(setLoginPopup(false))
        dispatch(setConfirmEmailPopup(true)) 
        dispatch(setLoginConfirmPopup(true))
      }
      
      dispatch(toggleLoading(false))
    } else if (err.response.status === 422) {
      dispatch(setLoggedIn(false))
      dispatch(setLoginFormError(err.response.data.errors))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/forgot-password',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setForgetPassError(null))
      dispatch(setForgetPassPopup(false))
      dispatch(setResetEmailPopup(true))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setForgetPassError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const confirmSignup = (token) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const data = { token }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/verify-sign-up',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setConfirmSignupError(null))
      dispatch(setLoggedIn(true))
      localStorage.setItem('auth_token', response.data.data.token)
      const responseUserData = response.data.data.user
      const userInfoObj = {
        username: responseUserData.username,
        personalUsername: responseUserData.username,
        personalFirstName: '',
        personalLastName: '',
        personalUuid: responseUserData.uuid,
        accountType: 'personal',
        activeSubscription: false,
      }
      localStorage.setItem('user_info', JSON.stringify(userInfoObj))
      dispatch(connectSocket())
      localStorage.setItem('isUserActive', true)
      dispatch(
        setLoggedInUserData({
          username: response.data.data.user.username,
        })
      )
      dispatch(setStartSnoozeTimer(false))
      dispatch(setOpenSnoozePopup(false))
      dispatch(setRedirectToProfile(true))
      dispatch(setConfirmSignup(true))
      dispatch(setPageInfoBubble(true))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setConfirmSignupError(err.response.data.messageCode))
      dispatch(setConfirmSignup(false))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const resetPassword = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/reset-password',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setResetPassError(null))
      dispatch(setResetPass(true))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setResetPassError(err.response.data.messageCode))
      dispatch(setResetPass(false))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}
export const verifyToken = (param) => async (dispatch) => {
  try {
    const {t, data} = param
    dispatch(toggleLoading(true))
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/reset-token-validate',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(toggleLoading(false))
      return true
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      const { data: errorData } = err.response
      dispatch(toggleLoading(false))
      return false
    }
    dispatch(toggleLoading(false))
  }
}

export const socialUserValidate = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setCurrentSocialType(null))
    dispatch(setSocialUserSignedUp(true))
    if (data.socialType === 'facebook') {
      dispatch(setFacebookData(data))
    } else if (data.socialType === 'linkedin') {
      dispatch(setLinkedinData(data))
    }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/social-user-validate',
      data
    )
    if (response.status === 200 && response.data.success && response.data.messageCode === 'legacyPageUser') {
      dispatch(toggleLoading(false))
      return response.data
    }
    if (response.status === 200 && response.data.success && response.data.data.isUserExist) {
      if (data.socialType === 'linkedIn') {
        const liEmail = response.data.data.email
        const liToken = response.data.data.liAccessToken
        data.email = liEmail
        data.token = liToken
        dispatch(setLinkedinData(data))
      }
      dispatch(setSocialUserSignedUp(true))
      dispatch(setSocialUserError(null))
      dispatch(setLoggedIn(true))
      dispatch(setStartSnoozeTimer(false))
      dispatch(setOpenSnoozePopup(false))
      localStorage.setItem('auth_token', response.data.data.token)
      const responseUserData = response.data.data.user
      const userInfoObj = {
        username: responseUserData.username,
        personalUsername: responseUserData.username,
        personalFirstName: responseUserData.firstName ? responseUserData.firstName : '',
        personalLastName: responseUserData.lastName ? responseUserData.lastName : '',
        personalUuid: responseUserData.uuid,
        accountType: 'personal',
        activeSubscription: response.data.data.activeSubscription ? true : false,
      }
      if (response.data.data.activeSubscription)
        localStorage.setItem('activeSubscription', JSON.stringify(response.data.data.activeSubscription))
      localStorage.setItem('user_info', JSON.stringify(userInfoObj))
      dispatch(connectSocket())
      localStorage.setItem('isUserActive', true)
      dispatch(
        setLoggedInUserData({
          username: response.data.data.user.username,
        })
      )
      dispatch(shiftCartFromLocal(data.t))
      /**Check if required fields are filled or else redirect to profile */
      const { firstName, lastName, country, city, dob, email, isOldArtmoUser } = response.data.data.user
      if (firstName === '' || lastName === '' || country.value === '' || city.value === '') {
        dispatch(setRedirectToProfile(true))
      }
       else if (isEmptyObj(dob) || !dob.value) {
        dispatch(setRedirectToProfile(true))
      } else if (checkLegacyUserTestEmail({ email, isOldArtmoUser })) {
        dispatch(setRedirectToProfile(true))
      } 
      else {
        dispatch(setNextRoute('landing'))
        dispatch(setRedirectToProfile(true))
      }
      dispatch(setLoginPopup(false))
      dispatch(setSignupPopup(false))
      dispatch(toggleLoading(false))
      if (responseUserData.legacyLogin) {
        dispatch(setLegacyWelcomeMsgPopup(true))
      }
    } else if (response.status === 200 && response.data.success && !response.data.data.isUserExist) {
      if (data.socialType === 'linkedIn') {
        const liEmail = response.data.data.email
        const liToken = response.data.data.liAccessToken
        data.email = liEmail
        data.token = liToken
        dispatch(setLinkedinData(data))
      }
      dispatch(setSocialUserSignedUp(false))
      dispatch(setCurrentSocialType(data.socialType))
      dispatch(setSocialUserError(null))
      dispatch(setLoginPopup(false))
      dispatch(setSignupPopup(false))
      dispatch(setUsernameValidFormError(null))
      dispatch(setSocialSignupError(null))
      dispatch(setSocialSignupPopup(true))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setSocialUserError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export const socialSignup = (data) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_AUTH_SERVICE_API_ENDPOINT + 'auth/social-sign-up',
      data
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setSocialUserSignedUp(true))
      dispatch(setUsernameValidFormError(null))
      dispatch(setSocialSignupError(null))
      dispatch(setLoggedIn(true))
      localStorage.setItem('auth_token', response.data.data.token)
      const responseUserData = response.data.data.user
      const userInfoObj = {
        username: responseUserData.username,
        personalUsername: responseUserData.username,
        personalFirstName: '',
        personalLastName: '',
        personalUuid: responseUserData.uuid,
        accountType: 'personal',
        activeSubscription: false,
      }
      localStorage.setItem('user_info', JSON.stringify(userInfoObj))
      dispatch(connectSocket())
      localStorage.setItem('isUserActive', true)
      dispatch(
        setLoggedInUserData({
          username: response.data.data.user.username,
        })
      )
      dispatch(setRedirectToProfile(true))
      dispatch(setSocialSignupPopup(false))
      dispatch(setStartSnoozeTimer(false))
      dispatch(setOpenSnoozePopup(false))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    if (err.response.status === 400 || err.response.status === 500) {
      dispatch(setSocialUserSignedUp(false))
      dispatch(setSocialSignupError(err.response.data.messageCode))
      dispatch(toggleLoading(false))
    }
    dispatch(toggleLoading(false))
  }
}

export default authSlice.reducer

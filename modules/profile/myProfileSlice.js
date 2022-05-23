import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Trans } from 'next-i18next'
import { setEmailValidFormError, toggleLoading } from '../auth/authSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import Router from 'next/router'
import { checkLegacyUserTestEmail } from '../../utilities/legacyUsersUtils'

const initialState = {
  isEditingHeader: false,
  isEditingAbout: false,
  isEditingBiography: false,
  isEditingContact: false,
  isEditingProfile: false,
  isEditingTechnique: false,
  isEditingExpertise: false,
  isEditingAwards: false,
  isEditingPublications: false,
  isEditingPastExhibitions: false,
  isEditingNews: false,
  isEditingFaculty: false,
  isEditingAboutMyBusiness: false,
  hasCoverPhoto: false,
  hasProfilePhoto: false,
  userData: {},
  isProfileLocked: false,
  loggedInUserBlocked: false,
  userUUID: null,
  profileMeasure: null,
  notices: null,
  emptyNoticesErr: false,
  followers: [],
  followersMetadata:0,
  following: [],
  followingMetadata:0,
  followLoader:true,
  connections: [],
  userActivities: null,
  userVideos: null,
  userLikedArtworks: null,
  userArtworks: null,
  userAlbums: null,
  basicInfoErr: null,
  userGroups: null,
  myConnections: {},
  connectionRequests: {},
  connectionRequestsSent: {},
  connectionsCount: {},
  authUserDetails: {},
  showErrToast: false,
  userMedia: [],
  usersList: [],
  usersToKeepForLang: 0,
  usersListCount: undefined,
  usersListLoader: true,
  enableUserSearch: false,
  checkUserType: { val: false, type: '' },
  reRenderLandingPage: false,
  connectionsLoader:true,
  referralUsers: [],
  referralCode: null
}

toast.configure({
  position: 'top-center',
  autoClose: 3000,
  limit: 1,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
})

export const notifyError = (message, timeout) =>
  toast.error(message, {
    className: 'react-toast-error',
    autoClose: timeout ? timeout : 3000,
  })

export const notifySuccess = (message, addDelay, timeout) => {
  toast.success(message, {
    className: 'react-toast-success Toastify__toast-container',
    autoClose: timeout ? timeout : addDelay ? 5000 : 3000,
  })
}

export const myProfileSlice = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    setEditingHeader: (state, action) => {
      state.isEditingHeader = action.payload
    },
    setUserLikedArtworks: (state, action) => {
      state.userLikedArtworks = action.payload
    },
    setCoverPhoto: (state, action) => {
      state.hasCoverPhoto = action.payload
    },
    setProfilePhoto: (state, action) => {
      state.hasProfilePhoto = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setUserUUID: (state, action) => {
      state.userUUID = action.payload
    },
    setEditingAbout: (state, action) => {
      state.isEditingAbout = action.payload
    },
    setEditingBiography: (state, action) => {
      state.isEditingBiography = action.payload
    },
    setSubscription: (state, action) => {
      state.userData.userSubscription = action.payload
    },
    setEditingContact: (state, action) => {
      state.isEditingContact = action.payload
    },
    setEditingProfile: (state, action) => {
      state.isEditingProfile = action.payload
    },
    setEditingTechnique: (state, action) => {
      state.isEditingTechnique = action.payload
    },
    setEditingExpertise: (state, action) => {
      state.isEditingExpertise = action.payload
    },
    setEditingAwards: (state, action) => {
      state.isEditingAwards = action.payload
    },
    setEditingPublications: (state, action) => {
      state.isEditingPublications = action.payload
    },
    setEditingPastExhibitions: (state, action) => {
      state.isEditingPastExhibitions = action.payload
    },
    setEditingNews: (state, action) => {
      state.isEditingNews = action.payload
    },
    setEditingFaculty: (state, action) => {
      state.isEditingFaculty = action.payload
    },
    setEditingAboutMyBusiness: (state, action) => {
      state.isEditingAboutMyBusiness = action.payload
    },
    setProfileMeasure: (state, action) => {
      state.profileMeasure = action.payload
    },
    setNotices: (state, action) => {
      state.notices = action.payload
    },
    setEmptyNoticesErr: (state, action) => {
      state.emptyNoticesErr = action.payload
    },
    setFollowers: (state, action) => {
      state.followers = action.payload
      state.followLoader = false
    },
    setFollowLoader: (state, action) => {
      state.followLoader = action.payload
    },
    concatFollowers: (state, action) => {
      state.followers = state.followers.concat(action.payload)
    },
    setFollowersFollowingMetadata: (state, action) => {
      const {type,count}=action.payload
      if(type==='following')
      state.followingMetadata = count
      else if(type==='followers')
      state.followersMetadata = count
    },
    setFollowing: (state, action) => {
      state.following = action.payload
      state.followLoader = false
    },
    concatFollowing: (state, action) => {
      state.following = state.following.concat(action.payload)
    },
    setConnections: (state, action) => {
      state.connections = action.payload
      state.connectionsLoader=false
    },
    concatConnections:(state, action)=>{
      state.connections = state.connections.concat(action.payload)
    },
    setConnectionsMetadata: (state, action) => {
      state.connectionsMetadata = action.payload
    },
    setUserActivities: (state, action) => {
      state.userActivities = action.payload
    },
    setUserVideos: (state, action) => {
      state.userVideos = action.payload
    },
    setUserArtworks: (state, action) => {
      state.userArtworks = action.payload
    },
    setUserAlbums: (state, action) => {
      state.userAlbums = action.payload
    },
    setBasicInfoErr: (state, action) => {
      state.basicInfoErr = action.payload
    },
    setUserGroups: (state, action) => {
      state.userGroups = action.payload
    },
    setMyConnections: (state, action) => {
      state.myConnections = action.payload
    },
    setConnectionRequests: (state, action) => {
      state.connectionRequests = action.payload
    },
    setConnectionRequestsSent: (state, action) => {
      state.connectionRequestsSent = action.payload
    },
    setConnectionsCount: (state, action) => {
      state.connectionsCount = action.payload
    },
    setAuthUserDetails: (state, action) => {
      state.authUserDetails = action.payload
    },
    setShowErrToast: (state, action) => {
      state.showErrToast = action.payload
    },
    setUserMedia: (state, action) => {
      state.userMedia = action.payload
    },
    setUsersList: (state, action) => {
      state.usersList = action.payload
      state.usersToKeepForLang = 0
      state.usersListLoader = false
    },
    concatUsersList: (state, action) => {
      state.usersList = state.usersList.concat(action.payload)
      state.usersToKeepForLang = action.payload.length
      state.usersListLoader = false
    },
    setUsersListCount: (state, action) => {
      state.usersListCount = action.payload
    },
    setUsersListLoader: (state, action) => {
      state.usersListLoader = action.payload
    },
    setEnableUserSearch: (state, action) => {
      state.enableUserSearch = action.payload
    },
    setCheckUserType: (state, action) => {
      state.checkUserType = action.payload
    },
    setProfileLockedStatus: (state, action) => {
      state.isProfileLocked = action.payload
    },
    setLoggedInUserBlocked: (state, action) => {
      state.loggedInUserBlocked = action.payload
    },
    setReRenderLandingPage: (state, action) => {
      state.reRenderLandingPage = action.payload
    },
    disconnectSocial: (state, action) => {
      if (action.payload === 'facebook') state.userData.viaFacebook = ''
      else state.userData.viaLinkedIn = ''
    },
    setReferralUsers: (state, action) => {
      state.referralUsers = action.payload
    },
    setReferralCode: (state, action) => {
      state.referralCode = action.payload
    },
  },
})

export const {
  disconnectSocial,
  setEditingHeader,
  setCoverPhoto,
  setProfilePhoto,
  setUserData,
  setUserUUID,
  setEditingAbout,
  setEditingBiography,
  setEditingContact,
  setEditingProfile,
  setProfileMeasure,
  setNotices,
  setEmptyNoticesErr,
  setFollowers,
  setFollowLoader,
  concatFollowers,
  setFollowersFollowingMetadata,
  setFollowing,
  concatFollowing,
  setConnections,
  concatConnections,
  setConnectionsMetadata,
  setUserActivities,
  setUserVideos,
  setUserArtworks,
  setUserAlbums,
  setBasicInfoErr,
  setUserGroups,
  setEditingTechnique,
  setEditingExpertise,
  setEditingAwards,
  setEditingPublications,
  setEditingPastExhibitions,
  setEditingNews,
  setEditingFaculty,
  setEditingAboutMyBusiness,
  setMyConnections,
  setConnectionRequests,
  setConnectionRequestsSent,
  setConnectionsCount,
  setAuthUserDetails,
  setShowErrToast,
  setUserMedia,
  setUsersList,
  concatUsersList,
  setUsersListCount,
  setUsersListLoader,
  setEnableUserSearch,
  setCheckUserType,
  setProfileLockedStatus,
  setLoggedInUserBlocked,
  setSubscription,
  setReRenderLandingPage,
  setUserLikedArtworks,
  setReferralUsers,
  setReferralCode
} = myProfileSlice.actions

export const getUserData = (username, type, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + `user/${username}`, {
      headers: {
        Authorization: token ? token : '',
      },
    })
    if (response.status === 200 && response.data.success) {
      const authUserInfo = oldState.root.myProfile.authUserDetails
      const dataValue = response.data.data.userDetails
      if (isEmptyObj(dataValue) && response.data.messageCode === 'userProfileLocked') {
        dispatch(setProfileLockedStatus(true))
      } else if (isEmptyObj(dataValue) && response.data.messageCode === 'notAuthorizedForUserProfile') {
        dispatch(setLoggedInUserBlocked(true))
      } else {
        dispatch(setProfileLockedStatus(false))
        dispatch(setLoggedInUserBlocked(false))
      }
      let basicInfoReq = false
      if (
        (checkLegacyUserTestEmail(dataValue) ||
          isEmptyObj(dataValue.dob) ||
          (dataValue.dob && !dataValue.dob.value) ||
          (!dataValue.firstName &&
            !dataValue.lastName &&
            (isEmptyObj(dataValue.city) || (dataValue.city && !dataValue.city.value)) &&
            (isEmptyObj(dataValue.country) || (dataValue.country && !dataValue.country.value)))) &&
        dataValue.userIdentity === 'verifiedUser' &&
        type === 'fetchData' &&
        dataValue.userRoleType === 'personal'
      ) {
        dispatch(setEmailValidFormError(null))
        basicInfoReq = true
      }
      dispatch(setBasicInfoErr(null))
      dispatch(setUserData({ ...response.data.data.userDetails, basicInfoReq }))
      dispatch(setUserUUID(response.data.data.userDetails.uuid))
      if (type === 'fetchData') {
        dispatch(setEditingHeader(false))
        dispatch(setEditingAbout(false))
        dispatch(setEditingBiography(false))
        dispatch(setEditingContact(false))
        dispatch(setEditingProfile(false))
        dispatch(setEditingTechnique(false))
        dispatch(setEditingExpertise(false))
        dispatch(setEditingAwards(false))
        dispatch(setEditingPublications(false))
        dispatch(setEditingPastExhibitions(false))
        dispatch(setEditingNews(false))
        dispatch(setEditingFaculty(false))
        dispatch(setEditingAboutMyBusiness(false))
      }
      if (!isEmptyObj(response.data.data.authUserDetails)) {
        dispatch(setAuthUserDetails(response.data.data.authUserDetails))
      }
      if (response.data.data.userDetails.profilePicUrl !== '') {
        if (response.data.data.userDetails.userIdentity === 'verifiedUser') {
          dispatch(
            setAuthUserDetails({
              ...authUserInfo,
              profilePicUrl: response.data.data.userDetails.profilePicUrl,
              dateUpdated: response.data.data.userDetails.dateUpdated,
            })
          )
        }
        dispatch(setProfilePhoto(true))
      } else {
        dispatch(setProfilePhoto(false))
      }
      if (response.data.data.userDetails.coverPicUrl !== '') {
        dispatch(setCoverPhoto(true))
      } else {
        dispatch(setCoverPhoto(false))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const oldState = getState()
    const showErrToast = oldState.root.myProfile.showErrToast
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      if (status === 400 && data.messageCode === 'userNotFound') {
        Router.push('/')
      }
      if (!showErrToast) {
        dispatch(setShowErrToast(true))
        notifyError(t(`translation:auth.serverResponses.errors.${data.messageCode}`))
      }
    }
    dispatch(toggleLoading(false))
  }
}

export const getUserDataResponse = async (username, type, t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + `user/${username}`, {
      headers: {
        Authorization: token ? token : '',
      },
    })
    if (response.status === 200 && response.data.success) {
      return response
    }
  } catch (err) {
    return err
  }
}

export const uploadPhoto =
  (imageData, imageType, profileCompletionType = false, t) =>
  async (dispatch, getState) => {
    try {
      dispatch(toggleLoading(true))
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'user/upload-profile-cover-photo',
        imageData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        const userDataState = getState().root.myProfile.userData
        const authUserInfo = getState().root.myProfile.authUserDetails
        if (imageType === 'profile') {
          if (!profileCompletionType) {
            const newObj = {
              ...userDataState,
              profilePicUrl: response.data.data.imageUrl,
              dateUpdated: response.data.data.dateUpdated,
            }
            dispatch(setUserData(newObj))
            dispatch(setProfilePhoto(true))
            dispatch(
              setAuthUserDetails({
                ...authUserInfo,
                profilePicUrl: response.data.data.imageUrl,
                dateUpdated: response.data.data.dateUpdated,
              })
            )
            notifySuccess(t(`successResponses:profile.profilePhotoUploaded`))
          } else {
            const newObj = {
              profilePicUrl: response.data.data.imageUrl,
              dateUpdated: response.data.data.dateUpdated,
            }
            notifySuccess(t(`successResponses:profile.profilePhotoUploaded`))
            dispatch(toggleLoading(false))
            return newObj
          }
        } else if (imageType === 'cover') {
          const newObj = {
            ...userDataState,
            coverPicUrl: response.data.data.imageUrl,
            dateUpdated: response.data.data.dateUpdated,
          }
          dispatch(setUserData(newObj))
          dispatch(setCoverPhoto(true))
          dispatch(setAuthUserDetails({ ...authUserInfo, dateUpdated: response.data.data.dateUpdated }))
          notifySuccess(t(`successResponses:profile.coverPhotoUploaded`))
        }
        dispatch(profileCompleteness())
        dispatch(toggleLoading(false))
      }
    } catch (err) {
      const { status, data } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
      }
      dispatch(toggleLoading(false))
    }
  }

export const removePhoto = (type, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const data = {
      imageType: type,
    }
    const token = localStorage.getItem('auth_token')
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'user/remove-profile-cover-photo',
      {
        headers: {
          Authorization: token,
        },
        data: data,
      }
    )
    if (response.status === 200 && response.data.success) {
      const userDataState = getState().root.myProfile.userData
      const authUserInfo = getState().root.myProfile.authUserDetails
      if (type === 'profile') {
        const newObj = { ...userDataState, profilePicUrl: '' }
        dispatch(setUserData(newObj))
        dispatch(setProfilePhoto(false))
        dispatch(setAuthUserDetails({ ...authUserInfo, profilePicUrl: '' }))
        notifySuccess(t(`successResponses:profile.profilePhotoRemoved`))
      } else if (type === 'cover') {
        const newObj = { ...userDataState, coverPicUrl: '' }
        dispatch(setUserData(newObj))
        dispatch(setCoverPhoto(false))
        notifySuccess(t(`successResponses:profile.coverPhotoRemoved`))
      }
      dispatch(profileCompleteness())
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

export const profileCompleteness = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'user/profile-completeness',
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setProfileMeasure(response.data.data.profileMeasure))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

export const editProfile = (data, type, chainType, profilePicObj, aboutImages, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const userUUID = oldState.root.myProfile.userUUID
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response && response.status === 200 && response.data.success) {
      const userDataState = oldState.root.myProfile.userData
      if (type === 'head') {
        const newObj = {
          ...userDataState,
          bio: data.sectionData.bio,
          userRole: data.sectionData.profileSwitchTo,
          firstName: data.sectionData.firstName,
          lastName: data.sectionData.lastName,
        }
        dispatch(getUserData(userDataState.username, 'editProfile', t))
        dispatch(setUserData(newObj))
        /**update local storage */
        const userInfo = localStorage.getItem('user_info')
        const parsedUserInfo = userInfo && JSON.parse(userInfo)
        if (parsedUserInfo.accountType === 'personal') {
          const updatedUserInfoObj = {
            ...parsedUserInfo,
            personalFirstName: data.sectionData.firstName,
            personalLastName: data.sectionData.lastName,
          }
          localStorage.setItem('user_info', JSON.stringify(updatedUserInfoObj))
        }
        dispatch(setEditingHeader(false))
      } else if (type === 'about') {
        const newObj = {
          ...userDataState,
          aboutMe: { description: data.sectionData.aboutMe, images: aboutImages },
        }
        dispatch(setUserData(newObj))
        dispatch(setEditingAbout(false))
      } else if (type === 'biography') {
        const newObj = {
          ...userDataState,
          biography: { description: data.sectionData.biography, images: aboutImages },
        }
        dispatch(setUserData(newObj))
        dispatch(setEditingBiography(false))
      } else if (type === 'contact') {
        const newObj = { ...userDataState, ...data.sectionData }
        dispatch(setUserData(newObj))
        dispatch(setEditingContact(false))
      } else if (type === 'personal') {
        if (chainType) {
          const newObj = { ...userDataState, ...data.sectionData }
          dispatch(setUserData(newObj))
          dispatch(setEditingProfile(false))
        } else {
          const maritalStatus = data.sectionData.relationShip
          delete data.sectionData.relationShip
          const newObj = { ...userDataState, ...data.sectionData, maritalStatus }
          dispatch(setUserData(newObj))
          dispatch(setEditingProfile(false))
        }
      } else if (type === 'basicInfo') {
        dispatch(setBasicInfoErr(null))
        const newObj = { ...userDataState, ...data.sectionData, basicInfoReq: false }
        dispatch(setUserData(newObj))
      } else if (type === 'dashboardPopup') {
        const authUserInfo = oldState.root.myProfile.authUserDetails
        const newObj = { ...userDataState, ...data.sectionData, ...profilePicObj }
        dispatch(setUserData(newObj))
        dispatch(setProfilePhoto(true))
        dispatch(setAuthUserDetails({ ...authUserInfo, ...profilePicObj }))
      }
      dispatch(profileCompleteness())

      if (!chainType) {
        if (type === 'basicInfo') {
          notifySuccess(t(`successResponses:profile.infoSaved`))
        } else {
          notifySuccess(t(`successResponses:profile.profileUpdated`))
        }
        dispatch(toggleLoading(false))
        return 'success'
      } else {
        dispatch(toggleLoading(false))
        return 'success'
      }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      if (type === 'basicInfo') {
        dispatch(setBasicInfoErr(errorData.messageCode))
      } else {
        notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
      }
    } else {
      if (type === 'basicInfo') {
        dispatch(setBasicInfoErr(null))
      }
    }
    dispatch(toggleLoading(false))
  }
}

export const getNotices = () => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const userUUID = oldState.root.myProfile.userUUID
    dispatch(toggleLoading(true))
    dispatch(setEmptyNoticesErr(false))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}/notices`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setEmptyNoticesErr(false))
      dispatch(setNotices(response.data.data.notices))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      if (status === 400 && data.messageCode === 'emptyNotices') {
        dispatch(setEmptyNoticesErr(true))
      } else {
        // if (!showErrToast) {
        //   dispatch(setShowErrToast(true))
        //   notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
        // }
      }
    }
    dispatch(toggleLoading(false))
  }
}
/**
 * Get user followers
 * @param {string} type Followers/following
 */
export const getFollowersFollowing = (offset,limit,type, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const userUUID = oldState.root.myProfile.userUUID
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}/${type}`,
      {
        headers: {
          Authorization: token,
        },
        params:{offset,limit}
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'followers') {
        if(offset)
        dispatch(concatFollowers(response.data.data.followers))
        else
        dispatch(setFollowers(response.data.data.followers))
        dispatch(setFollowersFollowingMetadata({type,count:response.data.data.count}))
      }
      if (type === 'following') {
        if(offset)
        dispatch(concatFollowing(response.data.data.following))
        else
        dispatch(setFollowing(response.data.data.following))
        dispatch(setFollowersFollowingMetadata({type,count:response.data.data.count}))
      }
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user followers
 * @param {string} type Followers/following
 */
 export const getFollowersFollowingCustom = (userUniqueId, offset,limit,type, t) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUniqueId}/${type}`,
      {
        headers: {
          Authorization: token,
        },
        params:{offset,limit}
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'followers') {
        if(offset)
        dispatch(concatFollowers(response.data.data.followers))
        else
        dispatch(setFollowers(response.data.data.followers))
        dispatch(setFollowersFollowingMetadata({type,count:response.data.data.count}))
      }
      if (type === 'following') {
        if(offset)
        dispatch(concatFollowing(response.data.data.following))
        else
        dispatch(setFollowing(response.data.data.following))
        dispatch(setFollowersFollowingMetadata({type,count:response.data.data.count}))
      }
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user connections
 * @param {object} userInfo Object containing username of requested user
 */
export const getUserConnections = (userInfo) => async (dispatch) => {
  try {
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userConnections`,
      userInfo,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if(userInfo.offset){
      dispatch(concatConnections(response.data.data.connections))
      }
      else
      dispatch(setConnections(response.data.data.connections))
      dispatch(setConnectionsMetadata(response.data.data.count))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
  }
}

/**
 * Add connection
 * @param {object} userInfo Object containing username of user to whom we are sending connection request
 */
export const addConnection = (userInfo, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}addConnection`,
      userInfo,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      let connectionsList = [...oldState.root.myProfile.connections]
      connectionsList = connectionsList.map((o) => {
        const cloned = Object.assign({}, o)
        if (cloned.username === userInfo.username) {
          cloned.haveConnection = 'false'
          cloned.havePendingRequest = 'false'
          cloned.haveSentRequest = 'true'
        }
        return cloned
      })
      dispatch(setConnections(connectionsList))

      const userData = { ...oldState.root.myProfile.userData }
      if (userData.username === userInfo.username) {
        userData.haveConnection = 'false'
        userData.havePendingRequest = 'false'
        userData.haveSentRequest = 'true'
        dispatch(setUserData(userData))
        dispatch(getUserData(userData.username, 'editProfile', t))
      }
      notifySuccess(t(`successResponses:profile.connectionRequestSent`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Block user
 * @param {object} userInfo Object containing username and typeof user whom we want to block/unblock
 */
export const blockUser = (userInfo, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}block-unblock`,
      userInfo,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      if (userInfo.type === 'block') {
        userData.haveBlockedUser = 'true'
      } else if (userInfo.type === 'unblock') {
        userData.haveBlockedUser = 'false'
      }
      const type = userInfo.type
      dispatch(setUserData(userData))
      dispatch(getUserData(userData.username, 'editProfile', t))
      notifySuccess(type === 'block' ? t(`successResponses:profile.blocked`) : t(`successResponses:profile.unblocked`))
      dispatch(toggleLoading(false))
      return response.data
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Follow/unfollow user
 * @param {string} toFollow User uuid whom to follow/unfollow
 * @param {string} action What action is being perform
 * @param {string} listType For which list (Followers or following)
 * @param {boolean} setInUserData Whether to set haveFollower key in userData info
 * @param {boolean} usersListType Whether API called from users listing page
 */
export const followUnfollow =
  (toFollow, action, listType, setInUserData = false, usersListType = false, t) =>
  async (dispatch, getState) => {
    try {
      const oldState = getState()
      dispatch(toggleLoading(true))
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/follow-unfollow`,
        { toFollow, action },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        if (!usersListType) {
          if (listType === 'following') {
            const userData = { ...oldState.root.myProfile.userData }
            let followingList = [...oldState.root.myProfile.following]

            if (userData.userIdentity === 'verifiedUser') {
              const following = followingList.find((o) => o._id === toFollow)
              if (following) {
                const objIndex = followingList.indexOf(following)
                if (objIndex !== -1) {
                  followingList.splice(objIndex, 1)
                  dispatch(setFollowing(followingList))
                }
              }
              userData.followingCount = parseInt(userData.followingCount) - 1
            } else if (userData.userIdentity === 'authUser') {
              followingList = followingList.map((o) => {
                const cloned = Object.assign({}, o)
                if (cloned._id === toFollow) {
                  cloned.followed = !o.followed
                  cloned.followersCount = action === 'follow' ? o.followersCount + 1 : o.followersCount - 1
                }
                return cloned
              })
              dispatch(setFollowing(followingList))
            }
            dispatch(setUserData(userData))
            dispatch(getUserData(userData.username, 'editProfile', t))
          }

          if (listType === 'followers') {
            const userData = { ...oldState.root.myProfile.userData }
            if (!setInUserData) {
              let followersList = [...oldState.root.myProfile.followers]
              followersList = followersList.map((o) => {
                const cloned = Object.assign({}, o)
                if (cloned._id === toFollow) {
                  cloned.followed = !o.followed
                  cloned.followersCount = action === 'follow' ? o.followersCount + 1 : o.followersCount - 1
                }
                return cloned
              })
              dispatch(setFollowers(followersList))

              if (userData.userIdentity === 'verifiedUser') {
                userData.followingCount =
                  action === 'follow'
                    ? userData.followingCount === ''
                      ? 1
                      : parseInt(userData.followingCount) + 1
                    : parseInt(userData.followingCount) - 1
              }
            }
            if (setInUserData && userData.userIdentity === 'authUser') {
              userData.haveFollower = 'true'
              userData.followersCount =
                action === 'follow'
                  ? userData.followersCount === ''
                    ? 1
                    : parseInt(userData.followersCount) + 1
                  : parseInt(userData.followersCount) - 1
            }
            dispatch(setUserData(userData))
            dispatch(getUserData(userData.username, 'editProfile', t))
          }
        } else {
          let usersListing = [...oldState.root.myProfile.usersList]
          usersListing = usersListing.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === toFollow) {
              cloned.alreadyFollow = action === 'follow' ? 'true' : 'false'
              cloned.userFollowersCount =
                action === 'follow' ? parseInt(cloned.userFollowersCount) + 1 : parseInt(cloned.userFollowersCount) - 1
            }
            return cloned
          })
          dispatch(setUsersList(usersListing))
        }
        notifySuccess(
          action === 'unfollow' ? t(`successResponses:profile.unfollow`) : t(`successResponses:profile.follow`)
        )
        dispatch(toggleLoading(false))
      }
    } catch (err) {
      const { status, data } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
      }
      dispatch(toggleLoading(false))
    }
  }

export const deleteNotice = (noticeUuid, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const userUUID = oldState.root.myProfile.userUUID
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}/notices/${noticeUuid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const noticesState = [...oldState.root.myProfile.notices]
      const obj = noticesState.find((o) => o.id === noticeUuid)
      if (obj) {
        const objIndex = noticesState.indexOf(obj)
        if (objIndex !== -1) {
          noticesState.splice(objIndex, 1)
          dispatch(setNotices(noticesState))
        }
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user activities
 * @param {string} username Username of user
 */
export const getUserActivities = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userActivity/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserActivities(response.data.data.activities))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user videos
 * @param {string} username Username of user
 */
export const getUserVideos = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userVideos/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserVideos(response.data.data.videos))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user artworks
 * @param {string} username Username of user
 */
export const getUserArts = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userArtworks/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserArtworks(response.data.data.artworks))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user albums
 * @param {string} username Username of user
 */
export const getUserAlbums = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userAlbums/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserAlbums(response.data.data.albums))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

/**
 * Get groups subscribed by user
 * @param {string} username Username of user
 */
export const getUserSubGroups = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userSubGroups/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserGroups(response.data.data.groups))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}
/**
 * Get artworks liked by user
 * @param {string} username Username of user
 */
export const getUserLikedArts = (username) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}userLikedArtworks/${username}`,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setUserLikedArtworks(response.data.data.artworksLiked))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Add/edit artist/member specific sections
 * @param {object} info Object containing description and image ids of that section
 * @param {string} section Section name
 * @param {string} type Section Type (artist/member)
 */
export const updateRoleSpecificSection = (info, section, type, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const userUUID = oldState.root.myProfile.userUUID
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}/${type}-fields`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userDataState = oldState.root.myProfile.userData
      dispatch(getUserData(userDataState.username, 'editProfile', t))
      if (section === 'technique') {
        notifySuccess(t(`successResponses:profile.techniqueUpdate`))
      } else if (section === 'expertise') {
        notifySuccess(t(`successResponses:profile.expertiseUpdate`))
      } else if (section === 'awards') {
        notifySuccess(t(`successResponses:profile.awardUpdate`))
      } else if (section === 'publications') {
        notifySuccess(t(`successResponses:profile.publicationUpdate`))
      } else if (section === 'pastExhibitions') {
        notifySuccess(t(`successResponses:profile.exhibitionUpdate`))
      } else if (section === 'aboutMyBusinessProfession') {
        notifySuccess(t(`successResponses:profile.aboutBusinessUpdate`))
      }
      dispatch(setEditingTechnique(false))
      dispatch(setEditingExpertise(false))
      dispatch(setEditingAwards(false))
      dispatch(setEditingPublications(false))
      dispatch(setEditingPastExhibitions(false))
      dispatch(setEditingNews(false))
      dispatch(setEditingFaculty(false))
      dispatch(setEditingAboutMyBusiness(false))
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
 * View user connections
 * @param {string} type Type of listing
 * @param {number} offset Offset to fetch records according to pagination
 */
export const viewUserConnections = (type, offset, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}viewConnections`,
      { type, offset },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'my_connections') {
        if (offset > 0) {
          let myConnectionsObj = { ...oldState.root.myProfile.myConnections }
          let usersArr = [...myConnectionsObj.users, ...response.data.data.connections.users]
          myConnectionsObj.users = usersArr
          dispatch(setMyConnections(myConnectionsObj))
        } else {
          dispatch(setMyConnections(response.data.data.connections))
        }
        if (response.data.data.connections.counts && !isEmptyObj(response.data.data.connections.counts)) {
          dispatch(setConnectionsCount(response.data.data.connections.counts))
        }
      } else if (type === 'received_requests') {
        if (offset > 0) {
          let requestsReceivedObj = { ...oldState.root.myProfile.connectionRequests }
          let usersArr = [...requestsReceivedObj.users, ...response.data.data.connections.users]
          requestsReceivedObj.users = usersArr
          dispatch(setConnectionRequests(requestsReceivedObj))
        } else {
          dispatch(setConnectionRequests(response.data.data.connections))
        }
        if (response.data.data.connections.counts && !isEmptyObj(response.data.data.connections.counts)) {
          dispatch(setConnectionsCount(response.data.data.connections.counts))
        }
      } else if (type === 'sent_requests') {
        if (offset > 0) {
          let requestsSentObj = { ...oldState.root.myProfile.connectionRequestsSent }
          let usersArr = [...requestsSentObj.users, ...response.data.data.connections.users]
          requestsSentObj.users = usersArr
          dispatch(setConnectionRequestsSent(requestsSentObj))
        } else {
          dispatch(setConnectionRequestsSent(response.data.data.connections))
        }
        if (response.data.data.connections.counts && !isEmptyObj(response.data.data.connections.counts)) {
          dispatch(setConnectionsCount(response.data.data.connections.counts))
        }
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Disconnect user
 * @param {string} username Username of user whom we want to disconnect
 * @param {string} id ID of user whom we want to disconnect
 */
export const disconnectUser = (username, id, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}disconnectUser`,
      { username },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      let myConnectionsObj = { ...oldState.root.myProfile.myConnections }
      let myConnectionsList = [...oldState.root.myProfile.myConnections.users]
      const disconnectedObj = myConnectionsList.find((o) => o._id === id)
      if (disconnectedObj) {
        const objIndex = myConnectionsList.indexOf(disconnectedObj)
        if (objIndex !== -1) {
          myConnectionsList[objIndex] = {
            ...myConnectionsList[objIndex],
            isDisconnected: true,
          }
          myConnectionsObj.users = myConnectionsList
          dispatch(setMyConnections(myConnectionsObj))
        }
      }
      notifySuccess(t(`successResponses:profile.disconnectedFromUser`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Delete sent connection request
 * @param {string} username Username of user to whom he had sent the request and now want to delete
 * @param {string} id ID of user to whom he had sent the request and now want to delete
 */
export const deleteRequest = (username, id, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}deleteRequest`,
      { username },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    if (response.status === 200 && response.data.success) {
      let requestsSentObj = { ...oldState.root.myProfile.connectionRequestsSent }
      let requestsSentList = [...oldState.root.myProfile.connectionRequestsSent.users]
      const deletedObj = requestsSentList.find((o) => o._id === id)
      if (deletedObj) {
        const objIndex = requestsSentList.indexOf(deletedObj)
        if (objIndex !== -1) {
          requestsSentList[objIndex] = {
            ...requestsSentList[objIndex],
            isRequestDeleted: true,
          }
          requestsSentObj.users = requestsSentList
          dispatch(setConnectionRequestsSent(requestsSentObj))
        }
      }
      notifySuccess(t(`successResponses:profile.connectionRequestDeleted`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Update pending connection request either ignore or connect
 * @param {string} username Username of user whose request we need to ignore/connect
 * @param {string} id ID of user whose request we need to ignore/connect
 * @param {string} type Type of action user need to perform (ignore/connect)
 */
export const updatePendingRequest = (username, id, type, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}updatePendingRequest`,
      { username, type },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    if (response.status === 200 && response.data.success) {
      let requestsReceivedObj = { ...oldState.root.myProfile.connectionRequests }
      let requestsReceivedList = [...oldState.root.myProfile.connectionRequests.users]
      const updatedObj = requestsReceivedList.find((o) => o._id === id)
      if (updatedObj) {
        const objIndex = requestsReceivedList.indexOf(updatedObj)
        if (objIndex !== -1) {
          if (type === 'connect') {
            requestsReceivedList[objIndex] = {
              ...requestsReceivedList[objIndex],
              isRequestConnected: true,
            }
          } else if (type === 'ignore') {
            requestsReceivedList[objIndex] = {
              ...requestsReceivedList[objIndex],
              isRequestIgnored: true,
            }
          }
          requestsReceivedObj.users = requestsReceivedList
          dispatch(setConnectionRequests(requestsReceivedObj))
        }
      }
      if (type === 'ignore') {
        notifySuccess(t(`successResponses:profile.connectionRequestIgnored`))
      } else if (type === 'connect') {
        notifySuccess(t(`successResponses:profile.userConnected`))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Fetch Users Listing
 */
export const userListing = (limit, offset, sortBy, search, filters) => async (dispatch) => {
  try {
    if (offset === 0) {
      dispatch(setUsersList([]))
      dispatch(setUsersListLoader(true))
    }
    let obj = { limit, offset, sortBy, search, filters }
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user-listing`,
      obj,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )

    if (response.status === 200) {
      const responseData = response.data
      if (offset === 0) dispatch(setUsersList(responseData.users))
      else dispatch(concatUsersList(responseData.users))

      dispatch(setUsersListCount(responseData.count))
      return true
    }
  } catch (err) {
    dispatch(setUsersListLoader(false))
  }
}

export const referralUsers = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'referral-users',
      { sorting: 'latest', limit: 100 },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setReferralUsers(response.data.data.users))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

export const referralCode = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setShowErrToast(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'referral-code',
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setReferralCode(response.data.data.referralCode))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    // const oldState = getState()
    // const showErrToast = oldState.root.myProfile.showErrToast
    // const { status, data } = err.response
    // if (status === 400 || status === 500) {
    //   if (!showErrToast) {
    //     dispatch(setShowErrToast(true))
    //     notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    //   }
    // }
    dispatch(toggleLoading(false))
  }
}

export default myProfileSlice.reducer

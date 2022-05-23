import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Trans } from 'next-i18next'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { checkOtherUser } from '../../utilities/otherProfile'
import { toggleLoading } from '../auth/authSlice'

const initialState = {
  featuredPost: {},
  recentUsers: [],
  buzzArticles: [],
  potdArticles: [],
  exhibitionArticles: [],
  recentVideos: [],
  latestArtworks: [],
  currencyObj: {},
}

export const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    setFeaturedPost: (state, action) => {
      state.featuredPost = action.payload
    },
    setCurrencyObj: (state, action) => {
      state.currencyObj = action.payload
    },
    setRecentUsers: (state, action) => {
      state.recentUsers = action.payload
    },
    setExhibitionArticles: (state, action) => {
      state.exhibitionArticles = action.payload
    },
    setPotdArticles: (state, action) => {
      state.potdArticles = action.payload
    },
    setBuzzArticles: (state, action) => {
      state.buzzArticles = action.payload
    },
    setLatestArtworks: (state, action) => {
      state.latestArtworks = action.payload
    },
    setRecentVideos: (state, action) => {
      state.recentVideos = action.payload
    },
    likeAnArtwork: (state, action) => {
      const { userData, parsedUserInfo, authUserInfo, activityId } = action.payload
      const allArtworksList = [...state.latestArtworks]
      let userObj = {}
      if (!checkOtherUser(userData.username)) {
        userObj = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicUrl: userData.profilePicUrl,
          username: userData.username,
          _id: userData.uuid,
          dateUpdated: userData.dateUpdated,
        }
      } else {
        userObj = {
          firstName: parsedUserInfo.personalFirstName,
          lastName: parsedUserInfo.personalLastName,
          profilePicUrl: authUserInfo.profilePicUrl,
          username: parsedUserInfo.personalUsername,
          _id: parsedUserInfo.personalUuid,
          dateUpdated: authUserInfo.dateUpdated,
        }
      }
      let artworkObj = allArtworksList.find((o) => o._id === activityId)
      if (artworkObj) {
        let likesArr = [...artworkObj.likes, userObj]
        const updatedArtworksList = allArtworksList.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === activityId) {
            cloned.likes = likesArr
          }
          return cloned
        })
        state.latestArtworks = updatedArtworksList
      }
    },
    unlikeAnArtwork: (state, action) => {
      const { username, activityId } = action.payload
      const allArtworksList = [...state.latestArtworks]

      let artworkObj = allArtworksList.find((o) => o._id === activityId)
      if (artworkObj) {
        let likesArr = [...artworkObj.likes]
        const userObj = likesArr.find((o) => o.username === username)
        if (userObj) {
          const objIndex = likesArr.indexOf(userObj)
          if (objIndex !== -1) {
            likesArr.splice(objIndex, 1)
          }
        }
        const updatedArtworksList = allArtworksList.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === activityId) {
            cloned.likes = likesArr
          }
          return cloned
        })
        state.latestArtworks = updatedArtworksList
      }
    },
  },
})

export const {
  setFeaturedPost,
  setRecentUsers,
  setExhibitionArticles,
  setPotdArticles,
  setBuzzArticles,
  setLatestArtworks,
  setRecentVideos,
  likeAnArtwork,
  unlikeAnArtwork,
  setCurrencyObj,
} = landingPageSlice.actions

/**
 * Get featured post
 */
export const getFeaturedPost = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}featured-post`
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setFeaturedPost(response.data.data.featurePost))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get recent users
 */
export const getRecentUsers = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}recent-users`
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setRecentUsers(response.data.data.recentUsers))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get latest articles
 */
export const getLatestArticles = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}latest-articles`,
      {
        articleTypes: ['buzzs', 'exhibitions', 'potds'],
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      if (responseData && responseData.articles) {
        if (responseData.articles && responseData.articles.buzzs) {
          dispatch(setBuzzArticles(responseData.articles.buzzs))
        }
        if (responseData.articles && responseData.articles.exhibitions) {
          dispatch(setExhibitionArticles(responseData.articles.exhibitions))
        }
        if (responseData.articles && responseData.articles.potds) {
          dispatch(setPotdArticles(responseData.articles.potds))
        }
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get recent videos
 */
export const getRecentVideos = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}recent-videos`
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setRecentVideos(response.data.data.videos))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get latest artworks
 */
export const getLatestArtworks = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}latest-artworks`
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setLatestArtworks(response.data.data.artworks))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Follow/unfollow user
 * @param {string} toFollow User uuid whom to follow/unfollow
 * @param {string} action What action is being perform
 */
export const followUnfollowUser = (toFollow, action, t) => async (dispatch, getState) => {
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
      let recentUsers = [...oldState.root.landingPage.recentUsers]

      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      let userObj = {}
      userObj = recentUsers.find((o) => o._id === toFollow)

      if (userObj) {
        let followersArr = []
        if (action === 'follow') {
          let followerObj = {
            firstName: parsedUserInfo.personalFirstName,
            lastName: parsedUserInfo.personalLastName,
            username: parsedUserInfo.personalUsername,
            _id: parsedUserInfo.personalUuid,
          }
          followersArr = [...userObj.followers, followerObj]
        } else if (action === 'unfollow') {
          followersArr = [...userObj.followers]
          const followerObj = followersArr.find((o) => o.username === parsedUserInfo.personalUsername)
          if (followerObj) {
            const objIndex = followersArr.indexOf(followerObj)
            if (objIndex !== -1) {
              followersArr.splice(objIndex, 1)
            }
          }
        }
        const updatedUsers = recentUsers.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === toFollow) {
            cloned.followers = followersArr
          }
          return cloned
        })
        dispatch(setRecentUsers(updatedUsers))
      }

      notifySuccess(action==='unfollow'?t(`successResponses:profile.unfollow`) :
      t(`successResponses:profile.follow`))
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

export default landingPageSlice.reducer

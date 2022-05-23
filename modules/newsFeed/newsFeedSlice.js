import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toggleLoading } from '../auth/authSlice'
import { notifySuccess, notifyError, getUserVideos, getUserAlbums, getUserActivities } from '../profile/myProfileSlice'
import { setArticleDetail } from '../articlePages/articlePagesSlice'
import { tokenNotFoundHandler } from '../../utilities/authUtils'
import { checkOtherUser } from '../../utilities/otherProfile'
import { likeArtwork, unLikeArtwork } from '../subscription/subscriptionSlice'
import { likeAnArtwork, unlikeAnArtwork } from '../landingPage/landingPageSlice'
import Router from 'next/router'
import {cloneDeep} from 'lodash'

const initialState = {
  createPostResponse: false,
  categoryList: [],
  newsFeeds: [],
  newsFeedCount: undefined,
  userPagesDetail: [],
  loggedInUserPagesDetail: [],
  editCommentResponse: {},
  hashtagsList: [],
  loader: true,
  isActivitiesLocked: false,
  singleActivity: {},
  noSingleActivityFound: false,
}

/**
 * Add a post
 * @param {object} info Object containing description and image id of post to be created
 */
export const addPost = (data,t) => async (dispatch, getState) => {
  const { info, type, username, postImgObj } = data
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    dispatch(setCreatePostResponse(false))
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(toggleLoading(false))
      return tokenNotFoundHandler(t)
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}add-post/`, info, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const newsFeedCount = oldState.root.newsFeed.newsFeedCount
      if(type==='edit'){
        const postToEdit=cloneDeep(newsFeeds).find((news)=>news._id===info._id)
        const foundIndex = newsFeeds.findIndex((news)=>news._id===info._id)
        postToEdit.title=info.description
        postToEdit.picUrl=postImgObj
        newsFeeds[foundIndex]=postToEdit
        dispatch(setNewsFeeds(newsFeeds))
        notifySuccess(t(`successResponses:newsFeed.postPublished`))
        dispatch(setCreatePostResponse(true))
        dispatch(toggleLoading(false))
        return
      }
      const postObj = {
        comments: [],
        likes: [],
        dateCreated: response.data.data.dateCreated,
        dateUpdated: response.data.data.dateCreated,
        newsFeedType: 'userPosts',
        title: info.description,
        _id: response.data.data.postId,
        picUrl: postImgObj,
        userId: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicUrl: userData.profilePicUrl,
          username: userData.username,
          _id: userData.uuid,
          dateUpdated: userData.dateUpdated,
        },
      }
      let newNewsFeeds = []
      newNewsFeeds = [postObj, ...newsFeeds]
      dispatch(setNewsFeeds(newNewsFeeds))
      dispatch(setNewsFeedsCount(newsFeedCount + 1))
      notifySuccess(t(`successResponses:newsFeed.postPublished`))
      dispatch(setCreatePostResponse(true))
      if (type === 'profile') dispatch(getUserActivities(username))
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
 * Add a video
 * @param {object} data Object containing description,categoryId and url
 */
export const addVideo = (data,t) => async (dispatch, getState) => {
  const { info, type, username,type2 } = data
  try {
    dispatch(toggleLoading(true))
    const oldState = getState()
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(toggleLoading(false))
      return tokenNotFoundHandler(t)
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}/add-Video/`, info, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const newsFeedCount = oldState.root.newsFeed.newsFeedCount
      if(type2==='edit'){
        const postToEdit=cloneDeep(newsFeeds).find((news)=>news._id===info._id)
        const foundIndex = newsFeeds.findIndex((news)=>news._id===info._id)
        postToEdit.url=info.url
        postToEdit.description=info.description
        postToEdit.categoryId= info.categoryId
        newsFeeds[foundIndex]=postToEdit
        dispatch(setNewsFeeds(newsFeeds))
        notifySuccess(t(`successResponses:newsFeed.videoPublished`))
        dispatch(toggleLoading(false))
        return response.data
      }
      const postObj = {
        comments: [],
        likes: [],
        dateCreated: response.data.data.dateCreated,
        dateUpdated: response.data.data.dateCreated,
        newsFeedType: 'videos',
        categoryId: info.categoryId,
        _id: response.data.data.videoId,
        description: info.description,
        url: info.url,
        userId: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicUrl: userData.profilePicUrl,
          username: userData.username,
          _id: userData.uuid,
          dateUpdated: userData.dateUpdated,
        },
      }
      let newNewsFeeds = []
      newNewsFeeds = [postObj, ...newsFeeds]
      dispatch(setNewsFeeds(newNewsFeeds))
      dispatch(setNewsFeedsCount(newsFeedCount + 1))
      notifySuccess(t(`successResponses:newsFeed.videoPublished`))
      dispatch(toggleLoading(false))
      if (type === 'profile') dispatch(getUserVideos(username))
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

/**
 * Add a photo album
 * @param {object} album Object containing title, description and photos
 */
export const addPhotoAlbum = (data,t) => async (dispatch, getState) => {
  const { album, type, username } = data
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(toggleLoading(false))
      return tokenNotFoundHandler(t)
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}photo-album`, album, {
      headers: {
        Authorization: token,
      },
    })
    if (response&&response.status === 200 && response.data.success) {
      const oldState = getState()
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const newsFeedCount = oldState.root.newsFeed.newsFeedCount
      if(type==='edit'){
        const albumToEdit=cloneDeep(newsFeeds).find((news)=>news._id===album.albumId)
        const foundIndex = newsFeeds.findIndex((news)=>news._id===album.albumId)
        albumToEdit.title=album.title
        albumToEdit.description=album.description
        albumToEdit.coverPicture= album.albumPhotos[0]
        albumToEdit.pictures= album.albumPhotos
        newsFeeds[foundIndex]=albumToEdit
        dispatch(setNewsFeeds(newsFeeds))
        notifySuccess(t(`successResponses:newsFeed.photoAlbumUpdated`))
        dispatch(toggleLoading(false))
        return
      }
      const postObj = {
        comments: [],
        likes: [],
        dateCreated: response.data.data.dateCreated,
        dateUpdated: response.data.data.dateCreated,
        newsFeedType: 'albums',
        _id: response.data.data.albumId,
        description: album.description,
        title: album.title,
        coverPicture: album.albumPhotos[0],
        pictures: album.albumPhotos,
        userId: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          profilePicUrl: userData.profilePicUrl,
          username: userData.username,
          _id: userData.uuid,
          dateUpdated: userData.dateUpdated,
        },
      }
      let newNewsFeeds = []
      newNewsFeeds = [postObj, ...newsFeeds]
      dispatch(setNewsFeeds(newNewsFeeds))
      dispatch(setNewsFeedsCount(newsFeedCount + 1))
      notifySuccess(t(`successResponses:newsFeed.photoAlbumPublished`))
      if (type === 'profile') dispatch(getUserAlbums(username))
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
 * Thunk to fetch categories
 */
export const fetchCategories = createAsyncThunk('newsFeed/fetchCategories', async (t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}/video-categories/`, {
      headers: {
        Authorization: token,
      },
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

export const newsFeedSlice = createSlice({
  name: 'newsFeed',
  initialState,
  reducers: {
    setCreatePostResponse: (state, action) => {
      state.createPostResponse = action.payload
    },
    setNewsFeeds: (state, action) => {
      state.newsFeeds = action.payload
      state.loader = false
    },
    concatNewsFeeds: (state, action) => {
      state.newsFeeds = state.newsFeeds.concat(action.payload)
      state.loader = false
    },
    setNewsFeedsCount: (state, action) => {
      state.newsFeedCount = action.payload
    },
    setUserPagesDetail: (state, action) => {
      state.userPagesDetail = action.payload
    },
    setLoggedInUserPagesDetail: (state, action) => {
      state.loggedInUserPagesDetail = action.payload
    },
    setEditCommentResponse: (state, action) => {
      state.editCommentResponse = action.payload
    },
    setHashtagsList: (state, action) => {
      state.hashtagsList = action.payload
    },
    setActivityLockedStatus: (state, action) => {
      state.isActivitiesLocked = action.payload
    },
    setSingleActivity: (state, action) => {
      state.singleActivity = action.payload
    },
    setNoSingleActivityFound: (state, action) => {
      state.noSingleActivityFound = action.payload
    },
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categoryList = action.payload.data.videoCategories
    },
  },
})

export const {
  setCreatePostResponse,
  setNewsFeeds,
  setUserPagesDetail,
  setLoggedInUserPagesDetail,
  setEditCommentResponse,
  concatNewsFeeds,
  setNewsFeedsCount,
  setHashtagsList,
  setActivityLockedStatus,
  setSingleActivity,
  setNoSingleActivityFound,
} = newsFeedSlice.actions

/**
 * Get user news feed
 * @param {number} offset Offset for pagination of records
 */
export const userFeeds = (offset, username, activityType) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}news-feeds/`,
      { offset, username, activityType },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (response.data.data.newsFeeds && response.data.messageCode === 'userProfileLocked') {
        dispatch(setActivityLockedStatus(true))
      } else {
        dispatch(setActivityLockedStatus(false))
      }
      if (offset === 0) dispatch(setNewsFeeds(response.data.data.newsFeeds))
      else dispatch(concatNewsFeeds(response.data.data.newsFeeds))
      dispatch(setNewsFeedsCount(response.data.data.newsFeedCount))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get user page details
 */
export const userPages = (username, type) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user-pages/`,
      { username },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'forLoggedInUser') {
        dispatch(setLoggedInUserPagesDetail(response.data.data.pagesDetail))
      } else {
        dispatch(setUserPagesDetail(response.data.data.pagesDetail))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get single activity details
 */
export const getActivityDetails = (username, activityId, activityType,t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setNoSingleActivityFound(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}activity-details`,
      { activityId, username },
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      let obj = { ...response.data.data.activityDetails }
      if (activityType === 'post') {
        obj.newsFeedType = 'userPosts'
      } else if (activityType === 'video') {
        obj.newsFeedType = 'videos'
      } else if (activityType === 'album') {
        obj.newsFeedType = 'albums'
      }
      dispatch(setSingleActivity(obj))
      dispatch(setNoSingleActivityFound(false))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      if (status === 400 && errorData.messageCode === 'activityNotFound') {
        dispatch(setNoSingleActivityFound(true))
      } else {
        notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
      }
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Like/Unlike an activity
 * @param {string} type Type of request (like/unlike)
 * @param {string} activityId Id of activity to be liked/unliked
 * @param {string} activityType Type of activity to be liked/unliked
 * @param {string} username Username of user who liked/unliked activity
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 * @param {string} pageType Type of page from where api is called
 */
export const likeAnActivity = (
  type,
  activityId,
  activityType,
  username,
  articleViewPage,
  pageType,
  singleActivityType = false
) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}like-an-activity/`,
      { type, activityId, activityType },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const articleInfo = { ...oldState.root.articlePages.articleDetail }
      const singleActivity = { ...oldState.root.newsFeed.singleActivity }

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)
      if (activityType === 'artworks' && pageType) {
        if (pageType === 'subscriptionCarousel') {
          if (type === 'like') {
            dispatch(likeAnArtwork({ userData, parsedUserInfo, authUserInfo, activityId }))
          } else {
            dispatch(unlikeAnArtwork({ username, activityId }))
          }
        } else {
          if (type === 'like') {
            dispatch(likeArtwork({ userData, parsedUserInfo, authUserInfo, pageType, activityId }))
          } else {
            dispatch(unLikeArtwork({ username, pageType, activityId }))
          }
        }
        dispatch(toggleLoading(false))
        return
      }

      let activityObj = {}
      if (articleViewPage) activityObj = articleInfo
      else if (singleActivityType) activityObj = singleActivity
      else activityObj = newsFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        let likesArr = []
        if (type === 'like') {
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
          likesArr = [...activityObj.likes, userObj]
        } else if (type === 'unlike') {
          likesArr = [...activityObj.likes]
          const userObj = likesArr.find((o) => o.username === username)
          if (userObj) {
            const objIndex = likesArr.indexOf(userObj)
            if (objIndex !== -1) {
              likesArr.splice(objIndex, 1)
            }
          }
        }
        if (articleViewPage) {
          const updatedArticleObj = articleInfo
          updatedArticleObj.likes = likesArr
          dispatch(setArticleDetail(updatedArticleObj))
        } else if (singleActivityType) {
          const updatedSingleActivity = singleActivity
          updatedSingleActivity.likes = likesArr
          dispatch(setSingleActivity(updatedSingleActivity))
        } else {
          const updatedNewsFeeds = newsFeeds.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === activityId) {
              cloned.likes = likesArr
            }
            return cloned
          })
          dispatch(setNewsFeeds(updatedNewsFeeds))
        }
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Comment on an activity
 * @param {string} type Type of comment (comment/subcomment)
 * @param {string} activityId Id of activity on which comment is to be added
 * @param {string} activityType Type of activity on which comment is to be added
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 * @param {string} comment Text added by user
 * @param {string} commentId Id of parent comment if type is subcomment
 */
export const commentOnActivity = (
  type,
  activityId,
  activityType,
  articleViewPage,
  singleActivityType = false,
  comment,
  commentId,
  t
) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const obj = { activityId, activityType, comment }
    if (type === 'subcomment') {
      obj.commentId = commentId
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}comment-an-activity/`, obj, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const articleInfo = { ...oldState.root.articlePages.articleDetail }
      const singleActivity = { ...oldState.root.newsFeed.singleActivity }

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      let activityObj = {}
      if (articleViewPage) activityObj = articleInfo
      else if (singleActivityType) activityObj = singleActivity
      else activityObj = newsFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        let commentsArr = []
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
        const commentObj = {
          body: comment,
          parentComment: type === 'subcomment' ? commentId : null,
          userId: userObj,
          likes: [],
          _id: response.data.data.updatedCommentId,
        }
        commentsArr = [...activityObj.comments, commentObj]

        if (articleViewPage) {
          const updatedArticleObj = articleInfo
          updatedArticleObj.comments = commentsArr
          dispatch(setArticleDetail(updatedArticleObj))
        } else if (singleActivityType) {
          const updatedSingleActivity = singleActivity
          updatedSingleActivity.comments = commentsArr
          dispatch(setSingleActivity(updatedSingleActivity))
        } else {
          const updatedNewsFeeds = newsFeeds.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === activityId) {
              cloned.comments = commentsArr
            }
            return cloned
          })
          dispatch(setNewsFeeds(updatedNewsFeeds))
        }
      }
      notifySuccess(t(`successResponses:newsFeed.commentAdded`))
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
 * Like/Unlike a comment
 * @param {string} type Type of request (like/unlike)
 * @param {string} activityId Id of activity whose comment is to be liked/unliked
 * @param {string} activityType Type of activity whose comment is to be liked/unliked
 * @param {string} commentId Id of comment which is to be liked/unliked
 * @param {string} username Username of user who liked/unliked comment
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 */
export const likeComment = (
  type,
  activityId,
  activityType,
  commentId,
  username,
  articleViewPage,
  singleActivityType = false
) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}like-a-comment/`,
      { type, activityId, activityType, commentId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const articleInfo = { ...oldState.root.articlePages.articleDetail }
      const singleActivity = { ...oldState.root.newsFeed.singleActivity }

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      let activityObj = {}
      if (articleViewPage) activityObj = articleInfo
      else if (singleActivityType) activityObj = singleActivity
      else activityObj = newsFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        const commentObj = activityObj.comments.find((o) => o._id === commentId)
        if (commentObj) {
          let likesArr = []
          if (type === 'like') {
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
            likesArr = [...commentObj.likes, userObj]
          } else if (type === 'unlike') {
            likesArr = [...commentObj.likes]
            const userObj = likesArr.find((o) => o.username === username)
            if (userObj) {
              const objIndex = likesArr.indexOf(userObj)
              if (objIndex !== -1) {
                likesArr.splice(objIndex, 1)
              }
            }
          }

          const updatedCommentsArr = activityObj.comments.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === commentId) {
              cloned.likes = likesArr
            }
            return cloned
          })

          if (articleViewPage) {
            const updatedArticleObj = articleInfo
            updatedArticleObj.comments = updatedCommentsArr
            dispatch(setArticleDetail(updatedArticleObj))
          } else if (singleActivityType) {
            const updatedSingleActivity = singleActivity
            updatedSingleActivity.comments = updatedCommentsArr
            dispatch(setSingleActivity(updatedSingleActivity))
          } else {
            const updatedNewsFeeds = newsFeeds.map((o) => {
              const cloned = Object.assign({}, o)
              if (cloned._id === activityId) {
                cloned.comments = updatedCommentsArr
              }
              return cloned
            })
            dispatch(setNewsFeeds(updatedNewsFeeds))
          }
        }
      }

      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Delete a comment
 * @param {string} activityId Id of activity whose comment is to be deleted
 * @param {string} activityType Type of activity whose comment is to be deleted
 * @param {string} commentId Id of comment which is to be deleted
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 */
export const deleteComment = (activityId, activityType, commentId, articleViewPage,t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}delete-a-comment/`,
      { activityId, activityType, commentId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const articleInfo = { ...oldState.root.articlePages.articleDetail }

      let activityObj = {}
      if (articleViewPage) activityObj = articleInfo
      else activityObj = newsFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        const commentObj = activityObj.comments.find((o) => o._id === commentId)
        if (commentObj) {
          const objIndex = activityObj.comments.indexOf(commentObj)
          const commentsArr = [...activityObj.comments]
          if (objIndex !== -1) {
            commentsArr.splice(objIndex, 1)
          }

          if (articleViewPage) {
            const updatedArticleObj = articleInfo
            updatedArticleObj.comments = commentsArr
            dispatch(setArticleDetail(updatedArticleObj))
          } else {
            const updatedNewsFeeds = newsFeeds.map((o) => {
              const cloned = Object.assign({}, o)
              if (cloned._id === activityId) {
                cloned.comments = commentsArr
              }
              return cloned
            })
            dispatch(setNewsFeeds(updatedNewsFeeds))
          }
        }
      }
      notifySuccess(t(`successResponses:newsFeed.commentDeleted`))
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
 * Hide a comment
 * @param {string} activityId Id of activity whose comment is to be hidden/unhide
 * @param {string} activityType Type of activity whose comment is to be hidden/unhide
 * @param {string} commentId Id of comment which is to be hidden/ unhide
 * @param {string} type hide /unhide
 */
export const hideComment = (activityId, activityType, commentId, type,t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}hide-a-comment/`,
      { activityId, activityType, commentId, type },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const activityObj = newsFeeds.find((o) => o._id === activityId)
      if (activityObj) {
        const updatedCommentsArr = activityObj.comments.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === commentId) {
            cloned.hidden = type === 'hide' ? true : false
          }
          return cloned
        })
        const updatedNewsFeeds = newsFeeds.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === activityId) {
            cloned.comments = updatedCommentsArr
          }
          return cloned
        })
        dispatch(setNewsFeeds(updatedNewsFeeds))
      }
      notifySuccess(
        type === 'hide'
          ? t(`successResponses:newsFeed.commentHide`)
          : t(`successResponses:newsFeed.commentUnhide`)
      )
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
 * Edit Comment
 * @param {string} activityId Id of activity on which comment is to be edited
 * @param {string} activityType Type of activity on which comment is to be edited
 * @param {string} comment Text updated by user
 * @param {string} commentId Id of comment to be edited
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 */
export const editComment = (activityId, activityType, comment, commentId, articleViewPage,t) => async (
  dispatch,
  getState
) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    dispatch(
      setEditCommentResponse({
        editing: false,
        commentId: '',
      })
    )
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}edit-a-comment/`,
      { activityId, activityType, comment, commentId },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    if (response.status === 200 && response.data.success) {
      const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
      const articleInfo = { ...oldState.root.articlePages.articleDetail }

      let activityObj = {}
      if (articleViewPage) activityObj = articleInfo
      else activityObj = newsFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        const updatedCommentsArr = activityObj.comments.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === commentId) {
            cloned.body = comment
          }
          return cloned
        })

        if (articleViewPage) {
          const updatedArticleObj = articleInfo
          updatedArticleObj.comments = updatedCommentsArr
          dispatch(setArticleDetail(updatedArticleObj))
        } else {
          const updatedNewsFeeds = newsFeeds.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === activityId) {
              cloned.comments = updatedCommentsArr
            }
            return cloned
          })
          dispatch(setNewsFeeds(updatedNewsFeeds))
        }
      }
      notifySuccess(t(`successResponses:newsFeed.commentUpdated`))
      dispatch(
        setEditCommentResponse({
          editing: true,
          commentId,
        })
      )
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
 * Delete an activity
 * @param {string} activityId Id of activity which is to be deleted
 * @param {string} activityType Type of activity which is to be deleted
 */
export const deleteActivity = (activityId, activityType, singleActivityType = false,t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    if (!token) {
      dispatch(toggleLoading(false))
      return tokenNotFoundHandler(t)
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}delete-activity/`,
      { activityId, activityType },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (singleActivityType) {
        const userInfo = localStorage.getItem('user_info')
        const parsedUserInfo = userInfo && JSON.parse(userInfo)
        setSingleActivity({})
        Router.push(`/user/${parsedUserInfo.personalUsername}/activity`)
      } else {
        const newsFeeds = [...oldState.root.newsFeed.newsFeeds]
        const newsFeedCount = oldState.root.newsFeed.newsFeedCount
        const activityObj = newsFeeds.find((o) => o && o._id === activityId)

        if (activityObj) {
          const objIndex = newsFeeds.indexOf(activityObj)
          const updatedNewsFeeds = [...newsFeeds]
          if (objIndex !== -1) {
            updatedNewsFeeds.splice(objIndex, 1)
            dispatch(setNewsFeeds(updatedNewsFeeds))
            dispatch(setNewsFeedsCount(newsFeedCount - 1))
          }
        }
      }
      notifySuccess(t(`successResponses:newsFeed.activityDeleted`))
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
 * Get hashtags listing
 */
export const listHashtags = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}list-hashtags/`, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      dispatch(setHashtagsList(response.data.data.hashTags))
      if (response.data.messageCode === 'emptyHashTags') {
        dispatch(setHashtagsList([]))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

export default newsFeedSlice.reducer

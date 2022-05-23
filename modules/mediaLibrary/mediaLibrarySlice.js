import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import _ from 'lodash'
import { toggleLoading } from '../auth/authSlice'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'

const initialState = {
  userMedia: null,
  mediaTags: [],
  tempMediaTags: [],
}

export const mediaLibrarySlice = createSlice({
  name: 'mediaLibrary',
  initialState,
  reducers: {
    setUserMedia: (state, action) => {
      state.userMedia = action.payload
    },
    addNewTag: (state, action) => {
      const exist = state.tempMediaTags.find((tag) => tag === action.payload)
      if (!exist) state.tempMediaTags.push(action.payload)
    },
    updateTags: (state, action) => {
      state.mediaTags = state.mediaTags.concat(state.tempMediaTags)
      state.mediaTags = [...new Set([...state.mediaTags, ...state.tempMediaTags])]
      state.tempMediaTags = []
    },
    clearUserMedia: (state) => {
      state.userMedia = null
    },
    clearMediaTags: (state) => {
      state.mediaTags = []
      state.tempMediaTags = []
    },
    setMediaTags: (state, action) => {
      state.mediaTags = action.payload
    },
    updateTagsOnDelete: (state, action) => {
      const res = []
      for (let i = 0; i < state.mediaTags.length; i++) {
        if (action.payload.tags.indexOf(state.mediaTags[i]) === -1) {
          res.push(state.mediaTags[i])
        }
      }
      for (let j = 0; j < action.payload.tags.length; j++) {
        if (state.mediaTags.indexOf(action.payload.tags[j]) === -1) {
          res.push(action.payload.tags[j])
        }
      }
      state.mediaTags = res
    },
  },
})

export const {
  setUserMedia,
  clearUserMedia,
  clearMediaTags,
  setMediaTags,
  addNewTag,
  updateTags,
  updateTagsOnDelete,
} = mediaLibrarySlice.actions

/**
 * Get user's medias
 * @param {string} keyword Search media by keyword
 * @param {string} tag Search media by tag
 * @param {number} page page number
 */
export const getUserMedia = (params,t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/media-library/list`, {
      headers: {
        Authorization: token,
      },
      params,
    })
    if (response.status === 200 && response.data.success) {
      const userMedias = response.data.data
      if (params.page > 1) {
        const existingPhotos = _.cloneDeep(getState().root.mediaLibrary.userMedia.photos)
        dispatch(setUserMedia({ count: userMedias.count, photos: [...existingPhotos, ...userMedias.photos] }))
      } else {
        dispatch(setUserMedia(userMedias))
      }
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${data.messageCode}`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Delete user media
 * @param {string} mediaId
 */
export const deleteUserMedia = (media, params, setLocalStateTag,t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/media-library/${media._id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userMediaState = getState().root.mediaLibrary.userMedia
      if (userMediaState.photos.length === 1) {
        dispatch(getUserMedia({ ...params, page: 1, tag: '' },t))
        setLocalStateTag('')
      } else {
        dispatch(getUserMedia({ ...params, page: 1 },t))
      }
      dispatch(getUserMediaTags())
      if (media.tags.length > 0) {
        const existingTags = _.cloneDeep(getState().root.mediaLibrary.mediaTags).filter(
          (tag) => !media.tags.includes(tag)
        )
        dispatch(setMediaTags(existingTags))
      }
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Update user's media
 * @param {array} medias List which need to be update
 */
export const updateAllMedia = (medias, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/media-library/update`,
      medias,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const existingMedia = _.cloneDeep(getState().root.mediaLibrary.userMedia)
      existingMedia.photos = existingMedia.photos.map((media) => medias.find((o) => o._id === media._id) || media)
      dispatch(setUserMedia(existingMedia)) // update local state
      notifySuccess(
        medias.length > 1
          ? t(`successResponses:mediaLibrary.updatedAllMedia`)
          : t(`successResponses:mediaLibrary.updatedMedia`)
      )
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Get user media's unique tags for use in filters
 */
export const getUserMediaTags = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/media-library/tags`, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const userMediaTags = response.data.data
      dispatch(setMediaTags(userMediaTags))
    }
  } catch (error) {
    //log errors
  } finally {
    dispatch(toggleLoading(false))
  }
}

export default mediaLibrarySlice.reducer

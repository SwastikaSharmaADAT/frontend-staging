import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifySuccess, notifyError } from '../profile/myProfileSlice'

/**
 * Thunk to add Article
 */
export const addArticle = createAsyncThunk('article/addArticle', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}article`, data, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      notifySuccess(
        data.status === 'publish'
          ? t(`successResponses:articles.articlePublish`)
          : t(`successResponses:articles.articleDraft`)
      )
      const resObject = { ...response, article: data }
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get Type
 */
export const getType = createAsyncThunk('article/getType', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}activity-type`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
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
 * Thunk to edit Article
 */
export const editArticle = createAsyncThunk('article/editArticle', async (data) => {
  const { reqObject, articleId } = data
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}article/${articleId}`,
      reqObject,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:articles.articleUpdate`))
      const resObject = { ...response, article: data }
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to add Article
 */
export const getArticleDetails = createAsyncThunk('article/getArticleDetails', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}article-details`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const resObject = { ...response, article: data }
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to fetch videos
 */
export const getVideos = createAsyncThunk('article/getVideos', async (data) => {
  try {
    const t = data.t
    delete data.t
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}videos`,
      {
        headers: {
          Authorization: token ? token : '',
        },
        params: data,
      }
    )
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

const initialState = {
  articles: [],
  videos: [],
  metadata: [],
  articleToBeEdited: {},
  loading: false,
  videosLoader: true,
}
export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: {
    [getVideos.pending]: (state, action) => {
      state.loading = true
      state.videosLoader = true
    },

    [getVideos.fulfilled]: (state, action) => {
      if (
        action.payload &&
        action.payload.data &&
        action.payload.data[0] &&
        action.payload.data[0].metadata &&
        action.payload.data[0].metadata.length > 0 &&
        action.payload.data[0].videos.length > 0
      ) {
        if (action.payload.data[0].metadata[0].page === 1) state.videos = action.payload.data[0].videos
        else state.videos = state.videos.concat(action.payload.data[0].videos)
        state.metadata = action.payload.data[0].metadata
        state.loading = false
        state.videosLoader = false
      } else {
        state.metadata = []
        state.videos = []
        state.videosLoader = false
        state.loading = false
      }
    },
    [getArticleDetails.fulfilled]: (state, action) => {
      /**fetch details of single article for edit page and assign to articleToBeEdited  */
      if (action.payload) {
        state.articleToBeEdited = action.payload.data.data.article
      }
    },

    [editArticle.fulfilled]: (state, action) => {
      state.articleToBeEdited = {}
    },
  },
})

export default articleSlice.reducer

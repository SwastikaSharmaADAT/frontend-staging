import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { shuffle } from 'lodash'
import { toggleLoading } from '../auth/authSlice'
import { notifyError } from '../profile/myProfileSlice'
import Router from 'next/router'

const initialState = {
  sliderBuzzItems: [],
  sliderExhibitionItems: [],
  sliderPotdItems: [],
  articlesList: [],
  articlesListCount: undefined,
  articlesListLoader: true,
  featuredPostsList: [],
  articleDetail: {},
  myArticlesList: [],
  myArticlesListCount: undefined,
  myArticlesListLoader: true,
}

export const articlePagesSlice = createSlice({
  name: 'articlePages',
  initialState,
  reducers: {
    setSliderBuzzItems: (state, action) => {
      state.sliderBuzzItems = shuffle(action.payload)
    },
    setSliderExhibitionItems: (state, action) => {
      state.sliderExhibitionItems = shuffle(action.payload)
    },
    setSliderPotdItems: (state, action) => {
      state.sliderPotdItems = shuffle(action.payload)
    },
    setArticlesList: (state, action) => {
      state.articlesList = action.payload
      state.articlesListLoader = false
    },
    concatArticlesList: (state, action) => {
      state.articlesList = state.articlesList.concat(action.payload)
      state.articlesListLoader = false
    },
    setArticlesListCount: (state, action) => {
      state.articlesListCount = action.payload
    },
    setArticlesListLoader: (state, action) => {
      state.articlesListLoader = action.payload
    },
    setFeaturedPostsList: (state, action) => {
      state.featuredPostsList = action.payload
    },
    setArticleDetail: (state, action) => {
      state.articleDetail = action.payload
    },
    setMyArticlesList: (state, action) => {
      state.myArticlesList = action.payload
      state.myArticlesListLoader = false
    },
    concatMyArticlesList: (state, action) => {
      state.myArticlesList = state.myArticlesList.concat(action.payload)
      state.myArticlesListLoader = false
    },
    setMyArticlesListCount: (state, action) => {
      state.myArticlesListCount = action.payload
    },
    setMyArticlesListLoader: (state, action) => {
      state.myArticlesListLoader = action.payload
    },
  },
})

export const {
  setSliderBuzzItems,
  setSliderExhibitionItems,
  setSliderPotdItems,
  setArticlesList,
  concatArticlesList,
  setArticlesListCount,
  setArticlesListLoader,
  setFeaturedPostsList,
  setArticleDetail,
  setMyArticlesList,
  concatMyArticlesList,
  setMyArticlesListCount,
  setMyArticlesListLoader,
} = articlePagesSlice.actions

/**
 * Fetch Article Listing
 */
export const articleListing = (articleType, limit, offset, callType, filters) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    if (callType === 'slider') dispatch(toggleLoading(true))
    if (callType === 'listing' && offset === 0) {
      dispatch(setArticlesList([]))
      dispatch(setArticlesListLoader(true))
    }
    let obj = { articleType, limit, offset }
    if (articleType === 'exhibition' && callType === 'listing') {
      obj.filters = filters
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}article-listing`,
      obj,{
        headers: {
          Authorization: token ? token : '',
          },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (callType === 'slider') {
        if (articleType === 'buzz') {
          dispatch(setSliderBuzzItems(response.data.data.articles))
        } else if (articleType === 'exhibition') {
          dispatch(setSliderExhibitionItems(response.data.data.articles))
        } else if (articleType === 'potd') {
          dispatch(setSliderPotdItems(response.data.data.articles))
        }
        dispatch(toggleLoading(false))
      } else if (callType === 'listing') {
        const responseData = response.data.data
        if (offset === 0) dispatch(setArticlesList(responseData.articles))
        else dispatch(concatArticlesList(responseData.articles))

        dispatch(setArticlesListCount(responseData.articlesCount))
      }
    }
  } catch (err) {
    dispatch(toggleLoading(false))
    dispatch(setArticlesListLoader(false))
  }
}

/**
 * Fetch My Articles Listing
 */
export const getMyArticles = (limit, offset) => async (dispatch) => {
  try {
    if (offset === 0) {
      dispatch(setMyArticlesList([]))
      dispatch(setMyArticlesListLoader(true))
    }
    let obj = { limit, offset }
    let token = ''
    if (localStorage.getItem('auth_token')) {
      token = localStorage.getItem('auth_token')
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}my-articles`,
      obj,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data

      if (offset === 0) dispatch(setMyArticlesList(responseData.articles))
      else dispatch(concatMyArticlesList(responseData.articles))

      dispatch(setMyArticlesListCount(responseData.count))
    }
  } catch (err) {
    dispatch(setMyArticlesListLoader(false))
  }
}

/**
 * Fetch Featured Posts Listing
 */
export const featuredPosts = (articleType) => async (dispatch) => {
  try {
    dispatch(setFeaturedPostsList([]))
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}featured-posts`,
      {
        articleType,
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setFeaturedPostsList(response.data.data.featuredPosts))
    }
  } catch (err) {
    //Do nothing
  }
}

/**
 * Fetch Article Details
 */
export const articleDetails = (articleType, articleId, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    dispatch(setArticleDetail({}))
    let obj = { articleType, articleId }
    let token = ''
    if (localStorage.getItem('auth_token')) {
      token = localStorage.getItem('auth_token')
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ACTIVITIES_LIST_SERVICE_API_ENDPOINT}article-details`,
      obj,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setArticleDetail(response.data.data.article))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      if (
        status === 400 &&
        (errorData.messageCode === 'articleNotFound' || errorData.messageCode === 'notAuthorized')
      ) {
        notifyError(t(`errorResponses:article.articleNotFound`))
        Router.push('/articles')
      } else notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }

    dispatch(toggleLoading(false))
  }
}

export default articlePagesSlice.reducer

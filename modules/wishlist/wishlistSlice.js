import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifySuccess, notifyError } from '../profile/myProfileSlice'
import { toggleLoading } from '../auth/authSlice'

const initialState = {
  myWishlist: [],
  artworkLoading: false,
  allWishlistsApiCancelToken: undefined,
  loading: false,
  myWishlistLoader: true,
}
export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setMyWishlist: (state, action) => {
      state.myWishlist = action.payload
      state.myWishlistLoader = false
    },
    setWishlistLoading: (state, action) => {
      state.wishlistLoading = action.payload
    },
    setAllWishlistsApiCancelToken: (state, action) => {
      state.allWishlistsApiCancelToken = action.payload
    },
    setmyWishlistLoader: (state, action) => {
      state.myWishlistLoader = action.payload
    },
    
  }
})


export const {
  setMyWishlist,
  setWishlistLoading,
  setAllWishlistsApiCancelToken,
  setmyWishlistLoader
} = wishlistSlice.actions

/**
 * Get user wishlists
 * @param {string} type Followers/following
 */
 export const getUserWishlist = ( userId ) => async (dispatch,  getState) => {
  try {
    const offset= 0
    const limit = 4
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userId}/user-wishlist`,
      {
        headers: {
          Authorization: token ? token : '',
        },
        params:{offset,limit}
      },
      
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setMyWishlist(responseData.wishlist.artworks))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
}

/**
 * Add or Remove artworks from wishlist
 * @param {string} type Followers/following
 */
 export const addToWishlist =  (toAdd, action, t) =>  async (dispatch, getState) => {
    try {
      const oldState = getState()
      dispatch(toggleLoading(true))
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/add-remove-wishlist`,
        { toAdd, action },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        notifySuccess(
          action === 'addToWishlist' ? t(`successResponses:wishlist.added`) : t(`successResponses:wishlist.removed`)
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


export default wishlistSlice.reducer

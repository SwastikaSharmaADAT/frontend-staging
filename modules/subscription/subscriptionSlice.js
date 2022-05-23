import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { uniqBy } from 'lodash'
import router from 'next/router'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { checkOtherUser } from '../../utilities/otherProfile'
import { toggleLoading } from '../auth/authSlice'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'

/**
 * Thunk to quick edit artworks
 */
export const quickEditDetailArtwork = createAsyncThunk('myAccount/quickEditDetailArtwork', async (params) => {
  const { data, t } = params
  try {
    const obj = {
      artworkId: data.artworkId,
      title: data.title,
      price: data.price,
      inStock: data.inStock,
      selfNote: data.selfNote,
      priceOnRequest: data.priceOnRequest,
    }
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}quick-edit-artwork`,
      obj,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:artworks.artworkUpdated`))
      return { ...response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to checkout to buy subscription
 */
export const subscriptionCheckout = createAsyncThunk('myAccount/subscriptionCheckout', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}subscription-checkout`,
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
 * Thunk to delete artwork
 */
export const deleteDetailArtwork = createAsyncThunk('myAccount/deleteDetailArtwork', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}delete-artwork`,
      { artworkId: data.artworkId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:artworks.artworkDeleted`))
      return { ...response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get more vendors
 */
export const getMoreVendorArtworks = createAsyncThunk('myAccount/getMoreVendorArtworks', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}more-vendor-artworks`,
      data,
      {
        headers: {
          Authorization: token ? token : '',
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
 * Thunk to get more vendors
 */
export const getAllArtists = createAsyncThunk('myAccount/getAllArtists', async (params) => {
  const { data, t } = params
  try {
    if (!data) return
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}all-artists`, {
      headers: {
        Authorization: token,
      },
      params: {
        search: data.search,
        type: data.type,
      },
    })
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get more vendors
 */
export const reactivateSubscription = createAsyncThunk('myAccount/reactivateSubscription', async (params) => {
  const { t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}reactivate-subscription`,
      {
        headers: {
          Authorization: token ? token : '',
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
 * Thunk to get more vendors
 */
export const getVendorDetails = createAsyncThunk('myAccount/getVendorDetails', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}vendor-details`,
      data,
      {
        headers: {
          Authorization: token ? token : '',
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

const initialState = {
  subscriptions: [],
  subscriptionCategories: [],
  artworkDetail: {},
  artworkGenres: [],
  artworkMediums: [],
  allArtists: [],
  artworksList: [],
  artworksListCount: undefined,
  artworksListLoader: true,
  artworkLoading: false,
  allArtworksApiCancelToken: undefined,
  artworkIds: [],
  maxArtworkPrice: 250000,
  cartPopupStatus: false,
  callResetFilter: false,
  tabSubscription: false,
}

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload
    },
    setTabSubscription: (state, action) => {
      state.tabSubscription = action.payload
    },
    setSubscriptionCategories: (state, action) => {
      state.subscriptionCategories = action.payload
    },
    setCallResetFilter: (state, action) => {
      state.callResetFilter = action.payload
    },
    setArtworkDetail: (state, action) => {
      state.artworkDetail = action.payload
    },
    setArtworkGenres: (state, action) => {
      state.artworkGenres = action.payload
    },
    setArtworkMediums: (state, action) => {
      state.artworkMediums = action.payload
    },
    likeArtwork: (state, action) => {
      const { userData, parsedUserInfo, authUserInfo, pageType, activityId } = action.payload
      const allArtworksList = [...state.artworksList]
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
      if (pageType !== 'allArtworks') {
        state.artworkDetail.likes = [...state.artworkDetail.likes, userObj]
      } else {
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
          state.artworksList = updatedArtworksList
        }
      }
    },
    unLikeArtwork: (state, action) => {
      const { username, pageType, activityId } = action.payload
      const allArtworksList = [...state.artworksList]
      if (pageType !== 'allArtworks') {
        let likesArr = [...state.artworkDetail.likes]
        const userObj = likesArr.find((o) => o.username === username)
        if (userObj) {
          const objIndex = likesArr.indexOf(userObj)
          if (objIndex !== -1) {
            likesArr.splice(objIndex, 1)
          }
        }
        state.artworkDetail.likes = likesArr
      } else {
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
          state.artworksList = updatedArtworksList
        }
      }
    },
    setArtworksList: (state, action) => {
      state.artworksList = action.payload
      state.artworksListLoader = false
    },
    concatArtworksList: (state, action) => {
      state.artworksList = state.artworksList.concat(action.payload)
      state.artworksListLoader = false
    },
    setArtworksListCount: (state, action) => {
      state.artworksListCount = action.payload
    },
    setArtworksListLoader: (state, action) => {
      state.artworksListLoader = action.payload
    },
    setArtworkLoading: (state, action) => {
      state.artworkLoading = action.payload
    },
    setAllArtworksApiCancelToken: (state, action) => {
      state.allArtworksApiCancelToken = action.payload
    },
    setAllArtists: (state, action) => {
      state.allArtists = action.payload
    },
    setArtworkIds: (state, action) => {
      state.artworkIds = action.payload
    },
    setMaxArtworkPrice: (state, action) => {
      state.maxArtworkPrice = action.payload
    },
    setCartPopup: (state, action) => {
      state.cartPopupStatus = action.payload
    },
    setArtistOptions: (state, action) => {
      const { item, type } = action.payload
      if (type === 'change') {
        const options = [...current(state).allArtists]
        const selected = options.filter((o) => item.some((f) => f.value === o._id))
        state.allArtists = selected
      } else if (type === 'blur') {
        const options = [...current(state).allArtists]
        const selected = options.filter((o) => item.some((f) => f === o._id))
        state.allArtists = selected
      }
    },
  },
  extraReducers: {
    [getMoreVendorArtworks.fulfilled]: (state, action) => {
      /**update settings in state aswell */
      if (action.payload && action.payload.data) {
        state.notificationSettings = action.payload.reqData
      }
    },
    [quickEditDetailArtwork.fulfilled]: (state, action) => {
      /**update settings in state aswell */
      if (action.payload) {
        const { reqData } = action.payload
        if (reqData.pageType === 'detailPage') {
          state.artworkDetail.title = reqData.title
          state.artworkDetail.inStock = reqData.inStock
          state.artworkDetail.selfNote = reqData.selfNote
          state.artworkDetail.priceOnRequest = reqData.priceOnRequest
          if (reqData.price.toString().includes('.')) {
            state.artworkDetail.price = reqData.price.toString().replace('.', ',')
          } else {
            state.artworkDetail.price = reqData.price.toString()
          }
        } else if (reqData.pageType === 'allArtworksPage') {
          const allArtworks = [...state.artworksList]
          const newArtworks = allArtworks.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === reqData.artworkId) {
              cloned.title = reqData.title
              cloned.inStock = reqData.inStock
              cloned.selfNote = reqData.selfNote
              cloned.priceOnRequest = reqData.priceOnRequest
              if (reqData.price.toString().includes('.')) {
                cloned.price = reqData.price.toString().replace('.', ',')
              } else {
                cloned.price = reqData.price.toString()
              }
            }
            return cloned
          })
          state.artworksList = newArtworks
        }
      }
    },
    [deleteDetailArtwork.fulfilled]: (state, action) => {
      /**update settings in state aswell */
      if (action.payload) {
        const { artworkId, type } = action.payload.reqData
        if (type === 'artworkDetail') {
          state.artworkDetail = {}
        } else if (type === 'allArtworks') {
          state.artworksList = state.artworksList.filter((art) => art._id !== artworkId)
          state.artworksListCount = state.artworksListCount - 1
        }
      }
    },
    [getAllArtists.fulfilled]: (state, action) => {
      /**update settings in state aswell */
      if (action.payload) {
        state.allArtists = uniqBy([...action.payload.data.artistUsers, ...state.allArtists], '_id')
      }
    },
  },
})

export const {
  setArtworkDetail,
  setSubscriptions,
  setSubscriptionCategories,
  likeArtwork,
  setArtworkLoading,
  unLikeArtwork,
  setArtworkGenres,
  setArtworkMediums,
  setArtworksList,
  concatArtworksList,
  setArtworksListCount,
  setArtworksListLoader,
  setAllArtworksApiCancelToken,
  setAllArtists,
  setArtworkIds,
  setMaxArtworkPrice,
  setCartPopup,
  setArtistOptions,
  setCallResetFilter,
  setTabSubscription,
} = subscriptionSlice.actions

/**
 * Fetch Subscription Plans Info
 */
export const getPlans = (role) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}get-plans`,
      {
        params: {
          roleName: role,
        },
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setSubscriptions(responseData.subscriptionData))
      dispatch(setSubscriptionCategories(responseData.subscriptionCategoriesData))
      dispatch(toggleLoading(false))
      return response
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}
/**
 * Fetch Artwork detail
 */
export const getArtworkDetails = (artworkId) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}vendor-artwork-details`,
      { artworkId },
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setArtworkDetail(responseData.artworkDetails))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 && data.messageCode === 'notAuthorizedForArtwork') {
      router.push('/artworks')
    } else {
      return err.response.data
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Fetch order details and show success error messages
 */
export const getOrderDetails = (refId, type) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}get-order-details`,
      { refId, type },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      if (!isEmptyObj(responseData.orderDetail)) {
        const { type: msgType, message } = responseData.orderDetail
        if (msgType === 'success') {
          notifySuccess(message, false, 10000)
        } else if (msgType === 'failure') {
          notifyError(message, 10000)
        }
        if (type === 'landing') {
          dispatch(setCartPopup(true))
        }
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Add artwork
 */
export const addAnArtwork = (values, isTrustedSeller, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}vendor-add-artwork`,
      values,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      if (responseData.type === 'drafted') {
        notifySuccess(t(`successResponses:artworks.draftSave`))
      } else if (responseData.type === 'published') {
        if (isTrustedSeller) notifySuccess(t(`successResponses:artworks.published`))
        else notifySuccess(t(`successResponses:artworks.sentForReview`))
        router.push('/myartworks')
      } else if (responseData.type === 'updated') {
        notifySuccess(t(`successResponses:artworks.artworkUpdated`))
        // router.push('/myartworks')
      }
      dispatch(toggleLoading(false))
      return true
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
    return errorData
  }
}

/**
 * Fetch Artwork Mediums
 */
export const getArtworkMediums = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}get-mediums`, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setArtworkMediums(responseData.mediums))
    }
  } catch (err) {
    //Do nothing
  }
}

/**
 * Fetch Artwork Genres
 */
export const getArtworkGenres = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}get-genres`, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setArtworkGenres(responseData.genres))
    }
  } catch (err) {
    //Do nothing
  }
}

/**
 * Fetch buyer artworks Listing
 */
export const allArtworksListing = (limit, offset, filters, sort, pageType) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    const artworkIdsArr = [...oldState.root.subscription.artworkIds]
    const token = localStorage.getItem('auth_token')
    const userUUID = oldState.root.myProfile.userUUID
    setArtworkLoading(true)
    if (offset === 0) {
      dispatch(setArtworksList([]))
      dispatch(setArtworksListLoader(true))
    }

    // Updating the cancel token for the new request
    let cancelToken = axios.CancelToken.source()
    dispatch(setAllArtworksApiCancelToken(cancelToken))

    let obj = { limit, offset, filters, sort }

    if (sort === 'random' && offset > 0 && !pageType) {
      obj.artworkIds = artworkIdsArr
    }
    let response 
    if ( pageType === 'wishlist' ) {
      response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}user/${userUUID}/user-wishlist`,
        {
          headers: {
            Authorization: token,
          },
          params:{offset,limit}
        }
      )
    } else {
      response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}all-artworks`,
        obj,
        {
          cancelToken: cancelToken.token,
        }
      )
    }
    // const response = await axios.post(
    //   `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}all-artworks`,
    //   obj,
    //   {
    //     cancelToken: cancelToken.token,
    //   }
    // )

    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data

      if (offset === 0) {
        if ( responseData.wishlist ) {
          dispatch(setArtworksList(responseData.wishlist.artworks))
        } else {
          dispatch(setArtworksList(responseData.artworks))
        }
        //dispatch(setArtworksList(responseData.artworks))
        if (sort === 'random') {
          const artIds = responseData.artworks.map((art) => art._id)
          dispatch(setArtworkIds(artIds))
        }
      } else {
        if ( responseData.wishlist ) {
          dispatch(concatArtworksList(responseData.wishlist.artworks))
        } else {
          dispatch(concatArtworksList(responseData.artworks))
        }
        //dispatch(concatArtworksList(responseData.artworks))
        if (sort === 'random') {
          const artIds = responseData.artworks.map((art) => art._id)
          dispatch(setArtworkIds([...artworkIdsArr, ...artIds]))
        }
      }

      setArtworkLoading(false)
      dispatch(setArtworksListCount(responseData.count))
      return true
    }
  } catch (err) {
    dispatch(setArtworksListLoader(false))
  }
}

/**
 * Fetch highest artwork price
 */
export const getHighestPrice = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}get-highest-price`
    )

    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      dispatch(setMaxArtworkPrice(responseData.highestPrice))
    }
  } catch (err) {
    //Do nothing
  }
}

export default subscriptionSlice.reducer

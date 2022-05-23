import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
/**
 * Thunk to quick edit artworks
 */
export const quickEditArtwork = createAsyncThunk('dashboard/quickEditArtwork', async (data) => {
  const { t } = data
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}quick-edit-artwork`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:artworks.artworkUpdated`))
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
 * Thunk to delete artwork
 */
export const deleteArtwork = createAsyncThunk('dashboard/deleteArtwork', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}delete-artwork`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:artworks.artworkDeleted`))
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
 * Thunk to fetch artworks
 */
export const getArtworklist = createAsyncThunk('dashboard/getArtworklist', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}artworks`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) return { ...response.data, reqData: data }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to fetch series names
 */
export const getSeriesName = createAsyncThunk('dashboard/getSeriesName', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}get-series-name`,
      data,
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
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to save settings
 */
export const saveVendorSettings = createAsyncThunk('dashboard/saveVendorSettings', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}save-vendor-settings`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:dashboard.settingsSaved`))

      return { ...data, ...response.data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to fetch settings
 */
export const getSettings = createAsyncThunk('dashboard/getSettings', async (t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}vendor-settings`,
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
 * Thunk to fetch vendor subscription
 */
export const getVendorSubscription = createAsyncThunk('dashboard/getVendorSubscription', async (t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}vendor-subscription`,
      {
        headers: {
          Authorization: token,
        },
        params:{timestamp:new Date().getTime()}
      }
    )
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 422 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to fetch vendor url
 */
export const getVendorUrl = createAsyncThunk('dashboard/getVendorUrl', async (data) => {
  const { t } = data
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}vendor-url`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 422 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to fetch payment switch url
 */
export const getSwitchPaymentUrl = createAsyncThunk('dashboard/getSwitchPaymentUrl', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}cart-checkout`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 422 || status === 500) {
      notifyError(data.t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to fetch payment cancel url
 */
export const cancelSubscription = createAsyncThunk('dashboard/getCancelSubscriptionUrl', async ({ data, t }) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_SUBSCRIPTION_SERVICE_API_ENDPOINT}cancel-subscription`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:subscriptions.cancel`))
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 422 || status === 500 || status === 400) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

const initialState = {
  settings: {
    vendorSubscription: {},
  },
  artworks: [],
  artworksCount: 0,
  artworksLoader: true,
  seriesName: [],
}

export const dashboardSlice = createSlice({
  name: 'staticContent',
  initialState,
  reducers: {
    toggleArtworksLoader: (state, action) => {
      state.artworksLoader = action.payload
    },
  },
  extraReducers: {
    [saveVendorSettings.fulfilled]: (state, action) => {
      const { type } = action.payload
      if (type === 'general' || type === 'vacation') {
        if (state.settings[action.payload.type + 'Settings'])
          state.settings[action.payload.type + 'Settings'] = action.payload.values
        else state.settings[action.payload.type + 'Settings'] = action.payload.values
      } else {
        if (state.settings[action.payload.type.slice(0, -1) + 'Details'])
          state.settings[action.payload.type.slice(0, -1) + 'Details'] = action.payload.values
        else state.settings[action.payload.type.slice(0, -1) + 'Details'] = action.payload.values
      }
    },
    [getSettings.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data && action.payload.data.vendorSettings)
        state.settings = action.payload.data.vendorSettings
    },
    [getVendorSubscription.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data) state.settings.vendorSubscription = action.payload.data
    },
    [getArtworklist.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data) {
        state.artworksLoader = false
        state.artworksCount = action.payload.data.count
        if (action.payload.reqData.offset === 0) {
          state.artworks = []
          state.artworks = action.payload.data.artworks
        } else state.artworks = state.artworks.concat(action.payload.data.artworks)
      }
    },
    [deleteArtwork.fulfilled]: (state, action) => {
      if (action.payload) state.artworks = state.artworks.filter((art) => art._id !== action.payload.reqData.artworkId)
    },
    [quickEditArtwork.fulfilled]: (state, action) => {
      if (action.payload) {
        const updateArtwork = state.artworks.find((art) => art._id === action.payload.reqData.artworkId)
        updateArtwork.title = action.payload.reqData.title
        updateArtwork.selfNote = action.payload.reqData.selfNote
        updateArtwork.price = action.payload.reqData.price.toString().replace('.', ',')
        updateArtwork.inStock = action.payload.reqData.inStock
        updateArtwork.priceOnRequest = action.payload.reqData.priceOnRequest
      }
    },
    [getSeriesName.fulfilled]: (state, action) => {
      if (action.payload) {
        state.seriesName = action.payload.data.series
      }
    },
  },
})

export const { toggleArtworksLoader } = dashboardSlice.actions

export default dashboardSlice.reducer

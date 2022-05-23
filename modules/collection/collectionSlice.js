import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifySuccess, notifyError } from '../profile/myProfileSlice'
import { saveAs } from 'file-saver'

const initialState = {
  myCollections: [],
  myCollectionVisibility: 'public',
  videos: [],
  metadata: [],
  articleToBeEdited: {},
  loading: false,
  videosLoader: true,
}
export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setMyCollections: (state, action) => {
      state.myCollections = action.payload
    }
  }
})


export const {
  setMyCollections,
} = collectionSlice.actions

/**
 * Thunk to fetch videos
 */
export const getMyCollections =  (data, t) => async (dispatch) => {
  try {
    const t = data.t
    delete data.t
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}getMyCollections`,
      data,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
      console.log(responseData)
      dispatch(setMyCollections(responseData.artworks))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
}

export const setMyCollectionVisibility =  (data, t) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}myCollectionVisibility`,
      data,
      {
        headers: {
          Authorization: token ? token : '',
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
}

export const downloadArtwork =  (data, t) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}download-artwork`,
      data,
      {
        headers: {
          Authorization: token ? token : '',
        },
        responseType: "arraybuffer"
      }
    )
    if (response) {
      const blob = new Blob([response.data], {type: 'image/jpeg, image/png, image/jpg'})
      const sv = saveAs(blob, `Artmo_Purchased_Artwork.png`)
    }
  } catch (err) {
     console.log(err)
    // const { status, data: errorData } = err.response
    // if (status === 400 || status === 500) {
    //   notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    // }
  }
}


export default collectionSlice.reducer

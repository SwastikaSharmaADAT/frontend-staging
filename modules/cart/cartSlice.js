import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { uniq } from 'lodash'
import { notifyError } from '../profile/myProfileSlice'

/**
 * Thunk to checkout
 */
export const cartCheckout = createAsyncThunk(
  'cart/cartCheckout',
  async (data) => {
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
      if (response.status === 200 && response.data.success) {
        return response.data
      }
    } catch (err) {
      const { status, data: errorData } = err.response
      if (status === 400 || status === 500) {
        notifyError(
          data.t(`auth.serverResponses.errors.${errorData.messageCode}`)
        )
      }
    }
  }
)
/**
 * Thunk to get cart details
 */
export const getCartDetails = createAsyncThunk(
  'cart/getCartDetails',
  async (t) => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}cart-details`,
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
        notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
      }
    }
  }
)
/**
 * Thunk to add artwork in cart
 */
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ data, t }) => {
    try {
      const token = localStorage.getItem('auth_token')
      const artworkIds = data.map((o) => o._id)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}add-to-cart`,
        { artworkIds },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        return { data: response.data, reqData: data }
      }
    } catch (err) {
      const { status, data: errorData } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
      }
    }
  }
)
/**
 * Thunk to add artwork in cart
 */
export const deleteFromCart = createAsyncThunk(
  'cart/deleteFromCart',
  async (data) => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}delete-from-cart`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        return { data: response.data, reqData: data }
      } else notifyError(data.t(`errorResponses.cart.removeItemError`))
    } catch (err) {
      const { status, data: errorData } = err.response
      if (status === 400 || status === 500) {
        notifyError(
          data.t(`auth.serverResponses.errors.${errorData.messageCode}`)
        )
      }
    }
  }
)
/**
 * Thunk to shift local cart to DB cart
 */
export const shiftCartFromLocal = createAsyncThunk(
  'cart/shiftCartFromLocal',
  async (t) => {
    let cart = localStorage.getItem('userCart')
    if (!cart) return
    let cartArray = JSON.parse(cart)
    try {
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_ARTWORKS_SERVICE_API_ENDPOINT}add-to-cart`,
        { artworkIds: cartArray },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        return { data: response.data, reqData: cartArray }
      }
    } catch (err) {
      const { status, data: errorData } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
      }
    }
  }
)

const initialState = {
  cart: [],
  cartId: '',
  url: '',
  isCartCheckoutFulfilled: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartLocal: (state, action) => {
      const { artworkDetail, t } = action.payload
      let cart = localStorage.getItem('userCart')
      let detailedCart =
        localStorage.getItem('detailedCart') &&
        JSON.parse(localStorage.getItem('detailedCart'))
      if (cart) {
        let cartArray = JSON.parse(cart)
        if (cartArray.find((item) => item === detail._id)) {
          notifyError(t(`errorResponses:cart.alreadyInCart`))
          return
        }
        cartArray.push(artworkDetail._id)
        detailedCart.push(artworkDetail)
        state.cart = cartArray
        localStorage.setItem('userCart', JSON.stringify(cartArray))
        localStorage.setItem('detailedCart', JSON.stringify(detailedCart))
      } else {
        let cartArray = []
        let detailedCartArray = []
        cartArray.push(artworkDetail._id)
        detailedCartArray.push(artworkDetail)
        state.cart = cartArray
        localStorage.setItem('userCart', JSON.stringify(cartArray))
        localStorage.setItem('detailedCart', JSON.stringify(detailedCartArray))
      }
    },

    getLocalCart: (state, action) => {
      let cart = localStorage.getItem('userCart')
      if (!cart) return
      let cartArray = JSON.parse(cart)
      state.cart = state.cart.concat(cartArray)
    },
    deleteFromLocalCart: (state, action) => {
      let cart =
        localStorage.getItem('userCart') &&
        JSON.parse(localStorage.getItem('userCart'))
      let detailedCart =
        localStorage.getItem('detailedCart') &&
        JSON.parse(localStorage.getItem('detailedCart'))
      cart = cart.filter((item) => item !== action.payload.artworkId)
      detailedCart = detailedCart.filter(
        (item) => item._id !== action.payload.artworkId
      )
      localStorage.setItem('userCart', JSON.stringify(cart))
      localStorage.setItem('detailedCart', JSON.stringify(detailedCart))
      state.cart = cart
    },

    clearstate: (state) => {
      state.isCartCheckoutFulfilled = false

      return state
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      const newCart = state.cart.concat(action.payload.reqData)
      state.cart = uniq(newCart)
      let localCart =
        localStorage.getItem('userCart') &&
        JSON.parse(localStorage.getItem('userCart'))
      let cartArr = []
      if (localCart && localCart.length > 0) {
        cartArr = [...localCart, ...action.payload.reqData]
      } else {
        cartArr = action.payload.reqData
      }
      localStorage.setItem('userCart', JSON.stringify(cartArr))
      state.cartId = action.payload.data.data.cartId
    },
    [shiftCartFromLocal.fulfilled]: (state, action) => {
      if (action.payload) {
        // state.cart = action.payload.data.data.updatedCartIds
      }
    },
    [getCartDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload.data.cartDetails
        state.cartId = action.payload.data.cartId
      }
    },
    [deleteFromCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload.reqData.artworkId
        )
      }
    },
    [cartCheckout.fulfilled]: (state, action) => {
      console.log('cart checkout fulfilled', action, 'state', state)
      if (action.payload) {
        state.url = action.payload.data.checkoutUrl
      }
      state.isCartCheckoutFulfilled = true
      console.log('state 260', state.isCartCheckoutFulfilled, state.url)
    },
  },
})

export const { addCartLocal, getLocalCart, deleteFromLocalCart } =
  cartSlice.actions

export default cartSlice.reducer

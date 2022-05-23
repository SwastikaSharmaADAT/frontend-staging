import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { shuffle, remove, uniq } from 'lodash'
import { toggleLoading } from '../auth/authSlice'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { checkOtherUser } from '../../utilities/otherProfile'
import router from 'next/router'

// thunk to get Product details
export const getProductListDetails = createAsyncThunk(
    'giftcard/productlist',
    async (t) => {
        console.log(`${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST}giftcard/productlist`)
        console.log(`${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST_DEV}giftcard/productlist`)

        try{
            const token = localStorage.getItem('auth_token')
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST}giftcard/productlist`,
                {
                    headers: {
                        Authorization: token
                    },
                }
            )
            if(response.status===200 && response.data.status===1){
                console.log("24", response.data)
                return response.data
            }
        }catch(err){
            const { status, data: errorData } = err.response
            if(status===400 || status===500){
                notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
            }
        }
    }
)
// thunk to get adminAccessToken & add product to cart
export const getAdminAccesstoken = createAsyncThunk(
    'admin/getaccesstoken/',
    async (data, t) => {
        try{
            const token = localStorage.getItem('auth_token')
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST}admin/getaccesstoken`,
                {
                    headers: {
                        Authorization: token
                    },
                }
            )
            if(response.status===200 && response.data.status===1){
                // return response.data;
                try{
                    const responseOther = await axios.post(
                        `${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST}giftcard/addediproducttocart`,
                        { cartDetails: data },
                        {
                            headers: {
                                Authorization: 'Bearer' + response.data.access_token,
                            },
                        }
                    )
                    if(responseOther.status===200 && responseOther.data.success){
                        // return response.data;
                    }
                }catch(err){
                    const { status, data: errorData } = err.responseOther
                    if(status===400 || status===500){
                        notifyError(
                            data.t(`auth.serverResponses.errors.${errorData.messageCode}`)
                        )
                    }
                }
            }
        }catch(err){
            const { status, data: errorData } = err.response
            if(status===400 || status===500){
                notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
            }
        }
    }
)
// thunk to get custmor card list
export const getCustomerCardList = createAsyncThunk(
    'customer/usedgiftcard/',
    async (email, t) => {
        try{
            const token = localStorage.getItem('auth_token')
            console.log(91, email);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_GIFTCARD_PRODUCTLIST}customer/usedgiftcard`,
                {
                    params: {
                        customerEmail: email
                    },
                    headers: {
                        Authorization: token
                    },
                }
            )
            if(response.status===200 && response.data.status===1){
                console.log('52', response.data)
                return response.data
            }
        }catch(err){
            const { status, data: errorData } = err.response
            if(status===400 || status===500){
                notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
                console.log(err)
            }
        }
    }
)
const initialState = {
    productList: [],
    token: null,
    customerUSedGiftcards: [],
}
export const mygiftcardslice = createSlice({
    name: 'mygiftcard',
    initialState,
    reducers: {},

    extraReducers:{
        [getProductListDetails.rejected]: (state) => {
            console.log('rejected');
        },
        [getProductListDetails.fulfilled]: (state, action) => {
            console.log('action.payload', action.payload);
            if(action.payload){
                state.productList = action.payload?.product_list
            }
            console.log('state.product_list', state.product_list);
        },
        [getAdminAccesstoken.fulfilled]: (state, action) => {
            if(action.payload){
                state.token = action.payload?.access_token
            }
        },
        [getCustomerCardList.fulfilled]: (state, action) => {
            if(action.payload){
                state.customerUSedGiftcards = action.payload?.customer_used_gift_cards
            }
        }
        // [getAdminAccesstoken.pending]: (state, action) => {
        //     console.log(pending);
        // },
        // [getAdminAccesstoken.rejected]: (state, action) => {
        //     console.log(rejected);

        // },
    }
})
export default mygiftcardslice.reducer
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { toggleLoading } from '../auth/authSlice'
import { replaceWordpressImage } from '../../utilities/imageReplaceUtils'

/**
 * Thunk to fetch outlook contacts
 */
export const getOutlookContacts = createAsyncThunk('staticContent/getOutlookContacts', async (params) => {
  const { data, t } = params
  try {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/contacts?$Select=emailAddresses,displayName`,
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }
    )
    if (response.status === 200) {
      return response.data.value
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to invite users to Artmo
 */
export const inviteToArtmo = createAsyncThunk('staticContent/inviteToArtmo', async (params) => {
  const { data, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT}invite-to-artmo`,
      { emails: data },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:staticContent.inviteSent`))
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get supported languages
 */
export const getLanguages = createAsyncThunk('staticContent/getLanguages', async (params) => {
  const { t } = params
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}languages`
    )
    if (response.status === 200 && response.data.success) return response.data
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

const initialState = {
  tabContent: {},
  inviteToArtmoContent: {
    howDoesThisWork: '',
  },
  subscriptionContent: {
    memberPlusPlan: '',
    memberProPlan: '',
    memberLifetimePlan: '',
    memberGatewayCharges: '',
    memberRefund: '',
    faqCancelRefund: '',
    faqPublishSell: '',
    faqForSelling: '',
    artistGatewayCharges: '',
    artistRefund: '',
    artistBasicPlanFree: '',
    artistConnectCollectors: '',
    faqSubscriptionFee: '',
    faqBasicAccount: '',
    faqNoCommision: '',
  },
  vendorDashboardContent: {
    vendorDashboardArtworkApproval: '',
    vendorDashboardArtworkUpload: '',
    vendorDashboardHowArtworkApproved: '',
    vendorDashboardSoldArtworks: '',
    knowledgebaseVacationMode: '',
    knowledgebaseSubmitArtwork: '',
    knowledgbaseProductNotVisible: '',
    knowledgbasePhotoRequirements: '',
    knowledgbaseCertificateAuthenticity: '',
  },
  languagesData: [],
  appLanguage: '',
  appLanguageCode: '',
  underagePopupContent: '',
  joinInSectionContent: '',
  userTermsCondContent: {
    header: '',
    overview: '',
    contentEligibility: '',
    feesPayments: '',
    accTermination: '',
    provisions: '',
  },
  privacyPolicyContent: {
    header: '',
    accPrivacySettings: '',
    dataSecurity: '',
    collectingPersonalData: '',
    adsOnArtmo: '',
  },
  vendorTermsCondContent: {
    header: '',
    impOverview: '',
    stepByStep: '',
    overview: '',
    fees: '',
    termination: '',
    payoutSchedule: '',
    contentEligibility: '',
    yourObligations: '',
    artmoObligations: '',
    returns: '',
    provisions: '',
    shippingReturnPolicy: '',
  },
  whatIsArtmoTabContent: '',
  WhatIsArtmoMainContent: '',
  artmoShippingPolicy: '',
  legacyPageLinkText: '',
  legacyUserWelcomeMessage: '',
  changePaymentNote: '',
  mobileAppContent: {
    header: '',
    step1: '',
    step2: '',
    step3: '',
    step4: '',
    note: '',
  },
  artworkUploadContent: {
    header: '',
    images: '',
    title: '',
    artMaterial: '',
    series: '',
    limitedEdition: '',
    price: '',
    dimension: '',
    frame: '',
    medium: '',
    genre: '',
    subjectTags: '',
    description: '',
    text: '',
    yourProfile: '',
  },
}

export const staticContentSlice = createSlice({
  name: 'staticContent',
  initialState,
  reducers: {
    setTabContent: (state, action) => {
      state.tabContent = action.payload
    },
    setAppLanguageCode: (state, action) => {
      const langObject = current(state).languagesData.find((obj) => {
        return obj.languageCode.toLowerCase() === action.payload.toLowerCase()
      })
      if (langObject) {
        state.appLanguageCode = action.payload
        state.appLanguage = langObject._id
      }
    },
    setArtmoShipping: (state, action) => {
      state.artmoShippingPolicy = action.payload
    },
    setUnderagePopupContent: (state, action) => {
      state.underagePopupContent = action.payload
    },
    setLegacyPageLinkText: (state, action) => {
      state.legacyPageLinkText = action.payload
    },
    setLegacyUserWelcomeMessage: (state, action) => {
      state.legacyUserWelcomeMessage = action.payload
    },
    setChangePaymentNote: (state, action) => {
      state.changePaymentNote = action.payload
    },
    setJoinInSectionContent: (state, action) => {
      state.joinInSectionContent = action.payload
    },
    setWhatIsArtmoTabContent: (state, action) => {
      state.whatIsArtmoTabContent = action.payload
    },
    setWhatIsArtmoMainContent: ( state, action ) => {
      state.whatIsArtmoMainContent = action.payload
    },
    setSubscriptionContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.subscriptionContent = { ...state.subscriptionContent, ...obj }
    },
    setVendorDashboardContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.vendorDashboardContent = { ...state.vendorDashboardContent, ...obj }
    },
    setInviteToArtmoContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.inviteToArtmoContent = { ...state.inviteToArtmoContent, ...obj }
    },
    setUserTermsCondContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.userTermsCondContent = { ...state.userTermsCondContent, ...obj }
    },
    setPrivacyPolicyContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.privacyPolicyContent = { ...state.privacyPolicyContent, ...obj }
    },
    setVendorTermsCondContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.vendorTermsCondContent = { ...state.vendorTermsCondContent, ...obj }
    },
    setMobileAppContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.mobileAppContent = { ...state.mobileAppContent, ...obj }
    },
    setArtworkUploadContent: (state, action) => {
      const obj = {}
      obj[action.payload.type] = action.payload.data
      state.artworkUploadContent = { ...state.artworkUploadContent, ...obj }
    },
    setLanguage: (state, action) => {
      if (action.payload._id && action.payload.languageCode) {
        state.appLanguage = action.payload._id
        state.appLanguageCode = action.payload.languageCode
        localStorage.setItem('appLanguage', action.payload._id)
        localStorage.setItem('appLanguageCode', action.payload.languageCode)
      }
    },
  },
  extraReducers: {
    [getLanguages.fulfilled]: (state, action) => {
      if (action.payload) state.languagesData = action.payload.data.languagesData
    },
  },
})

export const {
  setTabContent,
  setSubscriptionContent,
  setAppLanguageCode,
  setVendorDashboardContent,
  setLanguage,
  setInviteToArtmoContent,
  setUnderagePopupContent,
  setLegacyPageLinkText,
  setLegacyUserWelcomeMessage,
  setChangePaymentNote,
  setJoinInSectionContent,
  setUserTermsCondContent,
  setPrivacyPolicyContent,
  setVendorTermsCondContent,
  setWhatIsArtmoTabContent,
  setWhatIsArtmoMainContent,
  setArtmoShipping,
  setMobileAppContent,
  setArtworkUploadContent,
} = staticContentSlice.actions

/**
 * Fetch Static Content
 */
export const getContent =
  (uniqueCode, t, type = 'tabs', uniqueId = null) =>
  async (dispatch) => {
    try {
      dispatch(toggleLoading(true))
      let obj = { uniqueCode, languageId: localStorage.getItem('appLanguage') } 
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_STATIC_CONTENT_SERVICE_API_ENDPOINT}get-content`,
        obj
      )
      if (response.status === 200 && response.data.success) {
        /**check if content is present else give a default string */
        let fetchedData = response.data.data.contentData.content
        fetchedData = replaceWordpressImage(fetchedData)
        if (!fetchedData) fetchedData = t(`translation:staticContentDefaultString`)

        if (type === 'tabs') {
          if (!response.data.data.contentData) dispatch(setTabContent({ content: fetchedData }))
          else {
            let obj = response.data.data.contentData
            obj.content = replaceWordpressImage(obj.content)
            dispatch(setTabContent(obj))
          }
        } else if (type === 'subscriptionPage') {
          dispatch(setSubscriptionContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'vendorDashboard') {
          dispatch(setVendorDashboardContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'inviteToArtmo') {
          dispatch(setInviteToArtmoContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'underagePopup') {
          dispatch(setUnderagePopupContent(fetchedData))
        } else if (type === 'legacyPageLink') {
          dispatch(setLegacyPageLinkText(fetchedData))
        } else if (type === 'legacyUserWelcomeMessage') {
          dispatch(setLegacyUserWelcomeMessage(fetchedData))
        } else if (type === 'changePaymentDataNote') {
          dispatch(setChangePaymentNote(fetchedData))
        } else if (type === 'joinInSection') {
          dispatch(setJoinInSectionContent(fetchedData))
        } else if (type === 'userTermsConditions') {
          dispatch(setUserTermsCondContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'privacyPolicyPage') {
          dispatch(setPrivacyPolicyContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'vendorTermsConditions') {
          dispatch(setVendorTermsCondContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'whatIsArtmo') {
          dispatch(setWhatIsArtmoTabContent(fetchedData))
        } else if ( type === 'whatisArtmoMain') {
          dispatch(setWhatIsArtmoMainContent(fetchedData))
        }else if (type === 'artworkDetails') {
          dispatch(setArtmoShipping(fetchedData))
        } else if (type === 'mobileApp') {
          dispatch(setMobileAppContent({ data: fetchedData, type: uniqueId }))
        } else if (type === 'artworkUpload') {
          dispatch(setArtworkUploadContent({ data: fetchedData, type: uniqueId }))
        }
        dispatch(toggleLoading(false))
      }
    } catch (err) {
      dispatch(toggleLoading(false))
    }
  }

export default staticContentSlice.reducer

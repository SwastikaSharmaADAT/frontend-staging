import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import authReducer from './modules/auth/authSlice'
import myProfileReducer from './modules/profile/myProfileSlice'
import socketReducer from './modules/socket/socketSlice'
import newsFeedReducer from './modules/newsFeed/newsFeedSlice'
import mediaLibraryReducer from './modules/mediaLibrary/mediaLibrarySlice'
import pagesReducer from './modules/pages/pagesSlice'
import groupsReducer from './modules/groups/groupsSlice'
import articleReducer from './modules/articles/articleSlice'
import collectionReducer from './modules/collection/collectionSlice'
import notificationReducer from './modules/notifications/notificationSlice'
import articlePagesReducer from './modules/articlePages/articlePagesSlice'
import staticContentReducer from './modules/staticContent/staticContentSlice'
import subscriptionSliceReducer from './modules/subscription/subscriptionSlice'
import dashboardReducer from './modules/dashboard/dashboardSlice'
import myAccountReducer from './modules/myAccount/myAccountSlice'
import cartReducer from './modules/cart/cartSlice'
import messagesReducer from './modules/messages/messagesSlice'
import landingPageReducer from './modules/landingPage/landingPageSlice'
import mygiftcardReducer from './modules/mygiftcard/mygiftcardslice'
import wishlistReducer from './modules/wishlist/wishlistSlice'

const appReducer = combineReducers({
  auth: authReducer,
  myProfile: myProfileReducer,
  socket: socketReducer,
  newsFeed: newsFeedReducer,
  mediaLibrary: mediaLibraryReducer,
  pages: pagesReducer,
  groups: groupsReducer,
  article: articleReducer,
  notifications: notificationReducer,
  articlePages: articlePagesReducer,
  staticContent: staticContentReducer,
  subscription: subscriptionSliceReducer,
  dashboard: dashboardReducer,
  myAccount: myAccountReducer,
  cart: cartReducer,
  messages: messagesReducer,
  landingPage: landingPageReducer,
  mygiftcard: mygiftcardReducer,
  collection: collectionReducer,
  wishlist: wishlistReducer,
})
const rootReducer = (state, action) => {
  if (action.type === 'auth/reset') {
    // eslint-disable-next-line no-param-reassign
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer

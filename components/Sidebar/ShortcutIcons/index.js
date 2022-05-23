import React, { useState, useEffect }  from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { FaEnvelope }  from 'react-icons/fa'
import { IoIosCart } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { BiChevronDown } from 'react-icons/bi'
import { FaUsers }  from 'react-icons/fa'
import { FaComments }  from 'react-icons/fa'
import { FaUser }  from 'react-icons/fa'
import { AiFillGift } from 'react-icons/ai'
import { useTranslation } from 'next-i18next'
import { FaHome } from 'react-icons/fa'
import SimpleMenu from '../SubMenu'
import { notifySuccess, setReRenderLandingPage } from '../../../modules/profile/myProfileSlice'
import { disconnectSocket } from '../../../modules/socket/socketSlice'
import { isLoginToken, onLogout } from '../../../utilities/authUtils'
import CreatePage from '../../CreatePage'

import {
  reset
} from '../../../modules/auth/authSlice'

import { createImageUrl } from '../../../utilities/imageUtils'
import { useDispatch, useSelector } from 'react-redux'
import { userPages } from '../../../modules/newsFeed/newsFeedSlice'
import CartContainer from '../CartContainer'
import NotificationMenu from '../NotificationMenu'
import { getUnreadNotificationsCount, incrementCount } from '../../../modules/notifications/notificationSlice'
import { getCartDetails } from '../../../modules/cart/cartSlice'
import {
  incrementMessageCount,
  getUnreadConversationsCount
} from '../../../modules/messages/messagesSlice'

import SidebarModal from '../SidebarModal'





const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  span {
    color: #fff !important;
  }
  svg {
    font-size: 20px;
    margin-bottom: 3px;
  }
  span svg {
    font-size: 10px;
    margin-top: 3px;
    margin-bottom: 0;
  }
  img {
    width: 25px;
    height: 27px;
  }
  margin-bottom: 10px;
  .page-profile {
    position: relative;
    right: 75px;
  }
`
const IconWarp = styled.div`
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  justify-content: flex-start;
  width: 75px;
  margin-bottom: 20px;
  position: relative;
  @media ( max-width: 767px ){
    &.mobHide {
      display: none ;
    }
  }
  .red-badge-cart {
    background-color: #ff0000;
    color: #fff;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 10px;
    min-height: 10px;
    line-height: 15px;
    position: absolute;
    top: 0;
    right: -14px;
    width: 15px;
    height: 15px;
    font-family: 'Montserrat-Medium';
    @media (max-width: 991px) {
      font-size: 9px;
      min-width: 10px;
      min-height: 10px;
      padding: 2px;
      line-height: 9px;
      top: 0px;
      right: -12px;
    }
    @media (max-width: 767px) {
      font-size: 7px;
      min-width: 4px;
      min-height: 4px;
      padding: 2px;
      line-height: 8px;
      top: -3px;
      right: -6px;
      width: 12px;
      height: 12px;
    }
  }
  .red-badge {
    background-color: #ff0000;
    color: #fff;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 10px;
    min-height: 10px;
    line-height: 15px;
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 15px;
    font-family: 'Montserrat-Medium';
    &.message {
      top: -11px;
      right: -4px;
      @media (max-width: 991px) {
        top: -4px;
      }
    }
    @media (max-width: 991px) {
      font-size: 9px;
      min-width: 10px;
      min-height: 10px;
      padding: 2px;
      line-height: 9px;
      top: 0px;
      right: 10px;
    }
    @media (max-width: 767px) {
      font-size: 7px;
      min-width: 4px;
      min-height: 4px;
      padding: 2px;
      line-height: 8px;
      top: -3px;
      right: -6px;
      width: 12px;
      height: 12px;
    }
  }
`
const SellArtBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  justify-content: center;
  width: 70px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  height: 30px ;
`


function ShortcutIcons({ loggedInUserRole }) {

  const dispatch = useDispatch()

  const { t } = useTranslation(['translation', 'sidebar', 'giftcard'])
  const router = useRouter()
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  const userProfileName = userInfo && JSON.parse(userInfo).personalFirstName
  const socketObj = useSelector((state) => state.root.socket.socketObj)
  const unreadCount = useSelector((state) => state.root.notifications.unreadCount)
  const { cart, cartId } = useSelector((state) => state.root.cart)
  const authUserDetails = useSelector((state) => state.root.myProfile.authUserDetails)
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const unreadConversationsCount = useSelector((state) => state.root.messages.unreadConversationsCount)
  const pathname = router.pathname
  const [ userPageTitle, setUserPageTitle ] = useState('') ;
  useEffect( () => {
    if ( loggedInAccountType !== 'personal'){
      const pageTitle = localStorage.getItem('active_page') ;
      setUserPageTitle(pageTitle);
    } else {
      localStorage.removeItem('active_page') ;
    }
  }, [loggedInAccountType])
  
  const [showNotificationPopup, setNotificationPopup] = useState(false)
  const [showCartPopup, setCartPopup] = useState(false)
  const [showSubMenu, setSubMenu] = useState(false)
  const [showCreatePage, setCreatePage] = useState(false)


  useEffect(() => {
    if (isLoginToken()) {
      if (socketObj) {
        socketObj.on('newNotificationAdded', function () {
          dispatch(incrementCount())
        })
      }
    }
  }, [socketObj, dispatch])
  /**
   * Listen to newMessageReceived socket event and on receiving it will increase the messages count...
   */
  useEffect(() => {
    if (isLoginToken()) {
      if (socketObj) {
        socketObj.on('newMessageReceived', function (payload) {
          if (!pathname.includes('messages')) dispatch(incrementMessageCount(payload))
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketObj, dispatch])

  useEffect(() => {
    if (isLoginToken()) {
      /**fetch userPages (for pages listing) */
      // if (loggedInUsername) {
      //   dispatch(userPages(loggedInUsername, 'forLoggedInUser'))
      // }
      /**fetch unread notifications, on login */
      dispatch(getUnreadNotificationsCount())
      // dispatch(getUnreadConversationsCount())
      dispatch(getCartDetails())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const redirectHome = () => {
    router.push(`/user/${loggedInUsername}/activity`)
  }
  const redirectMessages = () => {
    router.push(`/messages`)
  }
  const redirectGroups = () => {
    router.push(`/groups`)
  }
  const redirectConnections = () => {
    router.push(`/user/${loggedInUsername}/connections`)
  }
  const redirectMyArticles = () => {
    router.push(`/myarticles`)
  }
  const redirectMyDashboard = () => {
    router.push(`/dashboard`)
  }
  const redirectMyArtworks = () => {
    router.push(`/myartworks`) ;
  }
  const redirectArtworks = () => {
    router.push(`/artworks`)
  }
  const redirectSubscriptions = () => {
    router.push(`/subscriptions`)
  }
  const handleProfileClick = () => {
    setSubMenu(false)
    router.push(`/user/${loggedInUsername}`)
  }
  const handleMyAccountClick = () => {
    setSubMenu(false)
    router.push(`/myaccount`)
  }
  const handleLogout = () => {
    dispatch(disconnectSocket())
    localStorage.setItem('isUserActive', false)
    setSubMenu(false)
    notifySuccess(t(`successResponses:auth.signOutMessage`))
    dispatch(reset())
    if (pathname === '/') {
      dispatch(setReRenderLandingPage(true))
    }
    onLogout()
  }
  return (
    <IconContainer>
      <IconWarp className="mobHide" onClick={redirectHome}>
        <FaHome />
        <span>{t(`sidebar:home`)}</span>
      </IconWarp>
      <IconWarp onClick={redirectGroups}>
        <FaComments />
        <span>Groups</span>
      </IconWarp>
      { loggedInAccountType === 'personal' && (<IconWarp onClick={redirectConnections}>
        <FaUsers />
        <span>Network</span>
      </IconWarp>)}
      <IconWarp onClick={redirectMyArticles}>
      <svg stroke="currentColor" fill="currentColor" width="1em" height="1em" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M532 1108l152 152-52 52h-56v-96h-96v-56zm414-390q14 13-3 30l-291 291q-17 17-30 3-14-13 3-30l291-291q17-17 30-3zm-274 690l544-544-288-288-544 544v288h288zm608-608l92-92q28-28 28-68t-28-68l-152-152q-28-28-68-28t-68 28l-92 92zm384-384v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
        <span>Articles</span>
      </IconWarp>
      {
        isLoginToken() && hasActivePlan &&
          <IconWarp onClick={redirectMyDashboard} >
          <img src='/assets/dashboard.svg' alt="Dashboard" />
            <span>Dashboard</span>
          </IconWarp>
      }
      <IconWarp className="mobHide" onClick={redirectMessages}>
          {unreadConversationsCount > 0 ? (
                <span className="red-badge message">{unreadConversationsCount}</span>
              ) : null}
        <FaEnvelope />
        <span>{t(`sidebar:messages`)}</span>
      </IconWarp>
      <IconWarp className="mobHide"  onClick={() => setNotificationPopup(true)}>
        {unreadCount > 0 ? <span className="red-badge">{unreadCount}</span> : null}
        <IoNotifications />
        <span>Notifications</span>
      </IconWarp>
      {showNotificationPopup && (
          <SidebarModal
            isOpen={showNotificationPopup}
            closeModal={() => setNotificationPopup(false)}
            closeOnOutsideClick={true}
            >
            {<NotificationMenu />}
          </SidebarModal>
        )}
      {loggedInAccountType === 'personal' && (<IconWarp className="mobHide"  onClick={() => setCartPopup(true)}>
        {cart && cart.length > 0 ? <span className="red-badge-cart">{cart.length}</span> : null}
        <IoIosCart />
        <span>Cart</span>
      </IconWarp>)}
      {showCartPopup && (
          <SidebarModal
            isOpen={showCartPopup}
            closeModal={() => setCartPopup(false)}
            closeOnOutsideClick={true}
            >
            {<CartContainer />}
          </SidebarModal>
        )}
      <IconWarp className="mobHide" onClick={() => setSubMenu(true)}>
        {
          (authUserDetails && authUserDetails.profilePicUrl) ?
          <img
            className="UserImgNav"
            src={
              authUserDetails.profilePicUrl
                ? createImageUrl(authUserDetails.profilePicUrl) + '?' + new Date(authUserDetails.dateUpdated).getTime()
                : ''
            }
            alt="UserImg"
          />
          :
          <FaUser/>
        }
        <span>  {
                loggedInAccountType === 'personal' ?
                userProfileName ? userProfileName.substring(0,6) : t(`header:loginMenu.me`) :
                userPageTitle ? userPageTitle.substring(0,6) : t(`header:loginMenu.me`)
              }<BiChevronDown /></span>
      </IconWarp>
      {showSubMenu && (
        <SidebarModal
          isOpen={showSubMenu}
          closeModal={() => setSubMenu(false)}
          closeOnOutsideClick={true}>
          <SimpleMenu
            loggedInUserRole={loggedInUserRole}
            handleCreatePageClick={() => setCreatePage(true)}
            handleProfileClick={handleProfileClick}
            handleMyAccountClick={handleMyAccountClick} 
            handleLogout={handleLogout} 
            closeMeMenu={() => setSubMenu(false)}  />
        </SidebarModal>
      )}
      {showCreatePage && (
        <SidebarModal
          isOpen={showCreatePage}
          closeModal={() => setCreatePage(true)}
          closeOnOutsideClick={true}>
          <CreatePage  modalState={showCreatePage} closeModal={() => setCreatePage(false)}/>
        </SidebarModal>
      )}
      <IconWarp onClick={() => router.push('/giftcard')}>
        <AiFillGift />
        <span>{t(`giftcard:title`)}</span>
      </IconWarp>
      {!hasActivePlan && loggedInAccountType === 'personal' && (
        <SellArtBtn onClick={redirectSubscriptions}>
          <span>{t(`sidebar:sellArt`)}</span>
        </SellArtBtn>
      )}
    </IconContainer>
  )
}

export default ShortcutIcons

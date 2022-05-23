import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import Logo from '../Logo'
import HeaderSearch from '../HeaderSearch/index'
import Sidebar from '../Sidebar'
import ForgotPasswordModal from '../ForgotPasswordModal'
import SignupModal from '../SignupModal'
import SigninModal from '../SigninModal'
import ConfirmModal from '../ConfirmForm'
import LegacyUserWelcomePopup from '../LegacyUserWelcomePopup'
import ResetMailPopup from '../ResetMailPopup'
import SocialSignupModal from '../SocialSignupModal'
import CreatePage from '../CreatePage'
import { isLoginToken, onLogout } from '../../utilities/authUtils'

import {
  setSignupPopup,
  setConfirmEmailPopup,
  setLoginPopup,
  setForgetPassPopup,
  setSocialSignupPopup,
  setResetEmailPopup,
  reset,
  setUsernameValidFormError,
  setEmailValidFormError,
  setOpenSnoozePopup,
  closeAllModals,
  setSignupError,
  setSocialUserError,
  setStartSnoozeTimer,
  setPageLinkPopup,
  setPageInfoBubble,
  setLegacyWelcomeMsgPopup,
} from '../../modules/auth/authSlice'
import { setAddPageError } from '../../modules/pages/pagesSlice'
import ModalComponent from '../UI/Modal'
import {
  notifySuccess,
  setReRenderLandingPage,
  setAuthUserDetails,
  getUserDataResponse,
  getUserData,
} from '../../modules/profile/myProfileSlice'
import { disconnectSocket } from '../../modules/socket/socketSlice'
import { setUnreadCount } from '../../modules/notifications/notificationSlice'
import ConfirmBox from '../UI/ConfirmBox'
import { deleteFromCart, deleteFromLocalCart } from '../../modules/cart/cartSlice'
import { setCallResetFilter } from '../../modules/subscription/subscriptionSlice'
import LegacyPageLink from '../LegacyPageLink'
import Chatpopup from '../ChatPopup'
import { setMessageState } from '../../modules/messages/messagesSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { setCurrencyObj } from '../../modules/landingPage/landingPageSlice'
import NavigationLogout from './NavigationLogout'
import NavigationLoginMenu from './NavigationLoginMenu'
import { useRouter } from 'next/router'

const HeaderWrapper = styled.div`
  margin: 0;
  padding: 9px 0;
  width: 100%;
  background: #000;
  position: fixed;
  z-index: 9;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  iframe {
    display: none;
  }
  // position: -webkit-sticky;
  // position: sticky;
  // top: 0;
`
const InnerContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  @media (min-width: 1280px) and (max-width: 1500px) {
    max-width: 1290px;
  }
  @media (min-width: 1153px) and (max-width: 1280px) {
    width: 1176px;
  }
  @media (min-width: 1025px) and (max-width: 1152px) {
    width: 1094px;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
  @media (max-width: 767px) {
    padding: 0 10px;
  }
`
const LeftHeaderCon = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
`

/**
 * @category components
 * @description Header component
 */
const Header = () => {
  const { t } = useTranslation(['successResponses', 'header'])

  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = router.pathname
  // const { pathname } = useLocation()

  const loggedIn = useSelector((state) => state.root.auth.loggedIn)
  const openLoginPopup = useSelector((state) => state.root.auth.openLoginPopup)
  const openPageLinkPopup = useSelector((state) => state.root.auth.openPageLinkPopup)
  const chatPopup = useSelector((state) => state.root.messages.chatPopup)
  const openSignupPopup = useSelector((state) => state.root.auth.openSignupPopup)
  const openSnoozePopup = useSelector((state) => state.root.auth.openSnoozePopup)
  const startSnoozeTimer = useSelector((state) => state.root.auth.startSnoozeTimer)
  const openConfirmEmailPopup = useSelector((state) => state.root.auth.openConfirmEmailPopup)
  const openLoginConfirmEmailPopup = useSelector((state) => state.root.auth.openLoginConfirmPopup)
  const openLegacyWelcomeMsgPopup = useSelector((state) => state.root.auth.openLegacyWelcomeMsgPopup)
  const openForgetPassPopup = useSelector((state) => state.root.auth.openForgetPassPopup)
  const openSocialSignupPopup = useSelector((state) => state.root.auth.openSocialSignupPopup)
  const openResetEmailPopup = useSelector((state) => state.root.auth.openResetEmailPopup)
  const authUserDetails = useSelector((state) => state.root.myProfile.authUserDetails)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const cartPopupStatus = useSelector((state) => state.root.subscription.cartPopupStatus)

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [subMenu, setSubMenu] = useState(false)
  const [cartContainer, setCartContainer] = useState(false)
  const [showCreatePagePopup, setCreatePagePopup] = useState(false)
  const [notiMenu, setNotiMenu] = useState(false)
  const [showFrame, setShowFrame] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(false)

  const subMenuRef = useRef(null)
  const notiRef = useRef(null)
  const cartRef = useRef(null)
  const deleteRef = useRef(null)

  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)
  const [alreadySnooze, setAlreadySnooze] = useState(null)
  const alreadySnoozeValue = alreadySnooze && JSON.parse(alreadySnooze)
  const params = router.query

  const snoozePopupInterval = 60000
  const pagesListToSkipSnooze = [
    '/',
    '/what-is-artmo',
    '/about',
    '/genres',
    '/privacy-policy',
    '/login',
    '/vendor-terms-conditions',
    '/members-terms-conditions',
    'password-reset',
    '/drawing-tips-5-tips-to-improve-your-drawings-today',
    '/maintenance',
    '/looking-to-sell-your-art-online-5-tips-to-help-you-increase-your-digital-sales',
    '/types-of-art',
    '/how-to-price-your-art',
    '/how-to-make-money-as-an-artist',
    '/retrieve-username',
    '/how-to-make-prints-of-your-art-a-beginners-guide',
    '/make-your-merchandise-5-tips-to-create-and-sell',
    '/sell-digital-art-with-nft',
    '/artworks',
    '/artworks/[artworkSlug]',
    '/user-terms-conditions',
    '/reset-password',
    'giftcard',
    'mygiftcard',
    '/signup-ref',
    '/404'
  ]

  useEffect(() => {
    (async  () => {
      if ( isLoginToken() && loggedInUsername ) {
        const res = await getUserDataResponse(loggedInUsername, 'fetchData', t)
        if (res && res.data) {
          setLoggedInUser(res.data.data.userDetails)
        }
      }
    })();
  }, [dispatch, loggedInUsername])


  useEffect(() => {
    /**get user details on page render */
    if ( isLoginToken() ) {
      if (router.pathname !== '/user/[username]') {
        if (
          loggedInUsername &&
          (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername))  )
          dispatch(getUserData(loggedInUsername, 'fetchData', t))
      } 
      else  {
        if ( router.query.username !== 'undefined' ) {
          if ( loggedInUsername === router.query.username &&
            (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername))   ) {
            dispatch(getUserData(loggedInUsername, 'fetchData', t))
          } else {
            if(loggedInUsername) dispatch(getUserData(loggedInUsername, 'fetchData', t))
            if(router.query.username) dispatch(getUserData(router.query.username , 'fetchData', t))
          }
        }
      }
    }
  }, [dispatch, loggedInUsername])

  /** set locale for i18n on page load */
  useEffect(() => {
    const val = localStorage.getItem('appLanguageCode')
    if (val && val !== 'en') {
      router.replace(router.asPath, router.asPath, { locale: val })
    }
  }, [])

  useEffect(() => {
    const val = localStorage.getItem('currencyInfo')
    // usestate for local storage
    setCurrencyInfo(val)

    if (val && !isEmptyObj(val)) {
      const lc = val && JSON.parse(val)
      if (!isEmptyObj(lc) && lc.currency && lc.conversionRate) {
        const obj = {
          currency: lc.currency,
          conversionRate: lc.conversionRate,
        }
        dispatch(setCurrencyObj(obj))
      }
    } else {
      const obj = {
        currency: 'EUR',
        conversionRate: 1,
      }
      localStorage.setItem('currencyInfo', JSON.stringify(obj))
      dispatch(setCurrencyObj(obj))
    }
  }, [])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  })

  /** To close menus on route change  */
  useEffect(() => {
    setIsSideMenuOpen(false)
    setSubMenu(false)
    setNotiMenu(false)
    setCartContainer(false)
  }, [pathname, router.query])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSubMenu(false)
    })
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleCartOutside)
    return () => {
      document.removeEventListener('mousedown', handleCartOutside)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [])

  /** Effect to trigger signup popup every 2 min in logged out state and after snooze */
  useEffect(() => {
    let interval

    if (
      !isLoginToken() &&
      !loggedIn &&
      !openLoginPopup &&
      !openSignupPopup &&
      !pagesListToSkipSnooze.includes(router.pathname)
    ) {
      interval = setInterval(() => {
        if (
          !isLoginToken() &&
          !loggedIn &&
          !openLoginPopup &&
          !openSignupPopup &&
          !pagesListToSkipSnooze.includes(router.pathname) &&
          startSnoozeTimer
        ) {
          dispatch(closeAllModals())
          dispatch(setUsernameValidFormError(null))
          dispatch(setEmailValidFormError(null))
          dispatch(setSignupError(null))
          dispatch(setSocialUserError(null))
          dispatch(setStartSnoozeTimer(false))
          dispatch(setOpenSnoozePopup(true))
        }
      }, snoozePopupInterval)
    }

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, openLoginPopup, openSignupPopup, startSnoozeTimer, router.isReady, router.pathname])

  /** To open cart menu on mangento error redirect */
  useEffect(() => {
    if (cartPopupStatus) {
      setCartContainer(true)
    }
  }, [cartPopupStatus, dispatch])

  /** To open popup */
  useEffect(() => {
    if (params.referralCode && !params.new_registration) {
      dispatch(setSignupPopup(true))
      localStorage.setItem('referralCode', params.referralCode)
    }
  }, [params, dispatch])

  const handleSnooze = () => {
    dispatch(setStartSnoozeTimer(true))
    dispatch(setOpenSnoozePopup(false))
  }

  const closeLogin = () => {
    dispatch(setLoginPopup(false))
    handleSnooze()
  }

  const closePageLinkPopup = () => {
    dispatch(setPageLinkPopup(false))
  }
  const closeChatPopup = () => {
    dispatch(setMessageState({ key: 'chatPopup', value: false }))
  }

  const closeSignup = () => {
    dispatch(setSignupPopup(false))
    handleSnooze()
  }

  const closeSnooze = () => {
    dispatch(setOpenSnoozePopup(false))
  }

  const closeConfirmEmail = () => {
    dispatch(setConfirmEmailPopup(false))
  }

  const closeLegacyWelcomeMessagePopup = () => {
    dispatch(setLegacyWelcomeMsgPopup(false))
  }

  const closeForgotPass = () => {
    dispatch(setForgetPassPopup(false))
  }

  const closeSocialSignup = () => {
    dispatch(setSocialSignupPopup(false))
  }

  const closeResetEmailPopup = () => {
    dispatch(setResetEmailPopup(false))
  }

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen)
  }

  const closeSideMenu = () => {
    setIsSideMenuOpen(false)
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
    notifySuccess(t(`auth.signOutMessage`))
    dispatch(reset())
    if (router.pathname === '/') {
      dispatch(setReRenderLandingPage(true))
    }
    onLogout()
  }

  const handleClickOutside = (event) => {
    if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
      setSubMenu(false)
    }
  }
  const handleOutside = (event) => {
    if (notiRef.current && !notiRef.current.contains(event.target)) {
      setNotiMenu(false)
    }
  }
  const handleCartOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setCartContainer(false)
    }
  }
  const removeItem = async (e) => {
    e.stopPropagation()
    if (isLoginToken()) {
      const resultAction = await dispatch(deleteFromCart({ artworkId: deleteId, t: t }))
      const response = unwrapResult(resultAction)
      if (response && response.data.success) {
        setConfirmDelete(false)
        setCartContainer(true)
      }
      return
    }
    dispatch(deleteFromLocalCart({ artworkId: deleteId }))
    setConfirmDelete(false)
    setCartContainer(true)
  }
  const deleteItem = (id, e) => {
    e.stopPropagation()
    setCartContainer(false)
    setConfirmDelete(true)
    setDeleteId(id)
  }
  const toggleSubMenu = (e) => {
    e.preventDefault()
    setNotiMenu(false)
    setCartContainer(false)
    setSubMenu(!subMenu)
    dispatch(setPageInfoBubble(false))
  }

  const openSubMenu = (e) => {
    e.preventDefault()
    setNotiMenu(false)
    if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth > 1024) {
      setSubMenu(true)
    }
  }

  const redirectToConnectionsPage = () => {
    router.push(`/user/${loggedInUsername}/connections`)
  }

  const redirectHandler = (route) => {
    if (route === '/artworks') dispatch(setCallResetFilter(true))
    router.push(route)
  }

  const redirectToNewsFeedPage = () => {
    router.push(`/user/${loggedInUsername}/activity`)
    if (typeof window !== 'undefined')
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }
  const redirectToUserProfilePage = () => {
    router.push(`/user/${loggedInUsername}`)
    window.scroll({
      top: 0,
      left: 0,
      //behavior: 'smooth',
    })
    if (window.innerWidth && window.innerWidth < 1025) {
      setTimeout(() => {
        setSubMenu(true)
      }, 500)
    }
  }

  const toggleNotiMenu = (e) => {
    e.preventDefault()
    setSubMenu(false)
    setCartContainer(false)
    if (!notiMenu) dispatch(setUnreadCount())
    setNotiMenu(!notiMenu)
  }
  const toggleCartContainer = (e) => {
    e.preventDefault()
    setSubMenu(false)
    setNotiMenu(false)
    setCartContainer(!cartContainer)
  }

  const openNotiMenu = (e) => {
    e.preventDefault()
    setSubMenu(false)
    if (!notiMenu) dispatch(setUnreadCount())
    if (typeof window !== 'undefined' && window.innerWidth && window.innerWidth > 768) {
      setNotiMenu(true)
    }
  }

  const handleCreatePageClick = () => {
    setSubMenu(false)
    setCreatePagePopup(true)
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setAddPageError(null))
  }

  const handleInviteFriendsClick = () => {
    setSubMenu(false)
    router.push(`/invite`)
  }

  const handleReferralsClick = () => {
    setSubMenu(false)
    router.push(`/referrals`)
  }

  const frameOnLoad = () => {
    setShowFrame(false)
  }

  useEffect(() => {
    setAlreadySnooze(localStorage.getItem('snoozed_popup'))
  })
  return (
    t(`header:cart.buttonYes`) !== 'header:cart.buttonYes' && (
      <>
        {showCreatePagePopup && (
          <ModalComponent
            closeOnOutsideClick={true}
            isOpen={showCreatePagePopup}
            closeModal={() => setCreatePagePopup(false)}
          >
            <CreatePage modalState={showCreatePagePopup} closeModal={() => setCreatePagePopup(false)} />
          </ModalComponent>
        )}
        {openForgetPassPopup ? <ForgotPasswordModal open={openForgetPassPopup} closeOpen={closeForgotPass} /> : null}
        {openSignupPopup ? <SignupModal open={openSignupPopup} closeModal={closeSignup} /> : null}
        {openSnoozePopup ? <SignupModal open={openSnoozePopup} closeModal={closeSnooze} snooze /> : null}
        {openLoginPopup ? <SigninModal alreadySnoozeValue={alreadySnoozeValue} open={openLoginPopup} closeModal={closeLogin} /> : null}
        {openPageLinkPopup ? <LegacyPageLink open={openPageLinkPopup} closeModal={closePageLinkPopup} /> : null}
        {chatPopup ? <Chatpopup open={chatPopup} closeModal={closeChatPopup} /> : null}
        {openConfirmEmailPopup ? <ConfirmModal open={openConfirmEmailPopup} loginPopup={openLoginConfirmEmailPopup} closeModal={closeConfirmEmail} /> : null}
        {openLegacyWelcomeMsgPopup ? (
          <LegacyUserWelcomePopup open={openLegacyWelcomeMsgPopup} closeModal={closeLegacyWelcomeMessagePopup} />
        ) : null}
        {openResetEmailPopup ? <ResetMailPopup open={openResetEmailPopup} closeModal={closeResetEmailPopup} /> : null}
        {openSocialSignupPopup ? (
          <SocialSignupModal open={openSocialSignupPopup} closeModal={closeSocialSignup} />
        ) : null}
        {isSideMenuOpen ? (
          <Sidebar loggedInUserRole={loggedInUser && loggedInUser.userRole} closeSideMenu={closeSideMenu} isOpen={isSideMenuOpen} path={router && router.pathname} />
        ) : null}
        <HeaderWrapper>
          {showFrame && <iframe onLoad={frameOnLoad} src={process.env.NEXT_PUBLIC_REACT_APP_MAGENTO_LOGOUT}></iframe>}
          <InnerContainer>
            <LeftHeaderCon>
              <Logo />
              <HeaderSearch />
            </LeftHeaderCon>
            {loggedIn ? (
              <NavigationLoginMenu
                setShowFrame={setShowFrame}
                deleteItem={deleteItem}
                toggleSideMenu={toggleSideMenu}
                handleProfileClick={handleProfileClick}
                handleMyAccountClick={handleMyAccountClick}
                handleCreatePageClick={handleCreatePageClick}
                handleInviteFriendsClick={handleInviteFriendsClick}
                handleReferralsClick={handleReferralsClick}
                handleLogout={handleLogout}
                subMenu={subMenu}
                toggleSubMenu={toggleSubMenu}
                refProp={subMenuRef}
                openSubMenu={openSubMenu}
                loggedInUserRole={loggedInUser && loggedInUser.userRole}
                userProfilePic={authUserDetails && authUserDetails.profilePicUrl}
                userDateUpdated={authUserDetails && authUserDetails.dateUpdated}
                redirectToConnectionsPage={redirectToConnectionsPage}
                redirectToNewsFeedPage={redirectToNewsFeedPage}
                path={router && router.pathname}
                closeMeMenu={() => setSubMenu(false)}
                notiMenu={notiMenu}
                cartRef={cartRef}
                cartContainer={cartContainer}
                toggleCartContainer={toggleCartContainer}
                toggleNotiMenu={toggleNotiMenu}
                notiRef={notiRef}
                openNotiMenu={openNotiMenu}
                loggedInAccountType={loggedInAccountType}
                loggedInUsername={loggedInUsername}
                redirectHandler={redirectHandler}
                hasActivePlan={hasActivePlan}
                redirectToUserProfilePage={redirectToUserProfilePage}
                isSideMenuOpen={isSideMenuOpen}
                setNotiMenu={setNotiMenu}
              />
            ) : (
              <NavigationLogout
                deleteItem={deleteItem}
                cartRef={cartRef}
                closeCartContainer={() => setCartContainer(false)}
                cartContainer={cartContainer}
                toggleCartContainer={toggleCartContainer}
                toggleSideMenu={toggleSideMenu}
                isSideMenuOpen={isSideMenuOpen}
              />
            )}
          </InnerContainer>
        </HeaderWrapper>
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={confirmDelete}
          closeModal={(e) => {
            e.stopPropagation()
            setConfirmDelete(false)
          }}
        >
          <ConfirmBox
            cartRef={cartRef}
            deleteRef={deleteRef}
            open={confirmDelete}
            closeModal={(e) => {
              e.stopPropagation()
              setConfirmDelete(false)
            }}
            deleteHandler={removeItem}
            confirmButtonText={t(`header:cart.buttonYes`)}
            heading={t(`header:cart.removeWarning`)}
          />
        </ModalComponent>
        <div className="top-margin"></div>
      </>
    )
  )
}

export default Header

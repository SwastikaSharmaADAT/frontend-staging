import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CgMenuGridR } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoHomeSharp } from 'react-icons/io5'
import { IoIosCart } from 'react-icons/io'
import { IoCloseOutline } from 'react-icons/io5'
import { IoNotifications } from 'react-icons/io5'
import { BiChevronDown } from 'react-icons/bi'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { FaEnvelope }  from 'react-icons/fa'
import { FaUsers }  from 'react-icons/fa'
import { FaComments }  from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import arrowImage from '../../../public/assets/black-polygon.png'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import { isLoginToken } from '../../../utilities/authUtils'
import SimpleMenu from '../SubMenu'
import { userPages } from '../../../modules/newsFeed/newsFeedSlice'
import NotificationMenu from '../NotificationMenu'
import { getUnreadNotificationsCount, incrementCount } from '../../../modules/notifications/notificationSlice'
import { getCartDetails, cartCheckout } from '../../../modules/cart/cartSlice'
import {
  incrementMessageCount,
  getUnreadConversationsCount,
  clearConversationsUnreadCount,
} from '../../../modules/messages/messagesSlice'
import {
  closeAllModals,
  setLoginError,
  setLoginPopup,
  setSocialSignupError,
  toggleLoading,
} from '../../../modules/auth/authSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import CartContainer from '../CartContainer'
import Tooltip from '../Tooltip'
import { useRouter } from 'next/router'
import {DashboardIcon} from '../../../public/assets/dashboard.svg'


const NavUl = styled.div`
  font-weight: 400;
  margin: 0px;
  padding: 0;
  color: #fff;
  font-size: 12px;
  line-height: 12px;
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: center;
      padding: 0;
      position: relative;
      &.moreBtn{
        .more-smal {
          font-size: 12px;
          margin-left: 2px;
          vertical-align: middle;     
        }
        &.sellArt {
          border: 1px solid #ccc;
          padding: 0 4px;
          &.mobile-hide {
            cursor: pointer;
          }
        }
      }
      
      &:after {
        content: "";
        position: absolute;
        bottom: -9px;
        left: 0;
        width: 100%;
        background: transparent;
        height: 3px;
        transition: all 0.2s ease-in-out;
      }
      @media (min-width: 1130px) {
        min-width: 80px;
        box-sizing: border-box;
        margin: 0px;
        transition: all 0.2s ease-in-out;
      }
      &:hover:after {
        background: #fff;
      }
      @media (max-width: 1199px) {
        padding: 0 15px;
      }
      @media (max-width: 991px) {
        padding: 0 8px;
      }
      @media (max-width: 767px) {
        padding: 0 10px;
        justify-content: center;
      }
      @media (max-width: 479px) {
        padding: 0 8px;
        justify-content: center;
      }
      &.activeIcon:after {
        //@media (min-width: 768px) {
          background: #fff;
        //}
      }
      .UserImgNav {
        border-radius: 0% !important ;
        border: 1px solid #ccc;
        &.mob-big{
          width: auto;
          height: 24px;
          max-width: 24px;
        }
        @media (min-width: 768px) {
          width: 24px;
          height: 24px;
        }
      }
      &.mobile-hide {
        @media (max-width: 1024px) {
          display: none;
        }
      }
      a {
        color: #fff;
        font-size: 12px;
        line-height: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        cursor: pointer;

        position: relative;
        .red-badge-cart {
          background-color: #ff0000;
          &.grey-bg {
            background-color: #bab8b8; 
          }
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
          right: 20px;
          width: 15px;
          height: 15px;
          font-family: 'Montserrat-Medium';
          &.empty {
            background: #444;
          }
          @media (min-width: 991px) and (max-width: 1024px) {
            right: -9px;
          }
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
          line-height: 11px;
          position: absolute;
          top: 0;
          right: 22px;
          width: 15px;
          height: 15px;
          font-family: 'Montserrat-Medium';
          @media (min-width: 991px) and (max-width: 1024px) {
            right: -1px;
          }
          &.message {
            top: 0px;
            right: 18px;
            @media (min-width: 991px) and (max-width: 1024px) {
              right: -1px;
            }
            @media (max-width: 991px) {
              top: -3px;
              right: -6px !important;
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
        img {
          margin: 1px 0 1px;
          max-width: 31px;
          border-radius: 50%;
          @media (max-width: 991px) {
            max-width: 24px;
          }
          @media (max-width: 767px) {
            max-width: 18px;
          }
          @media (max-width: 479px) {
            max-width: 16px;
          }
        }
        svg {
          font-size: 26px;
          &.sml-svg {
            font-size: 24px;
          }
          @media (max-width: 991px) {
            font-size: 24px;
            &.sml-svg {
              font-size: 22px;
            }
          }
          @media (max-width: 767px) {
            font-size: 26px;
            &.sml-svg {
              font-size: 24px;
            }
          }
        }
        .menu-title {
          margin: 4px 0 0;
          display: flex;
          @media (max-width: 767px) {
            display: none;
            
          }
        }
        div {
          @media (max-width: 767px) { 
            &.sub-menu{
              display: block !important ;
              top: -52px !important;
              right: 20px; 
              .header-sub-menu {
                &:before{
                  left: 95px !important;
                }
              }
            } 
          }
        }
        span {
          font-size: 16px;
          line-height: 19px;
          font-family: 'Montserrat-Regular';
          font-weight: 100;
          @media (max-width: 991px) {
            font-size: 14px;
          }
          @media (max-width: 767px) {
            font-size: 12px;
          }
        }
      }
      :last-child {
        justify-content: center;
      }
      &.userdropdown {
          display: block !important;
          &.mobile-show{ display:none !important; }
          &.mobile-hide {
            display:block !important ;
          }
          a > svg {
            margin: 2px 0;
          }
          .as-none {
            display: none ;
            background: transparent !important;
            border: none !important ;
            padding-top: 20px;
            @media( max-width: 1024px ){
              padding-top: 10px;
              margin-right: 10px;
            }
          }
          &.mobile-hide:hover .as-none {
            display: block !important ;
            left: -53px;
            top:35px;
          }
          @media ( max-width: 1024px ){
            margin: 0px ;
            &.mobile-show {
              display: block !important ;
            }
            &.mobile-hide {
              display:none !important ;
            }
          }
        .user-profile {
          font-size: 23px;
        }
        svg {
          font-size: 12px;
          margin-left: 2px;
        }
        div {
          display: flex;
          justify-content: center;
          &.menu-title{
            @media (max-width: 767px) {
              display: none;
            }
          }
        }
        .sub-menu {
          position: relative;
          top: -42px;
        }
        .header-sub-menu {
          border: 1px solid #ccc;
          background-color: #222;
          
          @media (max-width: 1024px) {
            display: block !important;
            top: 50px;
            right: -40px;
          }
          :before {
            background: url(${arrowImage}) no-repeat top center;
          }
          .list-item {
            color:#fff;
            border-bottom: 0;
            &:hover{
              color: #666 ;
              .page-title {
                color: #666;
              }
            }
          }
          .list-ul,
          .list-item {
            @media (max-width: 767px) {
              display: flex !important;
            }
            &.page-list {
              @media (max-width: 767px) {
                display: flex !important;
              }
            }
          }
          &.subscription {
            @media (max-width: 767px) {
              right: -30px !important;
            }
            :before {
              @media (max-width: 767px) {
                left: 144px !important;
              }
              @media( min-width: 767px) and (max-width: 1024px){
                left: 68px !important ;
              }
            }
          }
          &.user_page {
            top: 35px !important;
            left: -170px;
            :before {
              left: 165px !important;
              @media( min-width: 768px ) and ( max-width:1024px){
                left: 70px !important;
              }
            }

          }
          
        }
      }
    }
  }
`

const NavigationLoginMenu = (props) => {
  const { t } = useTranslation(['header',''])

  const dispatch = useDispatch()
  const router = useRouter()

  const [userInfo, setUserInfp] = useState(null)
  const accountType = userInfo && JSON.parse(userInfo).accountType
  const userProfileName = userInfo && JSON.parse(userInfo).personalFirstName

  const pages = useSelector((state) => state.root.newsFeed.loggedInUserPagesDetail)

  const socketObj = useSelector((state) => state.root.socket.socketObj)
  const langCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const pageBubble = useSelector((state) => state.root.auth.pageBubble)
  const unreadCount = useSelector((state) => state.root.notifications.unreadCount)
  const unreadConversationsCount = useSelector((state) => state.root.messages.unreadConversationsCount)
  const { cart, cartId } = useSelector((state) => state.root.cart)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const connectionsCount = useSelector((state) => state.root.myProfile.connectionsCount)

  const [ userPageTitle, setUserPageTitle ] = useState('') ;

  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth);
  useEffect( () => { 
    typeof window !== 'undefined' &&  window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [] ) ;

  useEffect( () => {
    if ( accountType !== 'personal'){
      const pageTitle = localStorage.getItem('active_page') ;
      setUserPageTitle(pageTitle);
    } else {
      localStorage.removeItem('active_page') ;
    }
  }, [accountType])
  
  useEffect(()=>{
    setUserInfp(localStorage.getItem('user_info'))
  },[])

  const checkIconActive = (type) => {
    const { path } = props
    if (path && type === 'home') {
      if (path.includes('/user/') && path.includes('/activity')) {
        return true
      } else {
        return false
      }
    } else if (path && type === 'groups') {
      if (path.includes('/groups')) {
        return true
      } else {
        return false
      }
    } else if (path && type === 'network') {
      if (path.includes('/user/') && path.includes('/connections')) {
        return true
      } else {
        return false
      }
    } else if (path && type === 'dashboard') {
      if (path.includes('/dashboard')) {
        return true
      } else {
        return false
      }
    } else if (path && type === 'myarticles') {
      if (path === '/myarticles') {
        return true
      } else {
        return false
      }
    } else if (path && type === 'messages') {
      if (path.includes('/message')) {
        return true
      } else {
        return false
      }
    }
  }
  /**
   * Listen to newNotificationAdded socket event and on receiving it will increase the notification count...
   */
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
          if (!router.pathname.includes('messages')) dispatch(incrementMessageCount(payload))
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketObj, dispatch])

  useEffect(() => {
    if (isLoginToken()) {
      /**fetch userPages (for pages listing) */
      if (props.loggedInUsername) {
        dispatch(userPages(props.loggedInUsername, 'forLoggedInUser'))
      }
      /**fetch unread notifications, on login */
      dispatch(getUnreadNotificationsCount({t}))
      dispatch(getUnreadConversationsCount(t))
      dispatch(getCartDetails(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.loggedInUsername])

  const redirectMagento = async (e) => {
    e.stopPropagation()
    if (isLoginToken()) {
      if (cart && cart.length > 0 && cartId) {
        dispatch(toggleLoading(true))
        const resultAction = await dispatch(
          cartCheckout({ type: 'checkout', cartId: cartId, langCode: langCode ? langCode : 'en', t:t })
        )
        const result = await unwrapResult(resultAction)
        if (typeof window !== 'undefined' && result && result.success) {
          window.open(result.data.checkoutUrl, '_self')
        }
        dispatch(toggleLoading(false))
      }
    } else {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialSignupError(null))
    }
  }
  return (
    <>
      <NavUl className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <ul>
          <li onClick={() => props.redirectToNewsFeedPage()} className={checkIconActive('home') ? 'activeIcon' : null}>
            <a>
              <FaHome />
              <div className="menu-title">{t(`loginMenu.home`)}</div>
            </a>
          </li>
          {
            props.loggedInAccountType === 'personal' && (
              <li onClick={() => props.redirectHandler('/groups')} className={'mobile-hide ' + (checkIconActive('groups') ? 'activeIcon' : null)}>
                <a>
                  <FaComments/>
                  <div className="menu-title">{t(`header:loginMenu.groups`)}</div>
                </a>
              </li>
            )
          }
          {props.loggedInAccountType === 'personal' && (
            <li onClick={() => props.redirectToConnectionsPage()} className={'mobile-hide '+  (checkIconActive('network') ? 'activeIcon' : null)}>
              <a >
              {!router.pathname.includes('connections') && connectionsCount && connectionsCount.userPendingRequests > 0 ? (
                <span className="red-badge">{connectionsCount.userPendingRequests}</span>
              ) : null}
                <FaUsers/>
                <div className="menu-title">{t(`loginMenu.network`)}</div>
              </a>
            </li>
          )}
          <li onClick={() => props.redirectHandler('/myarticles')} className={'mobile-hide '+ (checkIconActive('myarticles') ? 'activeIcon' : null)}>
            <a >
              {/* <BsPencilSquare className="sml-svg" /> */}
              <svg stroke="currentColor" fill="currentColor" width="26" height="26" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M532 1108l152 152-52 52h-56v-96h-96v-56zm414-390q14 13-3 30l-291 291q-17 17-30 3-14-13 3-30l291-291q17-17 30-3zm-274 690l544-544-288-288-544 544v288h288zm608-608l92-92q28-28 28-68t-28-68l-152-152q-28-28-68-28t-68 28l-92 92zm384-384v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z"/></svg>
              <div className="menu-title">{t(`header:loginMenu.myarticles`)}</div>
            </a>
          </li>
          <li onClick={() => {
                dispatch(clearConversationsUnreadCount())
                props.redirectHandler('/messages')
              }} className={checkIconActive('messages') ? 'activeIcon' : null}>
            <a>
              {!router.pathname.includes('messages') && unreadConversationsCount > 0 ? (
                <span className="red-badge message">{unreadConversationsCount}</span>
              ) : null}
              <FaEnvelope/>
              <div className="menu-title">{t(`loginMenu.messages`)}</div>
            </a>
          </li>
          <li onClick={props.toggleNotiMenu} ref={props.notiRef}>
            <a>
              {unreadCount > 0 ? <span className="red-badge">{unreadCount}</span> : null}
              <IoNotifications />
              <div className="menu-title">{t(`loginMenu.notifications`)}</div>
              {props.notiMenu && <NotificationMenu props={props} />}
            </a>
          </li>
          {accountType === 'personal' && (
            <li onClick={props.toggleCartContainer} ref={props.cartRef}>
              <a>
                {cart && cart.length > 0 ? <span className="red-badge-cart">{cart.length}</span> : null}
                <IoIosCart />
                <div className="menu-title">{t(`loginMenu.cart`)}</div>
                {props.cartContainer && (
                  <CartContainer
                    deleteItem={props.deleteItem}
                    cartRef={props.cartRef}
                    redirectMagento={redirectMagento}
                  />
                )}
              </a>
            </li>
          )}
          {props.hasActivePlan && (
            <li onClick={() => props.redirectHandler('/dashboard')} className={'mobile-hide ' + (checkIconActive('dashboard') ? 'activeIcon' : null)}>
              <a>
                <img src='/assets/dashboard.svg' alt="Dashboard" />
                <div className="menu-title">{t(`loginMenu.dashboard`)}</div>
              </a>
            </li>
          )}
          <li onClick={() => props.redirectToUserProfilePage()}  className="userdropdown mobile-show">
            <a>
            {
                  props.userProfilePic
                    ? ( <img
                      onMouseEnter={props.toggleSubMenu}
                      onClick={() => props.redirectToUserProfilePage()}
                      className="UserImgNav mob-big"
                      src={createResizeImageUrl(props.userProfilePic, 50, 50, 'profileCover') +'?' + new Date(props.userDateUpdated).getTime()}
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(props.userDateUpdated).getTime()
                        imageErrorHandler(
                          e,
                          createImageUrl(props.userProfilePic),
                          '/assets/artmo-default.png',
                          'profileCover',
                          timeSuffix
                        )
                      }}
                      alt="UserImg"
                    /> )
                    : <FaUser className="user-profile" onClick={() => props.redirectToUserProfilePage()} />
                }
              <div className="menu-title">
              {
                props.loggedInAccountType === 'personal' ?
                userProfileName ? userProfileName.substring(0,6) : t(`header:loginMenu.me`) :
                userPageTitle ? userPageTitle.substring(0,6) : t(`header:loginMenu.me`)
              }
              <BiChevronDown />
              </div>
              {pageBubble && pages && pages.length && <Tooltip content={t(`header:legacyPageInfo`)} />}
              </a>
              <div className="drop-di" ref={props.refProp}>
              {props.subMenu && (
                <div className="sub-menu">
                  <SimpleMenu props={props} />
                </div>
              )}
              </div>
          </li>
          {
            width > 1024 && (<li  className="userdropdown mobile-hide">
            <a onMouseEnter={props.toggleSubMenu}>
                {
                  props.userProfilePic
                    ? ( <img
                      onMouseEnter={props.toggleSubMenu}
                      onClick={() => props.redirectToUserProfilePage()}
                      className="UserImgNav"
                      src={createResizeImageUrl(props.userProfilePic, 50, 50, 'profileCover') +'?' + new Date(props.userDateUpdated).getTime()}
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(props.userDateUpdated).getTime()
                        imageErrorHandler(
                          e,
                          createImageUrl(props.userProfilePic),
                          '/assets/artmo-default.png',
                          'profileCover',
                          timeSuffix
                        )
                      }}
                      alt="UserImg"
                    /> )
                    : <FaUser className="user-profile" onClick={() => props.redirectToUserProfilePage()} />
                }
              <div className="menu-title">
              {
                props.loggedInAccountType === 'personal' ?
                userProfileName ? userProfileName.substring(0,6) : t(`header:loginMenu.me`) :
                userPageTitle ? userPageTitle.substring(0,6) : t(`header:loginMenu.me`)
              }
              <BiChevronDown />
              </div>
              {pageBubble && pages && pages.length && <Tooltip content={t(`header:legacyPageInfo`)} />}
              </a>
              <div ref={props.refProp}>
              { isLoginToken() && (
                  <SimpleMenu className="as-none" props={props} />
              )}
              </div>
          </li>)
          }
          
          <li onClick={() => props.toggleSideMenu()} className="moreBtn">
            <a>
              {
                props.isSideMenuOpen ? <IoCloseOutline/> : <GiHamburgerMenu />
              }
              <div className="menu-title">{t(`loginMenu.more`)}<BiChevronDown className="more-smal" /></div>
            </a>
          </li>
          {!props.hasActivePlan && props.loggedInAccountType === 'personal' && (
            <li className="moreBtn sellArt mobile-hide" onClick={() => props.redirectHandler('/subscriptions')}>
              <a>
                <span>{t(`loginMenu.sellArt`)}</span>
              </a>
            </li>
          )}
        </ul>
      </NavUl>
    </>
  )
}

NavigationLoginMenu.propTypes = {
  deleteItem: PropTypes.string,
  toggleSideMenu: PropTypes.func,
  subMenu: PropTypes.bool,
  toggleSubMenu: PropTypes.func,
  openSubMenu: PropTypes.func,
  isSideMenuOpen: PropTypes.bool,
  refProp: PropTypes.object,
  userProfilePic: PropTypes.string,
  userDateUpdated: PropTypes.string,
  redirectToConnectionsPage: PropTypes.func,
  redirectToNewsFeedPage: PropTypes.func,
  path: PropTypes.string,
  notiMenu: PropTypes.bool,
  toggleNotiMenu: PropTypes.func,
  notiRef: PropTypes.object,
  openNotiMenu: PropTypes.func,
  loggedInAccountType: PropTypes.string,
  loggedInUsername: PropTypes.string,
  redirectHandler: PropTypes.func,
  handleMyAccountClick: PropTypes.func,
  hasActivePlan: PropTypes.object,
  cartContainer: PropTypes.bool,
  toggleCartContainer: PropTypes.func,
  cartRef: PropTypes.object,
  redirectToUserProfilePage: PropTypes.func,
  setShowFrame: PropTypes.func,
}

export default NavigationLoginMenu

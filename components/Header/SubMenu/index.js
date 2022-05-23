import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BiChevronRight } from 'react-icons/bi'
import { BiChevronDown } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { switchAnAccount } from '../../../modules/pages/pagesSlice'
import { toggleLoading } from '../../../modules/auth/authSlice'
import useTranslateContent from '../../../hooks/useTranslateContent'
import SingleItem from './SingleItem'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 200px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 52px;
  overflow: visible;
  iframe{
    display: none;
  }
  :before {
    background: url('/assets/Polygon.png') no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -8px;
    position: relative;
    display: flex;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 767px) {
      left: 144px;
      margin: inherit;
      top: -7px;
    }
  }
  @media ( max-width: 767px ) {
    &.has-submenu {
      top: 50px !important;
      left: -150px;
    }
  }
  .pad-right {
    display: block !important ;
    .list-item.page-list {
      padding: 5px 20px !important;
      &:hover .page-title{
        color: #666;
      }
    }
  }
  .list-ul {
    list-style: none;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column !important;
    margin-top: -14px;
    border: 1px solid #ccc;
    background-color: #222;
  }
  .list-item {
    color: #fff;
    text-align: left !important;
    padding: 8px 10px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #eee;
    justify-content: flex-start !important;
    cursor: pointer;
    .page-title {
      color: #fff ;
    }
    a {
      color: #fff !important;
    }
    .page-title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0 0 0 5px !important;
      color: #fff;
    }
    .PageImgNav {
      width: 24px !important;
      height: 24px !important;
      margin: 0 !important;
      @media (max-width: 767px) {
        width: 20px !important;
        height: 20px !important;
        max-width: 20px;
      }
    }
    &.page-list {
      display: flex;
      padding: 3px 5px;
      width: 150px;
      align-items: center;
      margin: 0;
      color: #666;
      @media (max-width: 1024px) {
        display: flex !important ;
      }
    }
    .list-arrow {
      @media (max-width: 767px) {
        position: relative;
        top: 2px;
      }
    }
  }
  .list-item:hover {
    background-color: #ddd;
    cursor: pointer;
    color: #666 !important;
    .page-title {
      color: red ;
    }
  }
  .scroll-listing {
    display: block !important;
    max-height: 177px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 0 !important;
    .list-item {
      &.page-list {
        .page-title {
          width: 100%;
        }
      }
    }
    @media (max-width: 767px) {
      max-height: 157px;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(241, 241, 241, 0.233);
    }

    ::-webkit-scrollbar-thumb {
      background: #000;
      cursor: pointer;
    }
  }
  .header-sub-sub-menu {
    border: 1px solid #ccc;
    background: #222 ;
    margin-left: 170px;
    top: 33px;
    //for later use
    /* max-height: 450px; */
    /* overflow-y: auto; */
    ::before {
      background: url('/assets/black-polygon.png') no-repeat top center;
      width: 100%;
      display: block;
      height: 15px;
      content: ' ';
      top: -8px;
      position: absolute;
      display: flex;
      text-align: center;
      margin: 0 auto;
      left: -178px;
      margin: inherit;
      top: 3px;
      transform: rotate(270deg);
      @media (max-width: 1574px) {
        transform: rotate(90deg);
        left: 328px;
        top: -4px;
      }
      @media (max-width: 1024px) {
        transform: rotate(90deg);
        left: 327px;
        top: -4px;
      }
      @media (max-width: 767px) {
        left: 99px;
        top: -47px;
        transform: rotate(360deg);
      }
      @media (max-width: 991px) and (orientation: landscape) {
        transform: rotate(90deg);
        left: 327px;
        top: -4px;
      }
    }
    @media (max-width: 1574px) {
      display: block !important ;
      //for later use
      /* max-height: 180px;
      overflow-y: auto; */
      margin: 10px 0 0 -174px !important;
    }
    @media (max-width: 1024px) {
      display: block !important ;
      //for later use
      /* max-height: 180px;
      overflow-y: auto; */
      margin: 10px 0 0 -174px !important;
    }
    @media (max-width: 767px) {
      display: block !important ;
      margin: 40px 0 0 -20px !important;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      display: block !important ;
      margin: 10px 0 0 -174px !important;
    }
    
  }
`

export default function SimpleMenu(props) {
  const { t } = useTranslation(['header', 'translation'])

  const dispatch = useDispatch()
  const userPages = useSelector((state) => state.root.newsFeed.loggedInUserPagesDetail)
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)

  const { handleProfileClick, handleMyAccountClick, handleLogout, handleCreatePageClick, handleInviteFriendsClick, handleReferralsClick, closeMeMenu } = props.props
  /**for toggling pages listing */
  const [pageMenu, setPageMenu] = useState(true)
  // const [showFrame,setShowFrame]=useState(false)

  const userInfo = localStorage.getItem('user_info')
  const parsedUserInfo = userInfo && JSON.parse(userInfo)
  const { personalFirstName, personalLastName, personalUsername, accountType } = parsedUserInfo
  let loggedInAccountType = accountType
  
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (props && props.props.loggedInUserRole === 'artist') && free
  
  const userPageName = localStorage.getItem('active_page') ;


  const switchToPageHandler = (pageUserId, pageTitle) => {
    localStorage.setItem('active_page', pageTitle) ;
    dispatch(switchAnAccount(pageUserId,t))
    setPageMenu(false)
    closeMeMenu()
  }

  const switchToPersonalAccHandler = () => {
    dispatch(switchAnAccount('',t))
    setPageMenu(true)
    closeMeMenu()
  }
  const nameOfUser =
    personalFirstName && personalLastName ? `${personalFirstName} ${personalLastName}` : personalUsername

  const [name, translateName] = useState(nameOfUser)

  useEffect(() => {
    translateName(nameOfUser)
  }, [nameOfUser])

  const [pageName, translatePageName] =useTranslateContent('') ;

  useEffect(() => {
    if(userPageName)
    translatePageName(userPageName)
  }, [userPageName])

  const isActivePlanClass = hasActivePlan ? 'header-sub-menu subscription as-none' : 'header-sub-menu as-none'
  const hasSubMenuClass = userPages && userPages.length > 0 ? 'has-submenu as-none' : '' ;
  const isUserPage = loggedInAccountType !== 'personal' ? 'user_page' : ''
  const logoutFromMagento=()=>{
    dispatch(toggleLoading(true))
    props.props.setShowFrame(true)
    handleLogout()
    dispatch(toggleLoading(false))
  }
  return (
    <DropdownContent className={isActivePlanClass + ' ' + hasSubMenuClass + ' ' + isUserPage}>
      <div className="list-ul">
        { loggedInAccountType === 'personal' ?
          <div className="list-item" onClick={handleProfileClick}>
             {t(`subMenu.profile`)}
          </div>
          :
          <div className="list-item" onClick={handleProfileClick}>
            {t(`subMenu.page`)} <div className="page-title">{pageName ? pageName : userPageName}</div>
          </div>
        }
        
        {loggedInAccountType !== 'page' ? (
          <>
            
            {/* If user has pages then display option to view listing */}
            {userPages && userPages.length > 0 && (
              <div className="list-item">
                {t(`subMenu.switchPage`)}
                <BiChevronDown className="list-arrow" />
              </div>
            )}
            {/* If pageMenu is true then  display the listing  */}
            {pageMenu ? (
              <div className="pad-right">
                <div className="scroll-listing">
                  {userPages &&
                    userPages.map((page) => (
                      <SingleItem key={page._id} page={page} switchToPageHandler={switchToPageHandler} />
                    ))}
                </div>
              </div>
            ) : null}
            <div className="list-item" onClick={handleCreatePageClick}>
              {t(`subMenu.createPage`)}
            </div>
          </>
          
        ) : (
          <div className="list-item" onClick={() => switchToPersonalAccHandler()}>
            {t(`subMenu.switchTo`)} <div className="page-title">{name ? name : nameOfUser}</div>
          </div>
        )}
        <div className="list-item" onClick={handleMyAccountClick}>
          {t(`subMenu.myAccount`)}
        </div>
        {eligible ? 
        <div className="list-item" onClick={handleReferralsClick}>
          {t(`header:subMenu.referral`)}
        </div> : 
        <div className="list-item" onClick={handleInviteFriendsClick}>
          {t(`header:subMenu.inviteFriends`)}
        </div>}
        <div className="list-item" onClick={logoutFromMagento}>
          {t(`subMenu.signOut`)}
        </div>
      </div>
    </DropdownContent>
  )
}

SimpleMenu.propTypes = {
  props: PropTypes.object,
}

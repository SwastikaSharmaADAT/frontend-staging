import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BiChevronDown } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { switchAnAccount } from '../../../modules/pages/pagesSlice'
import arrowImage from '../../../public/assets/Polygon.png'
import useTranslateContent from '../../../hooks/useTranslateContent'
import SingleItem from './SingleItem'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #222;
  min-width: 160px;
  overflow: auto;
  border: 1px solid #ccc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow: visible;
  top: -100px;
  right: 90px;
  @media( min-width: 450px ) and ( max-width: 767px ) {
    right: 164px;
  }
  @media( min-width: 767px ) and ( max-width: 1024px){
    right: 130px;
    top: -300px;
  }
  &.page-sub{
    right: 20px;
    top: -163px;
    @media( min-width: 450px) and ( max-width: 767px){
      top: -18px;
      right: 10px;
    }
    @media( min-width: 767px ) and ( max-width: 1024px){
      top: -360px;
    }
    @media( min-width: 1024px){
      display: none ;
    }
  }
  .pad-right {
    .list-item.page-list {
      padding: 5px 20px !important;
      &:hover .page-title{
        color: #666;
      }
      .page-title {
        margin-left: 5px ;
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
  }
  .list-item {
    color: #fff;
    text-align: left !important;
    padding: 8px 10px;
    text-decoration: none;
    font-size: 13px;
    justify-content: flex-start !important;
    cursor: pointer;
    a {
      color: #fff !important;
    }
    .page-title {
      // display: -webkit-box;
      // -webkit-line-clamp: 1;
      // -webkit-box-orient: vertical;
      // overflow: hidden;
      // margin: 0 0 0 5px !important;
      display: inline-block;
      color: #fff;
      width: 80px;
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
      vertical-align: middle;
      @media (max-width: 767px) {
        position: relative;
        top: 2px;
      }
    }
  }
  .list-item:hover {
    background-color: #ddd;
    cursor: pointer;
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
    margin-left: 170px;
    top: 33px;
    //for later use
    /* max-height: 450px; */
    /* overflow-y: auto; */
    ::before {
      background: url(${arrowImage}) no-repeat top center;
      width: 15px;
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
      @media (max-width: 1399px) {
        transform: rotate(90deg);
        left: 327px;
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
    @media (max-width: 1399px) {
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
  const { t } = useTranslation(['translation', 'header'])

  const dispatch = useDispatch()
  const userPages = useSelector((state) => state.root.newsFeed.loggedInUserPagesDetail)
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)

  const { handleProfileClick, handleMyAccountClick, handleLogout, handleCreatePageClick, handleInviteFriendsClick, handleReferralsClick, closeMeMenu } = props
  /**for toggling pages listing */
  const [pageMenu, setPageMenu] = useState(true)

  const userInfo = localStorage.getItem('user_info')
  const parsedUserInfo = userInfo && JSON.parse(userInfo)
  const { personalFirstName, personalLastName, personalUsername, accountType } = parsedUserInfo
  let loggedInAccountType = accountType

  const userData = useSelector((state) => state.root.myProfile.userData)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (props && props.loggedInUserRole === 'artist') && free

  const userPageName = localStorage.getItem('active_page') ;

  const switchToPageHandler = (pageUserId, pageTitle) => {
    localStorage.setItem('active_page', pageTitle) ;
    dispatch(switchAnAccount(pageUserId))
    setPageMenu(false)
    closeMeMenu()
  }

  const switchToPersonalAccHandler = () => {
    dispatch(switchAnAccount(''))
    setPageMenu(false)
    closeMeMenu()
  }
  const nameOfUser =
    personalFirstName && personalLastName ? `${personalFirstName} ${personalLastName}` : personalUsername

  const [name, translateName] = useState(nameOfUser)

  useEffect(() => {
    if(nameOfUser)
    translateName(nameOfUser)
  }, [nameOfUser, translateName])
  const [pageName, translatePageName] =useTranslateContent('')

  useEffect(() => {
    if(userPageName)
    translatePageName(userPageName)
  }, [userPageName])
  return (
    <DropdownContent className={hasActivePlan ? 'header-sub-menu subscription' : 'header-sub-menu page-sub'}>
      <div className="list-ul">
        { loggedInAccountType === 'personal' ?
          <div className="list-item" onClick={handleProfileClick}>
            {t(`header:subMenu.profile`)}
          </div>
          :
          <div className="list-item" onClick={handleProfileClick}>
            {t(`header:subMenu.page`)} <div className="page-title">{ pageName? pageName.substring(0,7):userPageName && userPageName.substring(0,7)}...</div>
          </div>
        }
        {loggedInAccountType !== 'page' ? (
          <>
            <div className="list-item" onClick={handleCreatePageClick}>
              {t(`header:subMenu.createPage`)}
            </div>
            {/* If user has pages then display option to view listing */}
            {userPages && userPages.length > 0 && (
              <div className="list-item">
                {t(`header:subMenu.switchPage`)}
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
          </>
        ) : (
          <div className="list-item" onClick={() => switchToPersonalAccHandler()}>
            {t(`header:subMenu.switchTo`)} <div className="page-title">{name ? name :nameOfUser}</div>
          </div>
        )}
        <div className="list-item" onClick={handleMyAccountClick}>
          {t(`header:subMenu.myAccount`)}
        </div>
        {eligible ? 
        <div className="list-item" onClick={handleReferralsClick}>
          {t(`header:subMenu.referral`)}
        </div> : 
        <div className="list-item" onClick={handleInviteFriendsClick}>
          {t(`header:subMenu.inviteFriends`)}
        </div>}
        <div className="list-item" onClick={handleLogout}>
          {t(`header:subMenu.signOut`)}
        </div>
      </div>
    </DropdownContent>
  )
}
SimpleMenu.propTypes = {
  handleProfileClick: PropTypes.func, 
  handleMyAccountClick: PropTypes.func, 
  handleLogout: PropTypes.func,
  handleCreatePageClick: PropTypes.func,
  closeMeMenu: PropTypes.func
}

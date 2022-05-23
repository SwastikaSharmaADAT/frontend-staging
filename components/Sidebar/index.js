import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { IoCloseOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { setCheckUserType } from '../../modules/profile/myProfileSlice'
import HeaderSearchMobile from '../HeaderSearchMobile'
import SidebarMenu from './SidebarMenu'
import SidebarGiftcard from './SidebarGiftcard'
import SidebarContact from './SidebarContact'
import SidebarInvite from './SidebarInvite'
import ShortcutIcons from './ShortcutIcons'
import { useRouter } from 'next/router'
import SidebarFooter from './SidebarFooter'

import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
} from '../../modules/auth/authSlice'

const SidebarTopNav = styled.div`
  width: calc(100% - 24px);
  @media (min-width: 769px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: block;
    padding: 0 20px;
    width: auto;
    margin-top: 20px;
    ul {
      flex-wrap: wrap;
      li {
        margin: 0 0 10px;
        padding: 0;
        width: 60px;
        justify-content: flex-end;
        svg {
          order: inherit !important;
        }
        div {
          display: block !important;
        }
        &.moreBtn {
          display: none !important;
        }
        &.userdropdown {
          display: none !important;
        }
      }
    }
  }
`
const TopSidebarContainer = styled.div`
  width: 100%;
  position: relative;
  height: calc(100% - 60px);
  overflow-y: auto;
  flex: 1 0 auto;
  overflow-x: hidden;
`

const SidebarContainer = styled.div`
  width: 100%;
  svg {
    font-size: 24px;
    color: #fff;
  }
  @media (max-width: 991px) {
    overflow-y: visible;
    padding-bottom: 30px;
  }
  .red-badge {
    @media (max-width: 991px) {
      top: -5px !important;
      right: 18px !important;
      width: 12px;
      height: 12px;
    }
  }
  .red-badge-cart {
    @media (max-width: 991px) {
      top: 0px !important;
      right: 15px !important;
      width: 12px;
      height: 12px;
    }
  }
`
const TopHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px 0;
  align-items: center;
  @media (max-width: 767px) {
    padding: 20px;
  }
`

const MenuHeading = styled.div`
  color: #fff;
  font-size: 26px;
  @media (max-width: 991px) {
    font-size: 18px;
  }
`

const useStyles = makeStyles({})

const Sidebar = (props) => {
  const router = useRouter()
  const { t } = useTranslation(['translation', 'sidebar'])

  const dispatch = useDispatch()
  const classes = useStyles()
  const loggedIn = useSelector((state) => state.root.auth.loggedIn)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  const breakpoint = 767

  const redirectToPage = (route) => {
    router.push(route)
  }

  const handleUserTypeRedirection = (route, type) => {
    if (props.path.includes('/users')) {
      dispatch(setCheckUserType({ val: true, type }))
     }
    redirectToPage(route)
  }

  const openSignUpModalHandler = () => {
    props.closeSideMenu()
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  return (
    <>
      {width < breakpoint ? (
        <SwipeableDrawer
          className="SideBar SideBarMob"
          anchor="right"
          open={props.isOpen}
          onClose={props.closeSideMenu}
        >
          <TopSidebarContainer>
            <SidebarContainer className={classes.list}>
              <SidebarTopNav>{loggedIn ? <ShortcutIcons loggedInUserRole={props.loggedInUserRole} /> : null}</SidebarTopNav>
              <HeaderSearchMobile />
              <SidebarGiftcard />
              <SidebarMenu
                redirectToPage={redirectToPage}
                handleUserTypeRedirection={handleUserTypeRedirection}
                userDataState={userDataState}
                signupModalOpen={openSignUpModalHandler}
              />
              <SidebarContact onClose={props.closeSideMenu} />
              {loggedIn ? <SidebarInvite loggedInUserRole={props.loggedInUserRole} onClose={props.closeSideMenu} /> : <></>}
            </SidebarContainer>
          </TopSidebarContainer>
          <SidebarFooter />
        </SwipeableDrawer>
      ) : (
        <SwipeableDrawer className="SideBar" anchor="right" open={props.isOpen} onClose={props.closeSideMenu}>
          <TopSidebarContainer>
            <TopHeading>
              <MenuHeading> </MenuHeading>
              <IoCloseOutline className="CloseSideBar" onClick={() => props.closeSideMenu()} />
            </TopHeading>
            <SidebarContainer className={classes.list}>
              <SidebarTopNav>{loggedIn ? <ShortcutIcons  loggedInUserRole={props.loggedInUserRole}/> : null}</SidebarTopNav>
              <HeaderSearchMobile />
              <SidebarMenu
                redirectToPage={redirectToPage}
                handleUserTypeRedirection={handleUserTypeRedirection}
                userDataState={userDataState}
                signupModalOpen={openSignUpModalHandler}
              />
              {loggedIn ? <SidebarInvite loggedInUserRole={props.loggedInUserRole} onClose={props.closeSideMenu} /> : <></>}
              <SidebarGiftcard />
              <SidebarContact onClose={props.closeSideMenu} />
            </SidebarContainer>
          </TopSidebarContainer>
          <SidebarFooter/>
        </SwipeableDrawer>
      )}
    </>
  )
}

Sidebar.propTypes = {
  closeSideMenu: PropTypes.func,
  isOpen: PropTypes.bool,
  path: PropTypes.string,
}

export default Sidebar

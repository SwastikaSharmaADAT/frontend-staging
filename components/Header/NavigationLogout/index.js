import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import SignupButton from '../SignupButton'
import LoginButton from '../LoginButton'
import NavigationLogoutMenu from '../NavigationLogoutMenu'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import {
//   closeAllModals,
//   setSignupPopup,
//   setUsernameValidFormError,
//   setEmailValidFormError,
//   setSignupError,
//   setSocialUserError,
// } from '../../../modules/auth/authSlice'

const RightHeaderCon = styled.div`
  display: flex;
  align-items: center;
  &.rtl-ar-content {
    direction: rtl;
  }
`
const HeaderLabel = styled.h2`
  font-size: 22px;
  font-weight: 400;
  margin: 0px 39px 0 0;
  padding: 0;
  color: #fff;
  @media (max-width: 1024px) {
    display: none;
  }
`

// const SellArtBtn = styled.button`
  
//   font-style: normal;
//   color: #fff;
//   border: 0;
//   outline: 0;
//   height: 33px;
//   align-items: center;
//   font-size: 18px;
//   cursor: pointer;
//   min-width: 84px;
//   font-family: 'Montserrat-Regular';
//   font-weight: 100;
//   border: 1px solid #fff;
//   background: #000;
//   :hover,
//   :focus {
//     outline: none;
//   }
//   @media (min-width: 768px) and (max-width: 1024px) {
//     font-size: 16px;
//     width: auto;
//   }
//   @media (max-width: 767px) {
//     font-size: 14px;
//     width: auto;
//     min-width: 60px;
//   }
//   @media (max-width: 330px) {
//     font-size: 10px;
//     width: auto;
//     min-width: inherit;
//   }

// `

/**
 * @category components
 * @description Footer component
 */
const NavigationLogout = (props) => {
  const { t } = useTranslation(['translation', 'header'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  // const dispatch = useDispatch()

  // const openSignupModal = () => {
  //   dispatch(closeAllModals())
  //   dispatch(setSignupPopup(true))
  //   dispatch(setUsernameValidFormError(null))
  //   dispatch(setEmailValidFormError(null))
  //   dispatch(setSignupError(null))
  //   dispatch(setSocialUserError(null))
  // }

  return (
    <>
      <RightHeaderCon className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <HeaderLabel> {t(`header:connectingTheArtWorld`)}</HeaderLabel>
        <SignupButton />
        <LoginButton />
        {/* <SellArtBtn onClick={openSignupModal} >Sell Art</SellArtBtn> */}
        <NavigationLogoutMenu
          deleteItem={props.deleteItem}
          cartRef={props.cartRef}
          cartContainer={props.cartContainer}
          toggleCartContainer={props.toggleCartContainer}
          toggleSideMenu={props.toggleSideMenu}
          closeCartContainer={props.closeCartContainer}
          isSideMenuOpen={props.isSideMenuOpen}
        />
      </RightHeaderCon>
    </>
  )
}

NavigationLogout.propTypes = {
  toggleSideMenu: PropTypes.func,
  cartRef: PropTypes.object,
  cartContainer: PropTypes.bool,
  toggleCartContainer: PropTypes.func,
  closeCartContainer: PropTypes.func,
  deleteItem: PropTypes.string,
  isSideMenuOpen: PropTypes.bool
}

export default NavigationLogout

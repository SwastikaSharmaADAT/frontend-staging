import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
} from '../../../modules/auth/authSlice'

const ButtonText = styled.button`
  background: ${(props) => (props.guestMode ? '#000' : '#fff')};
  font-style: normal;
  color: ${(props) => (props.guestMode ? '#fff' : '#000')};
  border: 0;
  outline: 0;
  height: 33px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  min-width: ${(props) => (props.guestMode ? '124px' : '84px')};
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    background: ${(props) => (props.guestMode ? '#000' : '#fff')};
    outline: none;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 16px;
    width: auto;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    width: auto;
    //min-width: 60px;
    min-width: 75px;
  }
  @media (max-width: 330px) {
    //font-size: 10px;
    font-size: 13px;
    width: auto;
    min-width: inherit;
  }
`

const SignupButton = (props) => {
  const { t } = useTranslation('header')

  const dispatch = useDispatch()

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <ButtonText onClick={openSignupModal} guestMode={props.guestMode}>
      {props.guestMode ? t(`freeSignup`) : t(`signup`)}
    </ButtonText>
  )
}

SignupButton.propTypes = {
  guestMode: PropTypes.bool,
}

export default SignupButton

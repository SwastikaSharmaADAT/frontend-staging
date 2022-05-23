import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../modules/auth/authSlice'

const ButtonText = styled.button`
  background: ${(props) => (props.guestMode ? '#000' : 'transparent')};
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  height: 33px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  min-width: 84px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
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

const LoginButton = (props) => {
  const { t } = useTranslation('header')

  const dispatch = useDispatch()

  const openLoginModal = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <ButtonText guestMode={props.guestMode} onClick={openLoginModal}>
      {t(`login`)}
    </ButtonText>
  )
}

LoginButton.propTypes = {
  guestMode: PropTypes.bool,
}

export default LoginButton

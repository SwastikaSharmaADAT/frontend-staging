import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Button from '../../../../UI/Button'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
  setLoginPopup,
  setLoginError,
} from '../../../../../modules/auth/authSlice'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 200px;
  }
  a {
    color: #666;
    span {
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
  }
  button {
    min-width: 130px;
    font-size: 16px;
    height: auto;
    padding: 10px 10px;
    margin-bottom: 10px;
    @media (max-width: 479px) {
      min-width: 100px;
      font-size: 14px;
      height: auto;
      padding: 7px 10px;
    }
  }
`

const SeeMoreWrapper = styled.div`
  font-size: 24px;
  color: #666;
  font-weight: bold;
  margin-bottom: 20px;
`

const SectionContent = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('newsFeed')

  const openLoginModal = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <>
      <SectionContentWrap>
        <SeeMoreWrapper>{t(`singleActivity.seeMore`)}</SeeMoreWrapper>
        <Button onClick={openSignupModal}>{t(`singleActivity.signUp`)}</Button>
        <a>
          {t(`singleActivity.alreadyHaveAnAccount`)}{' '}
          <span onClick={openLoginModal}>{t(`singleActivity.logIn`)}</span>
        </a>
      </SectionContentWrap>
    </>
  )
}

export default SectionContent

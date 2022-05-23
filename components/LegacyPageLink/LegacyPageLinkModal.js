import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import {
  closeAllModals,
  convertToMember,
  setCredentials,
  setLoginPopup,
  setPageLinkPopup,
  setSignupPopup,
} from '../../modules/auth/authSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import CloseIcon from '../UI/CloseIcon/CloseIcon'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 90vw;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    // max-width: 47vw;
  }
`

const Wrapper = styled.div`
  padding: 0;
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    display: flex;
    height: auto !important;
  }
  @media (max-width: 991px) {
    overflow-y: auto;
  }
  @media (max-width: 767px) {
    overflow-y: auto;
  }

  @media (max-width: 991px) and (orientation: landscape) {
    height: calc(100vh - 100px) !important;
    width: 60vw;
  }
  @media (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
    width: 100%;
  }
`

const LoginContainer = styled.div`
  width: 100%;
  padding: 0;
  min-height: 372px;
  max-width: calc(100% - 136px);
  @media (max-width: 767px) {
    max-width: inherit;
    width: auto;
    min-height: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 100%;
    padding: 0;
  }
  // .signup-close {
  //   position: absolute;
  //   right: 10px;
  //   top: 10px;
  // }
  .signup-close {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 25px;
  }
  .close-icon {
    color: #fff !important;
  }
`
const SignupBackgroundBg = styled.div`
  color: #222;
  width: 218px;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  background: url('/assets/member-2.png') no-repeat left center;
  background-size: 100% 100%;
  @media (max-width: 550px) {
    display: none;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    display: none;
  }
`
const ButtonsWrap = styled.div`
  padding: 30px;
  @media (max-width: 767px) {
    padding: 15px;
  }
`
const Content = styled.p`
  padding: 10px;
  line-height: 28px;
  color: #222;
  font-size: 14px;
  font-weight: normal;
  a {
    color: #222;
    text-decoration: underline;
    font-style: normal;
    text-decoration-color: #aaa;
  }
  .bold {
    font-weight: 700;
  }
  @media (max-width: 767px) {
    font-size: 12px;
    line-height: 20px;
  }
`
const Heading = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: #222;
  color: #fff;
  font-size: 24px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 479px) {
    font-size: 18px;
    line-height: normal;
  }
  .close-icon {
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 16px;
  }
`
const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #eee;
  width: 45%;
  font-size: 14px;
  line-height: 22px;
  padding: 5px;
  min-height: 131px;
  border: 2px solid #eee;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 12px;
    line-height: 20px;
    width: 40%;
    justify-content: flex-start;
    min-height: 120px;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    justify-content: center;
  }
  :hover {
    border: 2px solid #222;
  }
  img {
    height: 60px;
    margin-bottom: 15px;
    @media (max-width: 767px) {
      height: 40px;
    }
  }
`
const ButtonDivWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const LegacyPageLinkModal = () => {
  const { t } = useTranslation('translation')

  const dispatch = useDispatch()
  const credentials = useSelector((state) => state.root.auth.credentials)
  const legacyPageLinkText = useSelector((state) => state.root.staticContent.legacyPageLinkText)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('Legacy_Page_Link_Popup_Content', t, 'legacyPageLink'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
  }

  const makeMember = async () => {
    const resultAction = await dispatch(convertToMember({ ...credentials, t }))
    const response = unwrapResult(resultAction)
    if (response && response.success) {
      dispatch(setLoginPopup(true))
      dispatch(setCredentials(null))
      dispatch(setPageLinkPopup(false))
    }
  }
  const closeLegacyModal = () => {
    dispatch(setPageLinkPopup(false))
  }
  return (
    <PageWrapper>
      <Wrapper>
        <SignupBackgroundBg />
        <LoginContainer>
          <Heading>
            {t('auth.welcomeText')}
            <CloseIcon className="close-icon" onclick={closeLegacyModal} />
          </Heading>
          <ButtonsWrap>
            <Content>{ReactHtmlParser(legacyPageLinkText)}</Content>
            <ButtonDivWrapper>
              <Button onClick={openSignupModal}>
                {' '}
                <img src="/assets/building.png" alt={'building'} /> {t('auth.legacySignupText')}
              </Button>
              <Button onClick={makeMember}>
                {' '}
                <img src="/assets/head.png" alt={'head'} />
                {t('auth.legacyConvertToMemberText')}
              </Button>
            </ButtonDivWrapper>
          </ButtonsWrap>
        </LoginContainer>
      </Wrapper>
    </PageWrapper>
  )
}

export default LegacyPageLinkModal

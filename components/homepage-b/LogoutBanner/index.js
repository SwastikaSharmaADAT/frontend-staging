import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import BannerBg from '../../../public/assets/ARTMO-Logo-Black-500x198.png'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
  setLoginPopup,
  setLoginError,
} from '../../../modules/auth/authSlice'
import Linkify from 'react-linkify'
import { getLatestArtworks } from '../../../modules/landingPage/landingPageSlice'
import LogoutSliders from './LogoutSliders'
import LanguagePopup from '../../LanguagePopup'


const BannerWrapper = styled.div`
  background: #0D0D0D;
  height: 80vh;
  @media (max-width: 767px) {
    height: auto;
  }
  @media( min-width: 767px ) and (max-width: 1250px){
    height: 450px;
  }
`
const BannerContainerLogout = styled.div`
  max-width: 100%;
  height: 100%;
`
const BannerInner = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 100%;
  @media (max-width:640px) {
    height: 400px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
`
const BannerLeft = styled.div`
  margin-right: 2%;
	text-align: center;
  padding: 3% 0% 3% 8%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width:1024px) {
    margin: 0% 0% 5% 0%;
	  width: 100%;
    padding: 20px;
    z-index: 1;
  }
`
const BannerRight = styled.div`
  max-width: 55%;
  width: 55%;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 55%;
  flex: 0 0 55%;
  height: 100%;
  position: relative;
  @media (min-width:640px) and (max-width: 996px) {
    max-width: 40%;
  }
  @media (max-width:640px) {
    max-width: 100%;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    width: 100%;
    height: 400px;
    position: absolute;
    opacity: 0.3;
  }
  img {
    max-width: 100%;
  }`
const HeadingDiv = styled.h1`
    font-family: 'Montserrat-Regular';
    font-size: 3vw;
    text-align: left;
    color: #fff;
    line-height: 1.5em;
    font-weight: 400;
    margin: 0 0 2px 0;
    flex: 0 0 100%;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @media (max-width:640px) {
      line-height: 1.2;
      font-size: 22pt;
    }
  `
const HeadingNav = styled.div`
    font-size: 14pt;
    color: #fff;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    margin: 0 0 5px 0;
    @media (max-width:640px) {
      font-size: 12pt;
	    margin: 0 0 0px 0;
    }
    `
const HeadingLink = styled.a`
    color: #fff;
    font-size: 10pt;
	  font-family: 'Montserrat-Regular';
    font-weight: 400;
    text-decoration: none;
    `
const BannerButtons = styled.div`
@media (max-width:640px) {
  padding: 5% 10% 0;
  a {
    margin-top: 5%;
  }
}
`

const SignUpButton = styled.div`
    display: block;
    border: 1px solid #fff;
    margin-top: 10%;
    background: #fff;
    padding: 0.7em;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
	  border-radius: 0;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    @media (max-width: 460px) {
      font-size: 14px;
    }
`

const LearnButton = styled.div`
    display: block;
    border: none;
    margin-top: 10%;
    background: transparent;
    color: #fff;
    padding: 0.7em 1.5em;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
	  border-radius: 0;
    line-height: 1;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    @media (max-width: 460px) {
      font-size: 14px;
    }
`

const DescrText = styled.p`
    flex: 0 0 100%;
    font-style: normal;
    font-weight: normal;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    color: #ccc;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const LogInButton = styled.div`
    display: block;
    border: 1px solid #fff;
    margin-top: 10%;
    color: #fff;
    font-size: 1.45em;
    padding: 0.5em 0.9em;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
	  border-radius: 0;
    line-height: 1;
    color: #000;
    background: #fff;
    text-align: center;
    text-decoration: none; 
    cursor: pointer;   

`

const LogoutBanner = ({topRef}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('landingPageB')

  const latestArtworks = useSelector((state) => state.root.landingPage.latestArtworks)
  
  const filteredArtworks = latestArtworks.filter((item) => {
    return item.genreId && item.genreId.filter(e => e.title === 'Nude & Erotic').length == 0
  })

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  const openLoginModal = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <BannerWrapper ref={topRef}>
      <BannerContainerLogout className="banNoCap">
        <BannerInner>
          <BannerLeft>
            <HeadingDiv>{t(`loggedOutBanner.title`)}
            <br></br>
            {t(`loggedOutBanner.title2`)}</HeadingDiv>
            <DescrText>{t(`loggedOutBanner.descr`)}</DescrText>
            <LanguagePopup className="NewHomepage"/><br/>
            <SignUpButton onClick={() => openSignupModal()} className="btn sign-btn">{t(`loggedOutBanner.signUp`)}</SignUpButton>
            <LearnButton onClick={() => router.push('/what-is-artmo')} className="btn sign-btn">{t(`loggedOutBanner.learnMore`)}</LearnButton>
          </BannerLeft>
          <BannerRight>
            <LogoutSliders latestArtworks={filteredArtworks}/>
          </BannerRight>
        </BannerInner>
      </BannerContainerLogout>
    </BannerWrapper>
  )
}

export default LogoutBanner

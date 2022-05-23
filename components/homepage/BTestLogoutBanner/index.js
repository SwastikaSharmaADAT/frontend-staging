import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
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
import LanguagePopup from '../../LanguagePopup'
import { FaChevronDown } from 'react-icons/fa'

const BannerWrapper = styled.div`
  background: #000;
  max-height: 70vh;
  @media (max-width: 767px) {
    height: auto;
    padding: 10px 0;
  }
  @media( min-width: 767px ) and (max-width: 1250px){
    height: 370px;
  }
`
const BannerContainerLogout = styled.div`
  padding: 3% 8% 9% 8%;
  max-width: 100%;
`

const BannerSection = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 475px;
    margin-top: 65px;
    box-sizing: border-box;
    @media( max-width: 1200px ) {
      height: 415px;
    }
    @media( max-width: 991px ) {
      height: auto;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }
    @media( max-width: 767px ) {
      margin-top: 53px ;
    }
    
`
const BannerLeft = styled.div`
  width: 60%;
  box-sizing: border-box;
    &.banner-image{
      background-image: url('/assets/banner.jpg');
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      position: relative;
      z-index: 1;
      &:before{
          //background: rgba(255,255,255,0.4);
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
      }
    }
  @media( max-width: 991px ) {
    height: 300px;
    width: 100%;
  }
`
const BannerRight = styled.div`
  box-sizing: border-box;
  width: 40%;
  background: #e6e9ec;
  padding: 50px;
  text-align: center;
  background: #e6e9ec;
  padding: 30px;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -ms-flex-pack: distribute;
      justify-content: space-between;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  @media( max-width: 991px ) {
    width: 100%;
  }
  @media( max-width: 850px  ){
    justify-content: center ;
  }
  @media( max-width: 767px ) {
    height: 500px  ;
    position: relative;
    bottom: 12px;
  }

`

const BannerHeading = styled.h1`
    font-size: 42px;
    line-height: 1.4;
    // text-shadow: 2px 2px 4px rgb(0 0 0);
	  margin: 0 0 15px 0;
    box-sizing: border-box;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    @media( max-width: 1200px ) {
      font-size: 32px;
    }
    @media( max-width: 991px ) {
      margin-bottom: 15px;
    }
    & br{
      @media( max-width: 991px ) {
        display: none;
      }
    }
    @media( max-width: 850px ) {
      margin-bottom: 15px;
      padding: 0 20px ;
    }
`

const BannnerPara = styled.p`
    color: #222;
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat-Regular';
    @media( max-width: 1200px ) {
      font-size: 20px;
    }
    @media( max-width: 991px ) {
      width: 70%;
      text-align: center;
      margin: 0 auto;
      font-size: 18px ;
    }
    & br{
      @media( max-width: 991px ) {
        display: none;
      }
    }
    @media( max-width: 767px ) {
      font-size: 16px;
      display:none ;
    }
    
`

const BannerButton = styled.div`
    background: #fff;
    color: #222;
    font-family: 'Montserrat-Regular';
    border: 2px solid #ccc;
    font-size: 32px;
    font-weight: 500;
    max-width: 390px;
    margin: 10px auto 5px;
    width: 100%;
    cursor: pointer;
    padding: 5px;
    box-sizing: border-box;
    @media( max-width: 1200px ) {
      font-size: 28px;
      max-width: 300px;
    }
    @media( max-width: 991px ) {
      // margin: 0 auto 10px;
      font-size: 16px;
      max-width: 200px;
      margin: 5px auto;
    }
`


const BannerUl = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    font-family: 'Montserrat-medium';
`
const BannerLi = styled.li`
    color: #fff;
    display: inline-block;
    padding: 0 15px;
    font-size: 40px;
    font-weight: 500;
    border-right: 3px solid #fff;
    line-height: 1;
    &:last-child{
        border: none;
    }
    @media( max-width: 1300px ) {
      font-size: 35px;
    }
    @media( max-width: 1200px ) {
      font-size: 24px;
    }
`
const BannerLinks = styled.div`
    color: #222;
    font-size: 18px;
    box-sizing: border-box;
    cursor: pointer;
    &.loginPop{
      margin-bottom: 8px ;
    }
    @media( max-width: 1200px ) {
      font-size: 16px;
    }
    @media( max-width: 1024px ) {
      margin: 10px auto;
    }
    @media( max-width: 991px ) {
      font-size: 16px;
    }
    @media( max-width: 850px ) {
      color: #000;
    }
`
const SeeMoreArrow = styled.div`
  display: none ;
  margin: 0px auto 15px;
  background: #0a0a0a;
  cursor: pointer;
  &.landing-arrow {
    margin: 0px auto 70px;
    background: #0a0a0a;
    @media (max-width: 767px) {
      margin: 0px auto 20px;
      display: block ;
      justify-content: center;
      display: flex;
    }
  },
  svg {
    color: #fff;
    font-size: 21px;
    cursor: pointer;
    @media( max-width: 767px) {
      font-size: 32px;
      z-index: 9;
    }
  }
`

const MobBannerSection = styled.div`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
box-sizing: border-box;
@media( max-width: 767px ){
  flex-direction: column;
  height: 500px;
}
`



const MobBannerImage = styled.div`
  width: 100% ;
  box-sizing: border-box;
  background-image: url('/assets/banner.jpg');
  background-repeat: no-repeat;
  background-position: center -30px;
  background-size: cover;
  position: relative;
  z-index: 1;
  @media( max-width: 767px ) {
    height: 100% ;
  }
`



const MobBannerContent = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: #e6e9ec;
  text-align: center;
  
`

const MobBannerMainContainer = styled.div`
padding: 5px 20px 10px ;
box-sizing: border-box ;
`

const MobBannerHeading = styled.div`
  font-size: 20px;
  color: #000;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0px;
  background: #fff;
  padding: 10px 0 ;
`
const MobHeadingNav = styled.div`
font-size: 18px;
color: #000 ;
font-family: 'Montserrat-regular';
line-height: 1.4;
padding: 10px 5px 0 5px;
& .afterVide{
  display: none ;
}

`




const BTestLogoutBanner = ({topRef}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('landingPage')

  const [width, setWidth] = useState(null);
  const breakpoint = 1024;

  useEffect( () => { 
    if ( typeof window !== 'undefined' ) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
      setWidth(window.innerWidth) ;
      //window.addEventListener('load', () => setWidth(window.innerWidth));
    }
    
  }, [] ) ;

  const scrollToTop = () => {
    window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
    })
  }

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
    {width > breakpoint ? 
      <>
      <BannerSection>
        <BannerLeft className="banner-image">
        <BannerUl>
          <BannerLi>{t(`loggedOutBanner.network`)}</BannerLi>
          <BannerLi>{t(`loggedOutBanner.blog`)}</BannerLi>
          <BannerLi>{t(`loggedOutBanner.group`)}</BannerLi>
          <BannerLi>{t(`loggedOutBanner.marketplace`)}</BannerLi>
        </BannerUl>
      </BannerLeft>
        <BannerRight>
          <BannerHeading>{t(`loggedOutBanner.title`)} <br/> {t(`loggedOutBanner.title2`)}</BannerHeading>
          <BannnerPara>{ ReactHtmlParser(t(`loggedOutBanner.paragraph`))}</BannnerPara>
          <BannerButton onClick={() => openSignupModal()}>{t(`loggedOutBanner.joinInBtnText`)}</BannerButton>
          <BannerLinks onClick={() => openLoginModal()} className="loginPop">{t(`loggedOutBanner.logIn`)}</BannerLinks>
          <BannerLinks onClick={() => router.push('/what-is-artmo')} >{t(`loggedOutBanner.whatIsArtmo`)} &nbsp; {t(`loggedOutBanner.learnMore`)}
          </BannerLinks>
          <LanguagePopup className="bBannerSec"/>
        </BannerRight>
      </BannerSection>
      <SeeMoreArrow className='landing-arrow'>
        <FaChevronDown onClick={() => scrollToTop()} />
      </SeeMoreArrow>
      </>
    :
      <>
        <MobBannerSection>
          <MobBannerImage className="banner-image">
            <MobBannerHeading>{t(`loggedOutBanner.title`)} {t(`loggedOutBanner.title2`)}</MobBannerHeading>
          </MobBannerImage>
          <MobBannerContent>
            <MobHeadingNav className="banner-tags">{t(`loggedOutBanner.network`)} <span>|</span> {t(`loggedOutBanner.blog`)} <span>|</span> {t(`loggedOutBanner.group`)} <span>|</span> {t(`loggedOutBanner.videos`)} <span className="afterVide">|</span> {t(`loggedOutBanner.marketplace`)} <span>|</span> {t(`loggedOutBanner.exhibition`)} <span>|</span> {t(`loggedOutBanner.gallery`)}</MobHeadingNav>
            <MobBannerMainContainer> 
              <BannnerPara>{ ReactHtmlParser(t(`loggedOutBanner.paragraph`))}</BannnerPara>
              <BannerButton onClick={() => openSignupModal()}>{t(`loggedOutBanner.joinInBtnText`)}</BannerButton>
              <BannerLinks onClick={() => openLoginModal()} className="loginPop">{t(`loggedOutBanner.logIn`)}</BannerLinks>
              <BannerLinks onClick={() => router.push('/what-is-artmo')} >{t(`loggedOutBanner.whatIsArtmo`)} &nbsp; {t(`loggedOutBanner.learnMore`)}
              </BannerLinks>
              <LanguagePopup className="bBannerSec"/>
            </MobBannerMainContainer>     
          </MobBannerContent>
        </MobBannerSection>
        <SeeMoreArrow className='landing-arrow'>
          <FaChevronDown onClick={() => scrollToTop()} />
        </SeeMoreArrow>
      </>
  }
  </BannerContainerLogout>
  </BannerWrapper>
  )
}

export default BTestLogoutBanner

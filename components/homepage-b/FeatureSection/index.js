import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import JoinSecBg from '../../../public/assets/Sign-Up-Feature.gif'
import SignupButton from '../../Header/SignupButton'
import LoginButton from '../../Header/LoginButton'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  background: #000;
`

const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  background: url('/assets/Sign-Up-Feature.gif') no-repeat left center;
  background-size: cover;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 1094px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
  @media (max-width: 767px) {
    background-position: top -70px right -250px;
  }
`


const FeatureHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0 0 25px;
  font-style: normal;
  font-weight: normal;
  font-size: 50px;
  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 24px;
    padding-right: 140px;
  }
`
const FeaturePara = styled.p`
  padding: 0;
  margin: 0 0 25px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.7;
  color: #ccc;
  span {
    font-size: 20px;
    @media (max-width: 767px) {
      font-size: 16px;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding-right: 140px;
  }
`

const FeatureLeftContainer = styled.div`
  width: 100%;
  max-width: 640px;
  padding: 80px 15px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
  button {
    height: 38px;
    width: 167px;
    font-size: 16px;
    color: #222;
    @media (max-width: 479px) {
      width: 50%;
    }
  }
  button + button {
    background: transparent;
    color: #fff;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const JoinArtMoWrapper = styled.div`
  background: #0A0A0A;
  padding: 50px 0;
  button {
    height: 38px;
    width: 167px;
    font-size: 16px;
    color: #222;
    @media (max-width: 479px) {
      width: 50%;
    }
  }
  button + button {
    background: transparent;
    color: #fff;
  }
  
`
const FeatureContainerMobile =  styled.div`
  width: auto;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  height: 100%;
`
const JoinOuterSection = styled.div`
    max-width: 575px;
    margin: auto;
    display: block;
    width: 100%;  
`
const JoinInnerSection = styled.div`
  padding: 10px 0;
  background-image: url('/assets/Sign-Up-Feature.gif');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  h2 {
    font-weight: 400;
    font-size: 24px;
    color: #fff;
    margin-bottom: 60px;
  }
  h3 {
    padding: 0;
    margin: 0 0 25px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 1.7;
    color: #ccc;
    border-left: 0;
  }
  p {
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 0px;
    line-height: 1.6em;
  }
`
const JoinTopContent = styled.div`
padding-right: 190px;
@media (max-width:768px) {
      padding-right: 0px;
}
@media (max-width:350px) { 
  padding-right: 30px;
}
`
const JoinExpand = styled.div`
    display: block;
    position: relative;
    padding: 0;
    color: #fff;
    font-size: 14px;
    margin-top: 80px;
    cursor: pointer;
    svg {
      color: #fff;
      cursor: pointer;
      float:right;
      margin-top: 5px;
    }
    
    
`
const JoinExpandSection = styled.div`
  margin-top: 10px;
  transition: 3s;
 overflow: hidden;
`
const JoinBottomButtons = styled.div`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
    -ms-flex-align: center;
        align-items: center;
-webkit-box-pack: justify;
    -ms-flex-pack: justify;
        justify-content: space-between;
margin: 10px 0 0 0;
@media only screen and (min-width: 480px) and (max-width: 767px) {
  width: 50%;
  margin: 10px auto;  
}
`


const FeatureSection = () => {
  const [ showReadMore, setReadMore] = useState(false) ;
  const [width, setWidth] = useState(null);
  const breakpoint = 767;
  //console.log(width);
  useEffect( () => { 
    if ( typeof window !== 'undefined' ) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
      setWidth(window.innerWidth) ;
      //window.addEventListener('load', () => setWidth(window.innerWidth));
    }
    
  }, [] ) ;

  const dispatch = useDispatch()
  const { t } = useTranslation(['landingPageB','translation'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const joinInSectionContent = useSelector((state) => state.root.staticContent.joinInSectionContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('Join_in_section_landing_page', t, 'joinInSection'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])
  const showReadMoreHandler = () => {
    showReadMore ? setReadMore(false) : setReadMore(true)
  }
  if ( width < breakpoint ) {
    //let mobileJoinInSection = joinInSectionContent.split('<br><br>');
    // if ( mobileJoinInSection.length === 1 ) {
    //   //mobileJoinInSection = joinInSectionContent.split('<br /><br />');
    //   mobileJoinInSection = joinInSectionContent.replace('<p>', ' ').split('</p>');
    // }
    let mobileJoinInSection = joinInSectionContent.replace('<p>', ' ').split('</p>');
    const readMoreIcon = showReadMore ? <FaChevronUp/> : <FaChevronDown/> ;
    return (
      <JoinArtMoWrapper>
      <FeatureContainerMobile>
        <JoinOuterSection>
          <JoinInnerSection>
            <JoinTopContent>
              <h2>{t(`landingPage:joinInSection.joinInTitle`)}</h2>
              <h3>{ReactHtmlParser(mobileJoinInSection[0])}</h3>
              <p>{ReactHtmlParser(mobileJoinInSection[1])}</p>
            </JoinTopContent>
            <JoinExpand onClick={showReadMoreHandler}>Read more... {readMoreIcon}</JoinExpand>
            {
              showReadMore && (<JoinExpandSection>
              <p>{ReactHtmlParser(mobileJoinInSection[2])}</p>
              <h3>{ReactHtmlParser(mobileJoinInSection[3])}</h3>
              <p>{ReactHtmlParser(mobileJoinInSection[4])}</p>
              <h3>{ReactHtmlParser(mobileJoinInSection[5])}</h3>
              <p>{ReactHtmlParser(mobileJoinInSection[6])}</p>
            </JoinExpandSection>)
            }
          </JoinInnerSection>
          <JoinBottomButtons>
            <SignupButton />
            <LoginButton />
          </JoinBottomButtons>
        </JoinOuterSection>
      </FeatureContainerMobile>
    </JoinArtMoWrapper>
    )
  }

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <FeatureLeftContainer className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <FeatureHeading>{t(`joinInSection.joinInTitle`)}</FeatureHeading>
            <FeaturePara>{ReactHtmlParser(joinInSectionContent)}</FeaturePara>
            <SignupButton />
            <LoginButton />
          </FeatureLeftContainer>
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default FeatureSection

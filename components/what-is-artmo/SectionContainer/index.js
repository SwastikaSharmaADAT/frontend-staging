import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import SectionContent from '../SectionContent'
import {FaAngleDown} from 'react-icons/fa'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import ReactHtmlParser from 'react-html-parser'
import { isLoginToken } from '../../../utilities/authUtils'
import {  initiateNewThread, fetchConversations, populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'
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

import { SectionWrapperBanner , SectionLeft , SectionRight, TopListing, MainContentBox, ContentBoxInner, SignInButton, ArtmoLinks, SectionWrapperLearnMore, LearnMoreContainer, LearnMoreBtn, LearnMoreTabbingOuter, LearnMoreTabbingUl, TabingContent, TabingSingleContent, LearnMoreTabbingLi} from '../styled.js'

const SectionContainer = () => {
  const { t } = useTranslation('staticPages', 'landingPage')
  const router = useRouter()
  const dispatch = useDispatch()
  const tabContent = useSelector((state) => state.root.staticContent.whatIsArtmoTabContent)
  const mainContent = useSelector((state) => state.root.staticContent.whatIsArtmoMainContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const [ activeTab, setTabActive ] = useState() 
  const [ scrollClicked, setscrollClicked ] = useState(false)


  const whatIsArtmoTabIds = [
    'WHAT_IS_ARTMO_the_art_network',
    'WHAT_IS_ARTMO_art_enthusiast',
    'WHAT_IS_ARTMO_artist',
    'WHAT_IS_ARTMO_gallery',
    'WHAT_IS_ARTMO_shop',
  ]

  useEffect( ()=> {
    //dispatch (getContent(whatIsArtmoTabIds[0], t, 'whatisArtmoMain'))
    dispatch (getContent(whatIsArtmoTabIds[0], t, 'whatisArtmoMain'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage ])
  
  useEffect(() => {
    dispatch(getContent(whatIsArtmoTabIds[1], t, 'whatIsArtmo'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  const toggleTab = ( index ) => {
    setTabActive( index ) 
    dispatch(getContent(whatIsArtmoTabIds[index], t, 'whatIsArtmo',''))
    setTimeout(() => {
      window.scrollTo({
        top: 600,
        left: 0,
        behavior: 'smooth',
      })
    }, 500)
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

  const helpClickHandler = async () => {
    if (router.pathname.includes('messages')) {
      const { uuid } = userData.adminDetails
      const params = router.query
      params.userID = uuid
      router.push({ pathname: '/messages', query: params })
      dispatch(fetchConversations(true))
      window.scrollTo(0, 0)
      return
    }

    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }

  const clickHandler = () => {
    //onClose()
    if (isLoginToken()) {
      helpClickHandler()
    } else {
      window.location.href = `mailto:hello@artmo.com`
    }
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined')
    setscrollClicked( true )
    setTimeout(scrollBottom, 1000);
  }
  function scrollBottom() {
    window.scrollTo({
      top: 800,
      left: 100,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <SectionWrapperBanner>
        <SectionLeft className="w40"></SectionLeft>
        <SectionRight className="w60">
          <TopListing>
            <ul className="mobHide">
              <li>{t(`landingPage:loggedOutBanner.network`)}</li>
              <li>{t(`landingPage:loggedOutBanner.blog`)}</li>
              <li>{t(`landingPage:loggedOutBanner.group`)}</li>
              <li>{t(`landingPage:loggedOutBanner.videos`)}</li>
              <li>{t(`landingPage:loggedOutBanner.marketplace`)}</li>
            </ul>
            <p className="mobHide">{t(`landingPage:loggedOutBanner.exhibition`)} | {t(`landingPage:loggedOutBanner.gallery`)} ...{t(`staticPages:whatIsArtmo.muchMore`)}</p>
            <p className='mobDisp'>{t(`landingPage:loggedOutBanner.network`)} | {t(`landingPage:loggedOutBanner.blog`)} | {t(`landingPage:loggedOutBanner.group`)} | {t(`landingPage:loggedOutBanner.videos`)} | {t(`landingPage:loggedOutBanner.marketplace`)} {t(`landingPage:loggedOutBanner.exhibition`)} | {t(`landingPage:loggedOutBanner.gallery`)} ...{t(`staticPages:whatIsArtmo.muchMore`)}</p>
          </TopListing>
          <MainContentBox>
            <ContentBoxInner>
              { ReactHtmlParser(mainContent) }
              { !isLoginToken() && <SignInButton onClick={()=>openSignupModal()} >{t(`landingPage:loggedOutBanner.joinInBtnText`)}</SignInButton>}
              {
                !isLoginToken() && (
                  <>
                  <div onClick={()=>openLoginModal()} >{t(`landingPage:loggedOutBanner.logIn`)}</div><br/>
                  <div onClick={()=>clickHandler()} >{t(`staticPages:whatIsArtmo.needHelp`)}</div>
                  </>
                )
              }
            </ContentBoxInner>
          </MainContentBox>
        </SectionRight>
      </SectionWrapperBanner>
      <SectionWrapperLearnMore>
        <LearnMoreContainer>
          <LearnMoreBtn onClick={() => scrollToTop()}>
            <span>{t(`landingPage:loggedOutBanner.learnMore`)}... <br/>
            <FaAngleDown/></span>
          </LearnMoreBtn>
          <LearnMoreTabbingOuter className={scrollClicked ? 'showSection': 'hideSection'}>
            <LearnMoreTabbingUl>
              <LearnMoreTabbingLi onClick={ ()=> toggleTab(1)} className={ activeTab === 1 && "active"} >{t(`staticPages:whatIsArtmo.member`)}</LearnMoreTabbingLi>
              <LearnMoreTabbingLi onClick={ ()=> toggleTab(2)} className={ activeTab === 2 && "active"}>{t(`staticPages:whatIsArtmo.artist`)}</LearnMoreTabbingLi>
              <LearnMoreTabbingLi onClick={ ()=> toggleTab(3)} className={ activeTab === 3 && "active"}>{t(`staticPages:whatIsArtmo.pages`)}</LearnMoreTabbingLi>
              <LearnMoreTabbingLi onClick={ ()=> toggleTab(4)} className={ activeTab === 4 && "active"}>{t(`staticPages:whatIsArtmo.marketplace`)}</LearnMoreTabbingLi>
            </LearnMoreTabbingUl>
            <TabingContent>
              {
                activeTab && (
                  <TabingSingleContent className="active">
                    {ReactHtmlParser(tabContent)}
                    { !isLoginToken() && <SignInButton className="tabSectionContent" onClick={()=>openSignupModal()} >{t(`landingPage:loggedOutBanner.joinInBtnText`)}</SignInButton>}
                  </TabingSingleContent>
                )
              }
            </TabingContent>
          </LearnMoreTabbingOuter>
        </LearnMoreContainer>
      </SectionWrapperLearnMore>
    </>
  )
}

export default SectionContainer

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../../components/NewsFeed/RightSection'
import HeadingSection from '../../components/mobile-app/HeadingSection'
import SectionContent from '../../components/mobile-app/SectionContent'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  margin-bottom: 30px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
  }
`

const MobileApp = () => {
  const dispatch = useDispatch()
  const {t} =useTranslation('translation')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const mobileAppContent = useSelector((state) => state.root.staticContent.mobileAppContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getContent('Mobile_App_header', t, 'mobileApp', 'header'))
    dispatch(getContent('Mobile_App_step1', t,'mobileApp', 'step1'))
    dispatch(getContent('Mobile_App_step2', t, 'mobileApp', 'step2'))
    dispatch(getContent('Mobile_App_step3', t, 'mobileApp', 'step3'))
    dispatch(getContent('Mobile_App_step4', t, 'mobileApp', 'step4'))
    dispatch(getContent('Mobile_App_note', t, 'mobileApp', 'note'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <Head>
        <title>Mobile App | ARTMO</title>
        <meta name="description" content="How to start ARTMO from your mobile's home-screen With 3 simple steps you'll have ARTMO on your mobile home-screen, fully functional on all devices." />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <HeadingSection content={mobileAppContent} />
            <SectionContent content={mobileAppContent} />
          </LeftContainer>

          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(MobileApp)

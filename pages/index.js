import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isLoginToken } from '../utilities/authUtils'
import { getLatestArticles } from '../modules/landingPage/landingPageSlice'
import { getOrderDetails } from '../modules/subscription/subscriptionSlice'
import { isEmptyObj } from '../utilities/checkEmptyObject'
import { getUserData, setReRenderLandingPage } from '../modules/profile/myProfileSlice'
import HomepageBanner from '../components/homepage/Banner'
import FeatureSection from '../components/homepage/FeatureSection'
import CollectionSection from '../components/homepage/CollectionSection'
import ArtNetworkSection from '../components/homepage/ArtNetworkSection'
import NewCollectionSection from '../components/homepage/NewCollectionSection'
import NewInBuzzSection from '../components/homepage/NewInBuzzSection'
import Videos from '../components/homepage/Videos'
import Exbitions from '../components/homepage/Exhibitions'
import PictureOfTheDay from '../components/homepage/PictureOfTheDay'
import LogoutBanner from '../components/homepage/LogoutBanner'


import HomepageBannerB from '../components/homepage-b/Banner'
import FeatureSectionB from '../components/homepage-b/FeatureSection'
import CollectionSectionB from '../components/homepage-b/CollectionSection'
import ArtNetworkSectionB from '../components/homepage-b/ArtNetworkSection'
import NewCollectionSectionB from '../components/homepage-b/NewCollectionSection'
import NewInBuzzSectionB from '../components/homepage-b/NewInBuzzSection'
import VideosB from '../components/homepage-b/Videos'
import ExbitionsB from '../components/homepage-b/Exhibitions'
import PictureOfTheDayB from '../components/homepage-b/PictureOfTheDay'
import LogoutBannerB from '../components/homepage-b/LogoutBanner'


import useGoogleOptimize from '@react-hook/google-optimize'
import publicRoute from '../HOC/publicRoute'
import staticFilesArray from '../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'
import BTestLogoutBanner from '../components/homepage/BTestLogoutBanner'
import BreakingNewsPopup from '../components/BreakingNewsPopup'

const HomePageWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #0a0a0a !important;
`

const HomePage = () => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const params = new URLSearchParams(router.location.search)
  const params = router.query

  const [newsOpen, setNewsOpen] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const [width, setWidth] = useState( typeof window !== 'undefined' && window.innerWidth  );
  const breakpoint = 1024;
  useEffect( () => { 
    typeof window !== 'undefined' &&  window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [] ) ;
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)
  // const variant = useGoogleOptimize('EfkUJVpNR-6fAKKlC9YcCw', [false, true])

  const variant = true


  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])
  // To call api again after logout
  useEffect(() => {
    if (rerender) {
      dispatch(getLatestArticles())
      setTimeout(() => dispatch(setReRenderLandingPage(false)), 5000)
    }
  }, [dispatch, rerender])

  useEffect(() => {
    /**get user details on page render */
    if (
      loggedInUsername &&
      (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
      isLoginToken()
    )
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
  }, [dispatch, loggedInUsername, userData, userInfo])

  useEffect(() => {
    dispatch(getLatestArticles())
  }, [dispatch])

  useEffect(() => {
    if (params.webQuoteId && isLoginToken()) {
      const refId = params.webQuoteId && JSON.parse(params.webQuoteId)
      dispatch(getOrderDetails(refId, 'landing'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const topRef = useRef(null)

  const scrollTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <Head>
        <title>ARTMO, The Social Art Platform | Sell Or Buy Art Commission-Free</title>
        <meta
          name="description"
          content="ARTMO Is A Social Art Platform for Artists, Art Enthusiasts, Universities & Galleries. Connect With Artists And Collectors - Discover Amazing Art."
        />
      </Head>
      {variant === null ? <HomePageWrapper>
    {isLoginToken() ? <HomepageBanner topRef={topRef} /> : 
      <LogoutBanner topRef={topRef} />
    }
    <ArtNetworkSection scrollTop={scrollTop} />
    <CollectionSection />
    <NewCollectionSection />
    <NewInBuzzSection />
    <Exbitions />
    <PictureOfTheDay />
    <Videos isLoggedIn={isLoginToken()}/>
    {!isLoginToken() && <FeatureSection />}
      </HomePageWrapper> : ( variant ? <HomePageWrapper>
        {isLoginToken() ? <HomepageBannerB topRef={topRef} /> : 
          <LogoutBannerB topRef={topRef} />
        }
        {isLoginToken() ? <></> : <BreakingNewsPopup open={newsOpen} closeModal={() => setNewsOpen(false)}/>}
        <ArtNetworkSectionB scrollTop={scrollTop} />
        <CollectionSectionB />
        <NewCollectionSectionB />
        <NewInBuzzSectionB />
        <ExbitionsB />
        <VideosB isLoggedIn={isLoginToken()}/>
        {!isLoginToken() && <FeatureSectionB />}
      </HomePageWrapper> :
      <HomePageWrapper>
        {isLoginToken() ? <HomepageBanner topRef={topRef} /> : 
          <LogoutBanner topRef={topRef} />
        }
        <ArtNetworkSection scrollTop={scrollTop} />
        <CollectionSection />
        <NewCollectionSection />
        <NewInBuzzSection />
        <Exbitions />
        <PictureOfTheDay />
        <Videos isLoggedIn={isLoginToken()}/>
        {!isLoginToken() && <FeatureSection />}
      </HomePageWrapper>
      )
      }
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(HomePage)

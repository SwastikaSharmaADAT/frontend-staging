import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isLoginToken } from '../../utilities/authUtils'
import { getLatestArticles } from '../../modules/landingPage/landingPageSlice'
import { getOrderDetails } from '../../modules/subscription/subscriptionSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData, setReRenderLandingPage } from '../../modules/profile/myProfileSlice'
import HomepageBanner from '../../components/homepage-b/Banner'
import FeatureSection from '../../components/homepage-b/FeatureSection'
import CollectionSection from '../../components/homepage-b/CollectionSection'
import GroupsSection from '../../components/homepage-b/GroupsSection'
import BreakingNewsPopup from '../../components/BreakingNewsPopup'
import ArtNetworkSection from '../../components/homepage-b/ArtNetworkSection'
import NewCollectionSection from '../../components/homepage-b/NewCollectionSection'
import NewInBuzzSection from '../../components/homepage-b/NewInBuzzSection'
import Videos from '../../components/homepage-b/Videos'
import Exbitions from '../../components/homepage-b/Exhibitions'
import PictureOfTheDay from '../../components/homepage-b/PictureOfTheDay'
import LogoutBanner from '../../components/homepage-b/LogoutBanner'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'

const HomePageWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: #0a0a0a !important ;
`

const HomePage = () => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const params = new URLSearchParams(router.location.search)
  const params = router.query

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)

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
      <HomePageWrapper>
        <BreakingNewsPopup open={true}/>
        {isLoginToken() ? <HomepageBanner topRef={topRef} /> : <LogoutBanner topRef={topRef} />}
        <ArtNetworkSection scrollTop={scrollTop} />
        <CollectionSection />
        <NewCollectionSection />
        {/* <GroupsSection /> */}
        <NewInBuzzSection />
        <Exbitions />
        <PictureOfTheDay />
        <Videos />
        {!isLoginToken() && <FeatureSection />}
      </HomePageWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(HomePage)

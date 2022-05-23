import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../../components/NewsFeed/RightSection'
import SectionContainer from '../../components/what-is-artmo/SectionContainer'
import { useRouter } from 'next/router'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const CommonContainer = styled.div`
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
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`

const WhatIsArtmo = () => {
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()
  const router = useRouter()

  const [userInfo,setuserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  useEffect(()=>{
    setuserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  return (
    <>
      <Head>
        <title>What is ARTMO? | ARTMO</title>
        <meta property="og:title" content="What is ARTMO? | ARTMO" />
        <meta property="og:url" content="https://artmo.com/what-is-artmo" />
        <meta property="og:image" content="https://d31cksjl6r6w9h.cloudfront.net/60dedfab510fef5af831c87b/media-library/autox720/04562787bc426b.jpeg" />
        <meta name="description" content="What is ARTMO? What is ARTMO? English English 简体中文 Deutsch Español Русский Português Français Italiano Polski 日本語 한국어 हिन्दी العربية עִבְרִית Bahasa Melayu বাংলা ਪੰਜਾਬੀ […]"/>
      </Head>
      <SectionContainer />
    </>
  )
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale,staticFilesArray)),
  },
})
export default publicRoute(WhatIsArtmo)

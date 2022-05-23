import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SectionContainer from '../../components/About/SectionContainer'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../../components/NewsFeed/RightSection'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'
import BelowContentAds from '../../components/YourProfile/BelowContentAds'

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
  &.adBannerSec{
    @media (min-width: 991px) and (max-width: 1100px) {
      max-width: 710px;
    }
  }
`

const About = () => {
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])
  return (
    <>
      <Head>
        <title>About | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content='About ARTMO | The Art Network, Company Details, Team overview, Terms and Conditions, Investor Relations, Carrer, Intelectual Property' />
      </Head>
      <FeedWrapper>
        <CommonContainer>
          <LeftContainer>
            <SectionContainer />
          </LeftContainer>
          <RightSection />
        </CommonContainer>
        <CommonContainer>
          <LeftContainer className='adBannerSec'>
            <BelowContentAds className="adLeftContainer"/>
          </LeftContainer>
        </CommonContainer>
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})

export default publicRoute(About)

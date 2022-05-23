import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../NewsFeed/RightSection'
import SectionContent from './SectionContent'
import HeadingSection from './HeadingSection'
import { useTranslation } from 'next-i18next'
import BelowContentAds from '../YourProfile/BelowContentAds'
import Head from 'next/head'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    max-width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    max-width: 1094px ;
  }
  @media (max-width: 1024px) {
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
  max-width: 1030px;
  margin-right: 15px;
  margin-bottom: 30px;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 880px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    max-width: 795px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    max-width: 717px ;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
  }
  .react-multiple-carousel__arrow {
    @media( max-width: 767px) {
      border: 1px solid #eeeeee;
    }
    &:before {
      @media( max-width: 767px) {
        color: #eeeeee;
      }
    }
    
  }
`

const BuzzListing = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
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
        <title>Buzz | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content={"Art news and stories | Picture of the day | Find Exhibitions | Search for Galleries | See amazing Videos"} />
        <meta name="og:title" content={"BUZZ | ARTMO | The Art Network | Connecting The Art World"} />
        <meta name="og:description" content={"Art news and stories | Picture of the day | Find Exhibitions | Search for Galleries | See amazing Videos"} />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <HeadingSection requestType="all" />
            <SectionContent />
            <BelowContentAds/>
          </LeftContainer>
          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default BuzzListing

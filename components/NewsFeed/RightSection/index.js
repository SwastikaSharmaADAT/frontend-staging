import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { isLoginToken } from '../../../utilities/authUtils'
import { getLatestArticles } from '../../../modules/landingPage/landingPageSlice'
import NewCollectionSectionRight from '../../homepage/NewCollectionSectionRight'
import VideosRight from '../../homepage/VideosRight'
import ExibitionsSection from '../../YourProfile/ExhibitionSection'
import InviteSection from '../../YourProfile/InviteSection'
import ReferralSection from '../../YourProfile/ReferralSection'
import JoinSection from '../../YourProfile/JoinSection'
import MobileApp from '../../YourProfile/MobileApp'
import NeedHelpSection from '../../YourProfile/NeedHelpSection'
import GiftCardSection from '../../YourProfile/GiftCardSection'
import POTDSection from '../../YourProfile/POTDSection'
import PromoteProfileSection from '../../YourProfile/PromoteProfileSection'
import RecentArticlesSection from '../../YourProfile/RecentArticleSection'
import RightSideAds from '../../YourProfile/RightSideAds'
import WhatIsArtmo from '../../YourProfile/WhatIsArtmo'
import { useRouter } from 'next/router'
import { getUserDataResponse } from '../../../modules/profile/myProfileSlice'
import UserProfile from '../../YourProfile/UserProfile'
import UserProfileConnections from '../../YourProfile/UserProfileConnections'

const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 328px;
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 328px;
    margin: 0 auto;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 328px;
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    max-width: 328px;
    margin: 0 auto;
  }
  @media (max-width: 479px) {
    margin: 0 auto;
  }
  @media (max-width: 599px) {
    margin: 0 auto;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`

const RightSection = ( props ) => {

  

  const router = useRouter()
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState(null)
  const accountType = userInfo && JSON.parse(userInfo).accountType
  const loggedInUserName = userInfo && JSON.parse(userInfo).personalUsername
  const [loggedInUser, setLoggedInUser] = useState(false)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (loggedInUser && loggedInUser.userRole === 'artist') && free

  const [rate, setRate] = useState(Math.random() * 10)

  useEffect(() => {
    (async  () => {
      if ( isLoginToken() && loggedInUserName ) {
        const res = await getUserDataResponse(loggedInUserName, 'fetchData')
        if (res && res.data) {
          setLoggedInUser(res.data.data.userDetails)
        }
      }
    })();
  }, [ dispatch, userInfo ])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    dispatch(getLatestArticles())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const pagesListToSkipSnooze = ['/articles']
  //console.log(loggedInUserName)

  return (
    <RightContainer>
      {isLoginToken() && accountType ? (
        <>
          {!eligible && <InviteSection/> }
          {!router.pathname.includes('referrals') && eligible && <ReferralSection/>}
          {
            props.identityUser === 'authUser' ? 
            ( <>
                <UserProfile refObject={props.refObject} />
                {props.userRoleType === 'personal' && <UserProfileConnections scrollToBlurred={props.scrollToBlurred} />}
              </>
            ) : null
            
          } 
          {!router.pathname.includes('giftcard') && <GiftCardSection filtersSection={false} />}
          {!router.pathname.includes('messages') && <NeedHelpSection filtersSection={false} />}
          {!router.pathname.includes('mobile-app') && <MobileApp />}
          <RightSideAds rate={1} />
          {
            !router.pathname.includes('messages')  && !router.pathname.includes('invite') && !router.pathname.includes('about')
          ? 
          <>
            <NewCollectionSectionRight />
            <RightSideAds interNations={true} />
            {!router.pathname.includes('badges') && <PromoteProfileSection />}
            { !router.pathname.includes('articles') && <RecentArticlesSection /> }
            { !router.pathname.includes('articles') && <ExibitionsSection /> }
            { !router.pathname.includes('articles') && <POTDSection /> }
            { !router.pathname.includes('articles') && <VideosRight/> }
          </>
          : 
          <>
            {!router.pathname.includes('badges') && <PromoteProfileSection />}
          </>
        }
        </>
      ) : (
        <>
          <JoinSection showOnlyHeading={false} />
          <NeedHelpSection filtersSection={false} />
          {!router.pathname.includes('giftcard') && <GiftCardSection filtersSection={false} />}
          {!router.pathname.includes('what-is-artmo') && <WhatIsArtmo />}
          {!router.pathname.includes('mobile-app') && <MobileApp />}
          <RightSideAds rate={1} />
          <RightSideAds interNations={true} />
          { !router.pathname.includes('about') && <NewCollectionSectionRight /> }
          {!router.pathname.includes('articles') && !router.pathname.includes('about') && <RecentArticlesSection />}
          {!router.pathname.includes('articles') && !router.pathname.includes('about') && <ExibitionsSection />}
          {!router.pathname.includes('articles') && !router.pathname.includes('about') && <POTDSection />}
          {!router.pathname.includes('articles') && !router.pathname.includes('about') && <VideosRight />}
          
        </>
      )}
    </RightContainer>
  )
}



export default RightSection

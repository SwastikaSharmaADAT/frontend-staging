import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../NewsFeed/RightSection'
import EmailPicker from './EmailPicker'
import InviteBannerHead from './InviteBannerHead'
import BelowContentAds from '../YourProfile/BelowContentAds'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const InviteContent = dynamic(() => import('./InviteContent'), {
  ssr: false
})

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
  align-items: flex-start;
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
  margin-right: 15px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`
/**
 *
 * @returns invite to Artmo component
 */
const InviteFriends = () => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation'])
  const router = useRouter()
  /**this hook will hold users contacts */

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const [contacts, setContacts] = useState([])
  /**hook to hide services Icon upon selecting one */
  const [showServices, setShowServices] = useState(true)
  const [showOther, setShowOther] = useState(true)
  /**get static content from redux */
  const howDoesThisWork = useSelector((state) => state.root.staticContent.inviteToArtmoContent.howDoesThisWork)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (userData && userData.userRole === 'artist') && free

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**call API to fetch static content for Accordions */
    dispatch(getContent('INVITE_TO_ARTMO_how_does_this_work', t, 'inviteToArtmo', 'howDoesThisWork'))
  }, [dispatch, appLanguage])


  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])


  useEffect(() => {
    /**get user details on page render */
    if (eligible) {
      router.push('/referrals')
    }
  }, [dispatch, loggedInUsername, userData])


  return (
    <>
      <Head>
        <title>Invite | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <InviteBannerHead />
            <InviteContent
              howDoesThisWork={howDoesThisWork}
              showServices={showServices}
              setShowServices={setShowServices}
              setContacts={setContacts}
              setShowOther={setShowOther}
              contacts={contacts}
              userData={userData}
            />
            {/* <BelowContentAds/> */}
          </LeftContainer>
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default InviteFriends

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import RightSection from '../NewsFeed/RightSection'
import ReferralsBannerHead from './ReferralsBannerHead'
import ReferralProgress from './ReferralProgress'
import ShareLink from './ShareLink'
import SingleItem from './SingleItem'
import BelowContentAds from '../YourProfile/BelowContentAds'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import ProgressBar from '@ramonak/react-progress-bar'
import dashed from '../../public/assets/dashed-line.svg'
import { toggleLoading } from '../../modules/auth/authSlice'
import Button from '../UI/Button'
import { referralUsers, referralCode } from '../../modules/profile/myProfileSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { getPlans, subscriptionCheckout } from '../../modules/subscription/subscriptionSlice'
import { notifyError, notifySuccess, setSubscription, setUserData } from '../../modules/profile/myProfileSlice.js'
import { event } from '../../lib/gtag.js'
import { getVendorSubscription } from '../../modules/dashboard/dashboardSlice'
import router from 'next/router'
import ModalComponent from '../UI/Modal'
import FollowersPopup from './FollowersPopup'
import ReactHtmlParser from 'react-html-parser'
import {  initiateNewThread, fetchConversations, populateChatBox, setMessageState } from '../../modules/messages/messagesSlice'

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
  @media (min-width: 1025px) {
    min-height: 800px;
  }
`

const Cta = styled.div`
  text-align: center;
  width: 100%;
  font-size: 20px;
  margin: 10px auto;
  max-width: 800px;
  line-height: 1.5;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
  @media (max-width: 460px) {
    font-size: 14px;
  }
`
const HeaderTwo = styled.div`
  font-size: 20px;
  margin: 5px auto 0;
  flex: 0 0 100%;
  text-align: center;
  line-height: 2;
  &.refHeader{
    font-family: 'Montserrat-medium';
  }
  &.eligibleText{
    font-size: 16px;
    @media( max-width: 767px ) {
      font-size: 14px;
      padding: 10px;
    }
  }
  &.goalCompleted {
    margin-bottom: 10px;
  }
`
const ProgressContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  padding: 10px 20px 20px;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid #ccc;
  background: #E6E9EC ;
  button {
    max-width: 220px;
    margin: auto;
    @media( max-width: 767px ){
      margin-bottom: 15px;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    border: none;
    padding: 0;
    margin-bottom: 10px ;
  }
`

const ProgressBarContainer = styled.div`
  flex: 1;
  position: relative;
`

const ProgressDash = styled.img`
  width: 100%;
  margin-bottom: -20px;
  @media (max-width: 768px) {
    height: 20px;
  }
`

const ProgressLabel = styled.div`
  background: #000;
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  position: absolute;
  bottom: 50px;
  height: 40px;
  line-height: 50px;
  width: 60px;
  text-align: center;
  :after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 30px 0 30px;
    border-color: #000 transparent transparent transparent;
    top: 40px;
    position: absolute;
    left: 0;
  }
`

const Badge = styled.img`
  width: 47px;
  height: 47px;
`

const SeeAllSection = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
align-items: center;
margin: 20px;
`

const SeeAll = styled.p`
  font-size: 16px;
  color: #666;
  cursor: pointer;
  text-align: center;
  margin-bottom: 5px;
`

const Offer = styled.p`
  font-size: 16px;
  //font-weight: bold;
  color: #222;
  cursor: pointer;
  text-align: center;
  //margin-bottom: 30px;
  @media( max-width: 767px ) {
    font-size: 14px ;
  }
`

const ClaimMembershipContainer = styled.div`
  width: 100% ;
  margin: 0px auto 15px;
  & .refCompleted{
    text-align: center;
  }
  ol {
    font-size: 14px;
    color: #666;
    line-height: 2;
  }
`

const ProgressList = styled.div`
  display: flex;
  flex-direction: column;
`

/**
 *
 * @returns invite to Artmo component
 */
const InviteFriends = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('referrals')
  /**this hook will hold users contacts */

  const userData = useSelector((state) => state.root.myProfile.userData)
  const goal = 10;

  const referrals = useSelector((state) => state.root.myProfile.referralUsers)
  const code = useSelector((state) => state.root.myProfile.referralCode)
  const langCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const subscriptions = useSelector((state) => state.root.subscription.subscriptions)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (userData && userData.userRole === 'artist') && free

  const [showReferrals, setShowReferrals] = useState(false)
  const [confirmedReferrals, setConfirmedReferrals] = useState(false)

  const plus = subscriptions && subscriptions.filter((item) => {return item.title === 'plus'}).shift()

  const profileUrl = (process.browser && window.location.origin) + '/user/' + userData.username
  
  useEffect(() => {
      dispatch(referralUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

    
  useEffect(() => {
    if (referrals && referrals.length > 0) {
      const confirmed = referrals.filter((item) => { 
        const dateCreated = new Date(item.dateCreated).getTime()
        const legacyRef = dateCreated < 1641229200000//Mon Jan 03 2022 18:00:00 GMT+0100
        return (item.confirmedStatus === true || legacyRef )
      })
      setConfirmedReferrals(confirmed)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, referrals])

  useEffect(() => {
    dispatch(referralCode())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPlans('artist'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  
  const acceptHandler = async () => {
      dispatch(toggleLoading(true))
      if (plus) {
        const resultAction = await dispatch(
          subscriptionCheckout({ data: { planId: plus._id, planType: 'quarterly', langCode: langCode ? langCode : 'en', referralSubscription: true }, t })
        )
        const result = await unwrapResult(resultAction)
        if (typeof window !== 'undefined' && result && result.success) {
          window.open(result.data.checkoutUrl, '_self')
        }
        dispatch(toggleLoading(false))
      }
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
    //if (isLoginToken()) {
      helpClickHandler()
    // } else {
    //   window.location.href = `mailto:hello@artmo.com`
    // }
  }

  return (
    <>
      <Head>
        <title>Referrals | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            {eligible ?
              <>
                <ReferralsBannerHead />
                <Cta>
                  { ReactHtmlParser(t(`ctaText`))}
                </Cta>
                <Offer>[{t(`limitedOffer`)}]</Offer>
                <ShareLink code={profileUrl + '?referralCode=' + code}/>
                <ProgressContainer>
                  <HeaderTwo className='refHeader'>{t(`verifiedReferrals`)}: {confirmedReferrals ? confirmedReferrals.length + (confirmedReferrals.length === goal ? ' 🎉' : '') : ''}</HeaderTwo>
                  <ReferralProgress referrals={confirmedReferrals ? confirmedReferrals.length : 0} goal={goal}/>
                  <ClaimMembershipContainer>
                    {(confirmedReferrals && confirmedReferrals.length >= goal ? 
                      <div className='refCompleted'>
                      <HeaderTwo className='eligibleText goalCompleted'>{t(`nowEligible`)}</HeaderTwo>
                      <Button className="viewAll" type="button" onClick={acceptHandler} className="btn btn-primary">{t(`claimMembership`)}</Button>
                      </div> : 
                      <>
                        <HeaderTwo className='eligibleText' >{t(`howToShare`)}</HeaderTwo>
                      </>)}
                  </ClaimMembershipContainer>
                  <Button type="button" onClick={() => setShowReferrals(true)} className="btn btn-primary">{t(`viewAllReferrals`)}</Button>
                </ProgressContainer>
                <SeeAllSection>
                  <SeeAll onClick={()=>clickHandler()} >{t(`needHelpText`)}</SeeAll>
                  <SeeAll onClick={() => router.push('/subscriptions')}>{t(`seePlans`)}</SeeAll>
                </SeeAllSection>
                
              </>
            : <></>
          }
          </LeftContainer>
        </YourProfileContainer>
      </FeedWrapper>
      {showReferrals && (
        <ModalComponent closeOnOutsideClick={true} isOpen={showReferrals} closeModal={() => setShowReferrals(false)}>
          <FollowersPopup
            setShowReferrals={setShowReferrals}
            referrals={referrals}
          />
        </ModalComponent>
      )}
    </>
  )
}

export default InviteFriends

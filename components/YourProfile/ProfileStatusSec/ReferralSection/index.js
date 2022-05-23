import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getNotices, deleteNotice } from '../../../../modules/profile/myProfileSlice'
import SingleNotice from '../SingleNotice'
import Button from '../../../UI/Button'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'

const ReferralContainer = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  border: 5px dashed #ddd;
  p {
    line-height: 1.5;
    color: #666;
    font-family: 'Montserrat-Medium';
    font-size: 20px;
    color: #222 ;
    margin-bottom: 15px;
  }
  @media (min-width: 1025px) {
    width: 48%;
  }
  @media (min-width: 460px) {
    margin-top: 0;
  }
  @media (max-width: 767px) {
    padding: 20px 10px;
  }
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
  }
`
const SectionHeading = styled.h1`
  text-transform: uppercase;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0 0 15px;
  font-family: 'Montserrat-Regular';
  max-width: 372px;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0 0 10px;
  }
`
const ReferralButton = styled.button`
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`
const HighlightText = styled.div`
  color: red ;
  font-size: 14px ; 
  margin-bottom: 15px ;
  font-family: 'Montserrat-Medium';
`


const ReferralSection = () => {
  const { t } = useTranslation(['profile','translation','successResponses', 'invite', 'referrals'])

  const dispatch = useDispatch()
  const router = useRouter();

  const userData = useSelector((state) => state.root.myProfile.userData)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (userData && userData.userRole === 'artist') && free

  return (
    <>
      {
        eligible ?
        <ReferralContainer>
          <SectionHeading>{t(`referrals:referralProgram`)}</SectionHeading>
          <p>{ ReactHtmlParser(t(`referrals:defCtaText`))}</p>
          <HighlightText>{t(`referrals:highlightText`)}</HighlightText>
          <ReferralButton onClick={() => router.push('/referrals')}>{t(`referrals:seeMore`)}</ReferralButton>
        </ReferralContainer>
      : null
      }
    </>
  )
}

export default ReferralSection

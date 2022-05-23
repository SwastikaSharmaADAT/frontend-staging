import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import {  useSelector } from 'react-redux'

const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 479px) {
    flex-direction: column;
  }
`

const BannerImage = styled.div`
  width: 100%;
  height: 177px;
  max-height: 177px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 767px) {
    height: 150px;
  }
  @media (max-width: 479px) {
    flex-direction: column;
  }
`
const BannerBar = styled.div`
  position: relative;
  padding: 0;
  background: #222;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  padding: 15px 30px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
  }
`

const ReferralsBannerHead = () => {
  const { t } = useTranslation('referrals')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)


  return (
    <>
      <GroupBarHeadWrapper  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}> 
        <BannerBar>{t(`title`)}</BannerBar>
      </GroupBarHeadWrapper>
    </>
  )
}

export default ReferralsBannerHead

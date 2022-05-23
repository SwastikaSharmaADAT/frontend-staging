import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import {  useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar'
import dashed from '../../../public/assets/dashed-line.svg'
import badge from '../../../public/assets/badge_gold.png'

const ProgressContainer = styled.div`
  width: 80%;
  margin: 40px auto 10px;
  display: flex;
  flex-wrap: wrap;
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
  @media (max-width: 460px) {
    transform: scale(0.6);
    top: -30px;
  }
`

const Badge = styled.img`
  width: 47px;
  height: 47px;
  @media (max-width: 460px) {
    width: 25px;
    height: 25px;
    margin-top: 12px;
  }
`


const ReferralProgress = ({referrals, goal}) => {

  const { t } = useTranslation('referrals')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const barReferrals = referrals > goal ? goal : referrals;

  return (
    <>
      <ProgressContainer>
        <ProgressBarContainer>
          <ProgressLabel style={{left: 'calc(' + (barReferrals * 10) + "% - 30px)", display: (referrals >= goal ? 'none' : '')}}>{referrals + "/" + goal}</ProgressLabel>
          <ProgressDash src={'/assets/dashed-line.svg'}/>
          <ProgressBar
              completed={(barReferrals / goal) * 100}
              bgColor="#222"
              baseBgColor='#fff'
              margin="0 0 15px"
              height="10px"
              borderRadius="0"
              isLabelVisible={false}
          />
        </ProgressBarContainer>
        <Badge src={'/assets/badge_gold.png'}/>
      </ProgressContainer>
    </>
  )
}

export default ReferralProgress

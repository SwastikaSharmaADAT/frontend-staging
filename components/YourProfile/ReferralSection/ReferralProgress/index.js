import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import {  useSelector } from 'react-redux'
import ProgressBar from '@ramonak/react-progress-bar'
import dashed from '../../../../public/assets/dashed-line.svg'
import badge from '../../../../public/assets/badge_gold.png'

const ProgressContainer = styled.div`
  width: 80%;
  margin: 60px auto 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const ProgressBarContainer = styled.div`
  flex: 1;
  position: relative;
`

const ProgressDash = styled.img`
  width: 100%;
  margin-bottom: -20px;
  height: 20px;
`

const ProgressLabel = styled.div`
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  position: absolute;
  bottom: 45px;
  height: 30px;
  line-height: 40px;
  width: 50px;
  text-align: center;
  :after {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 15px 25px 0 25px;
    border-color: #000 transparent transparent transparent;
    top: 30px;
    position: absolute;
    left: 0;
  }
`

const Badge = styled.img`
  width: 35px;
  height: 35px;
`


const ReferralProgress = ({referrals, goal, sidebar}) => {

  const { t } = useTranslation('referrals')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const barReferrals = referrals > goal ? goal : referrals;

  return (
    <>
      <ProgressContainer>
        <ProgressBarContainer>
        <ProgressLabel style={{left: 'calc(' + (barReferrals * 10) + "% - 30px)", display: (referrals >= goal ? 'none' : '')}}>{referrals + "/" + goal}</ProgressLabel>
          {
            sidebar ? <ProgressDash src={'/assets/dashed-line-white.svg'}/> : <ProgressDash src={'/assets/dashed-line.svg'}/>
          }
          <ProgressBar
              completed={(barReferrals / goal) * 100}
              bgColor="#222"
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

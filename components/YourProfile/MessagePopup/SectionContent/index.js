import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import LoginButton from '../../../Header/LoginButton'
import SignupButton from '../../../Header/SignupButton'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { useRouter } from 'next/router'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0px;
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 50px ;
  @media( max-width: 767px ) {
    top: 15px ;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 200px;
  }
  a {
    cursor: pointer;
    color: #666;
    margin-bottom: 5px;
  }
  span {
    margin: 0 10px;
    color: #666;
    font-size: 14px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  button {
    min-width: 130px;
    font-size: 16px;
    height: auto;
    padding: 10px 10px;
    @media (max-width: 479px) {
      min-width: 100px;
      font-size: 14px;
      height: auto;
      padding: 7px 10px;
    }
  }
`

const ButtonWrapper = styled.div`
  margin: 0 0 20px;
  &.wrapFlex {
    @media( max-width: 767px ) {
      display: flex ;
      flex-direction: column;
      text-align: center;
    }
  & button {
    @media( max-width: 767px ) {
      margin-top: 10px ;
    }
  }
  & span {
    @media( max-width: 767px ) {
      margin: 8px ;
    }
  }
  }
`
const SeeMoreBar = styled.div`
  height: 35px;
  background: #eee;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;  
`

const SectionContent = () => {
  const router = useRouter()

  const { t } = useTranslation('profile')

  return (
    <>
      <SeeMoreBar>{t(`messagePopup.seeMore`)}</SeeMoreBar>
      <SectionContentWrap>
        <ButtonWrapper className="wrapFlex">
          <SignupButton guestMode={true} />
          <span>{t(`messagePopup.or`)}</span>
          <LoginButton guestMode={true} />
        </ButtonWrapper>
        <a className="lundMore" onClick={() => openInNewTab('/what-is-artmo')}>{t(`messagePopup.learnMore`)}</a>
      </SectionContentWrap>
    </>
  )
}

export default SectionContent

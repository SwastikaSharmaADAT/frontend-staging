import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MyGiftCardContent from '../MyGiftCardContent'
import { useTranslation } from 'next-i18next'

const SectionWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0px;
  background: #fff;
  display: flex;
  flex-direction: column;
  &.rtl-ar-content {
    direction: rtl;
  }
`
const CommonHeading = styled.div`
  position: relative;
  margin: 0px;
  padding: 8px 8px 8px 16px;
  background: #000;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: rgb(255, 255, 255);
  font-size: 36px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    padding: 15px;
    font-size: 24px;
  }
`
const MyGiftCardContainer = () => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const { t } = useTranslation('giftcard')

  return (
    <>
     <SectionWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <CommonHeading>
          {t(`title`)}
        </CommonHeading>

        <MyGiftCardContent />

      </SectionWrapper>
    </>
  )
}

export default MyGiftCardContainer

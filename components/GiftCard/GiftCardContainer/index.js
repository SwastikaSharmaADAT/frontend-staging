import router from 'next/router'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import GiftCardContent from '../GiftCardContent'
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
    flex-direction: column;
    align-items: center;
    padding: 15px;
    font-size: 30px;
    button {
      margin-top: 15px;
    }
  }
`
const GiftCardContainer = () => {
    const { t } = useTranslation('giftcard')
    const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

    return (
      <>
        <SectionWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <CommonHeading>
            {t(`title`)}
            <Link href="/mygiftcard" passHref>
            <button className="btn fs-18 color-222222 font-weight-normal border-0" type="submit">{t(`linkToMyGiftCard`)}</button>  
            </Link>
          </CommonHeading>
          <GiftCardContent />
        </SectionWrapper> 
      </>
    )
  }
export default GiftCardContainer  

          
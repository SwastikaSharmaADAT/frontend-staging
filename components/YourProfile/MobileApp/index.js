import React from 'react'
import styled from 'styled-components'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const NeedHelpSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: row !important;
  padding: 0;
  max-width: 350px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  cursor: pointer;
  svg {
    font-size: 22px !important;
    margin: 0 10px 0 0 !important;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const MobileApp = () => {
  const { t } = useTranslation('rightSection')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const router = useRouter()

  return (
    <>
      <NeedHelpSectionWrap onClick={() => router.push('/mobile-app')} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <IoPhonePortraitOutline /> {t(`mobileApp`)}
      </NeedHelpSectionWrap>
    </>
  )
}

export default MobileApp

import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 34px 15px;
  background: #222;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  color: #fff;
  font-size: 36px;
  @media (max-width: 767px) {
    padding: 15px;
    font-size: 24px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const GroupBarHeading = () => {
  const { t } = useTranslation('groups')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return (
    <>
      <GroupBarHeadWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`groupbarHeading`)}</GroupBarHeadWrapper>
    </>
  )
}

export default GroupBarHeading

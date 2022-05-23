import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const HeadingWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  min-height: 93px;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
    min-height: auto;
  }
`

const HeadingSection = () => {
  const { t } = useTranslation('videos')
  return (
    <>
      <HeadingWrapper>
        <BannerBar>{t(`title`)}</BannerBar>
      </HeadingWrapper>
    </>
  )
}

export default HeadingSection

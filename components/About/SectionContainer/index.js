import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import SectionContent from '../SectionContent'
import { useSelector } from 'react-redux'

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
  padding: 34px 15px;
  background: #000;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  color: rgb(255, 255, 255);
  font-size: 36px;
  text-transform: uppercase;
  min-height: 80px;
  @media ( max-width: 450px ) {
    min-height: 130px;
  }
  @media ( min-width: 451px ) and ( max-width: 1024px ){
    min-height: 90px ;
  }
  @media (max-width: 767px) {
    padding: 15px;
    font-size: 24px;
  }
`

const TabsContainer = styled.div`
  margin: 0 20px;
  position: relative;
`

const SectionContainer = () => {
  const { t } = useTranslation('about')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <SectionWrapper  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <CommonHeading>{t(`about`)}</CommonHeading>
        <TabsContainer>
          <SectionContent />
        </TabsContainer>
      </SectionWrapper>
    </>
  )
}

export default SectionContainer

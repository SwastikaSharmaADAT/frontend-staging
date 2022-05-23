import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import NewInBuzzSectionSlider from '../NewInBuzzSectionSlider'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { useRouter } from 'next/router'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0 0 40px;
  width: 100%;
  background: #0e0e0e !important;
  @media (max-width: 767px) {
    padding: 10px 0;
  }
  .react-multiple-carousel__arrow--right {
    right: 30px !important;
    bottom: 0px;
  }
  .react-multiple-carousel__arrow--left {
    left: 30px !important;
    bottom: 0px;
  }
  .react-multiple-carousel__arrow {
    position: absolute;
    outline: 0px;
    transition: all 0.5s ease 0s;
    border-radius: 0px !important;
    z-index: 0;
    background: transparent !important;
    min-width: 30px !important;
    min-height: 30px !important;
    opacity: 1;
    cursor: pointer;
    border: 2px solid rgb(255, 255, 255) !important;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .react-multi-carousel-item {
    display: flex;
    @media (max-width: 991px) {
      justify-content: center;
    }
  }
`

const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  font-style: normal;
  font-weight: normal;
  color: #fff;
  position: relative;
  top: 70px;
  width: 100%;
  max-width: 1270px;
  margin: 0 auto 50px;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  @media (max-width: 767px) {
    font-size: 24px;
    max-width: 90%;
  }
  @media (max-width: 1270px) {
    max-width: 90%;
  }
`
const ButtonText = styled.button`
  background: #000;
  border: 1px solid #fff;
  font-style: normal;
  color: #fff;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  font-weight: normal;
  font-style: normal;
  padding: 7px 15px;
  margin: 30px auto 0;
  :hover,
  :focus {
    background: #666666;
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const NewInBuzzSection = () => {
  const { t } = useTranslation('landingPageB')
  const router = useRouter()

  const buzzArticles = useSelector((state) => state.root.landingPage.buzzArticles)

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{t(`buzzSection.title`)}</MainHeading>
          <NewInBuzzSectionSlider buzzArticles={buzzArticles} />
          <ButtonText onClick={() => openInNewTab(`/buzz`)}>{t(`buzzSection.seeMore`)}</ButtonText>
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default NewInBuzzSection

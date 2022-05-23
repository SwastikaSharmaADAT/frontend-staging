import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { FaChevronDown } from 'react-icons/fa'
import { isLoginToken } from '../../../utilities/authUtils'
import ArtworkSectionSlider from '../ArtworkSectionSlider'
import { getRecentUsers } from '../../../modules/landingPage/landingPageSlice'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 10px 0 120px;
  width: 100%;
  background: #111 !important;
  @media (min-width: 767px ) and (max-width: 1280px){
    .react-multiple-carousel__arrow--right {
      right: 13px;
    }
  }
  @media (max-width: 767px) {
    padding: 0 0 40px 0;
  }
  @media( min-width: 767px ) and (max-width: 1250px){
    padding: 0 0 50px;
  }
  .react-multi-carousel-dot-list {
    width: 100%;
    max-width: calc(100% - 200px);
    margin: 0 auto;
    bottom: 7px;
    @media (max-width: 767px) {
      font-size: 24px;
      max-width: 90%;
    }
  }
  .react-multi-carousel-list {
    overflow: visible!important;
    max-width: 1270px;
    margin: auto;
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
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    width: auto;
  }
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: -2px auto -10px;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 34px;
  position: relative;
  top: 60px;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 20px;
    top: 55px ;
  }
`

const BannerSeeMoreDiv = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: -155px auto 15px;
  display: flex;
  height: 100%;
  flex-direction: column;
  width: auto;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (max-width: 450px) {
    margin: -25px auto 30px;
  }
  @media( min-width: 450px ) and (max-width: 767px ){
    margin: -30px auto 30px;
  }
  @media( min-width: 768px ) and (max-width: 1250px ){
    margin: -130px auto 30px;
  }
`

const SeeMoreText = styled.p`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0 auto 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: normal;
  text-align: center;
  color: #fff;
`
const SeeMoreArrow = styled.div`
  margin: 0px auto 15px;
  background: #0a0a0a;
  cursor: pointer;
  &.landing-arrow {
    margin: 0px auto 70px;
    background: #0a0a0a;
    @media (max-width: 767px) {
      margin: 0px auto 10px;
    }
  },
  svg {
    color: #fff;
    font-size: 21px;
    cursor: pointer;
  }
`

const ArtNetworkSection = ({scrollTop}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('landingPageB')

  const recentUsers = useSelector((state) => state.root.landingPage.recentUsers)
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)

  // To call api again after logout
  useEffect(() => {
    if (rerender) {
      dispatch(getRecentUsers())
    }
  }, [dispatch, rerender])

  useEffect(() => {
    dispatch(getRecentUsers())
  }, [dispatch])

  const scrollToTop = () => {
    scrollTop()
    // if (typeof window !== 'undefined')
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth',
    //   })
  }

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{t(`usersListing.title`)}</MainHeading>
          <ArtworkSectionSlider recentUsers={recentUsers} />
          
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default ArtNetworkSection

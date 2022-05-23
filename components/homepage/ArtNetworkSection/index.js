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
  padding: 90px 0;
  width: 100%;
  background: #0A0A0A !important;
  @media (min-width: 767px ) and (max-width: 1280px){
    .react-multiple-carousel__arrow--right {
      right: 13px;
    }
  }
  @media (max-width: 767px) {
    padding: 0px 0 40px 0;
    bottom: 60px;
  }
  @media( min-width: 767px ) and (max-width: 1250px){
    padding: 132px 0;
  }
  .react-multiple-carousel__arrow--right {
    right: 5px !important;
    top: 23px;
  }
  .react-multiple-carousel__arrow--left {
    left: 5px !important;
    top: 23px;
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
  margin: -2px auto -30px;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  position: relative;
  top: 60px;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 22px;
    top: 68px ;
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
  @media( max-width: 767px) {
    display: none ;
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
  @media( max-width: 767px) {
    display: none ;
  }
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
  @media( max-width: 767px) {
    display: none ;
  }
`

const ArtNetworkSection = ({scrollTop}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('landingPage')

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
          <BannerSeeMoreDiv>
            {!isLoginToken() && <SeeMoreText>{t(`usersListing.seeMore`)}</SeeMoreText>}
            <SeeMoreArrow className={isLoginToken() && 'landing-arrow'}>
              <FaChevronDown onClick={() => scrollToTop()} />
            </SeeMoreArrow>
          </BannerSeeMoreDiv>
          <MainHeading>{t(`usersListing.title`)}</MainHeading>
          <ArtworkSectionSlider recentUsers={recentUsers} />
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default ArtNetworkSection

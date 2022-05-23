import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import VideoSectionSlider from '../../VideoSectionSlider'

const FeatureWrapper = styled.div`
position: relative;
margin: 0 0 17px;
padding: 30px 0;
width: 100%;
background: #fff;
box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
height: 270px;
@media (max-width: 767px) {
  padding: 15px 0;
  height: 240px;
}
@media( max-width: 450px ) {
  height: 220px;
}
.react-multiple-carousel__arrow--right{
  right: 5px !important;
  @media( max-width: 767px ) {
    right: 10px !important;
    top: 60px ;
  }
  @media( max-width: 450px ) {
    top: 50px ;
  }
}
.react-multiple-carousel__arrow--left{
  right: 45px !important;
  @media( max-width: 767px ) {
    right: inherit !important;
    top: 60px ;
  }
  @media( max-width: 450px ) {
    top: 50px ;
  }
}
.react-multiple-carousel__arrow{
  position: absolute;
  outline: 0px;
  transition: all 0.5s ease 0s;
  border-radius: 0px;
  z-index: 0;
  background: transparent;
  min-width: 30px;
  min-height: 30px;
  opacity: 1;
  cursor: pointer;
  border: 1px solid rgb(0, 0, 0) !important;
}
`

const FeatureContainer = styled.div`
  position: relative;
  padding: 0 30px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (max-width: 767px) {
    padding: 0 15px;
  }
  &.NoData {
    padding-bottom: 30px;
    @media (max-width: 767px) {
      padding-bottom: 0px;
    }
    h1 {
      @media (max-width: 767px) {
        margin-bottom: 0px;
      }
    }
  }
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: normal;
  text-align: left;
  color: #222;
  max-width: calc(100% - 80px);
  display: flex;
  justify-content: space-between;
  z-index: 1;
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0 0 10px;
    max-width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  @media (max-width: 479px) {
    font-size: 18px;
    margin: 0 0 -15px;
    max-width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .slider-title {
    @media ( max-width: 450px ){
        width: 70%;
    }
  }
`
const SeeMoreBtn = styled.button`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eeeeee;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
  @media (max-width: 479px) {
    margin: 10px auto 0;
    font-size: 14px;
    padding: 5px 10px;
    position: relative;
    left: 38%;
    top: -34px ;
  }
  /* @media screen and (-webkit-min-device-pixel-ratio: 0) {
    @media (min-width: 1025px) {
      position: relative;
      top: 2px;
    }
  } */
  @media (min-width: 1025px) {
    @media not all and (min-resolution: 0.001dpcm) {
      @media {
        position: relative;
        top: 2px;
      }
    }
  }
`

const VideoSlider = ({ title, videos, type, redirectHandler }) => (
  
  
  <>
    <FeatureWrapper>
      <FeatureContainer className={videos && videos.length === 0 ? 'NoData' : null}>
        <MainHeading>
          <div className="slider-title">{title}{' '}</div>
          {videos && videos.length > 0 && (
            <SeeMoreBtn onClick={() => redirectHandler(`/${type}`)}>See More</SeeMoreBtn>
          )}
        </MainHeading>
        <VideoSectionSlider videos={videos}/>
      </FeatureContainer>
    </FeatureWrapper>
  </>
)

VideoSlider.propTypes = {
  title: PropTypes.string,
  videos: PropTypes.array,
  type: PropTypes.string,
  redirectHandler: PropTypes.func,
}

export default VideoSlider

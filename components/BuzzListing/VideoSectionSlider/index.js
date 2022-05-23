import React, {useState} from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import PropTypes from 'prop-types'
import 'react-multi-carousel/lib/styles.css'
import SliderItem from './SliderItem'
import VideoPopup from '../../Videos/SectionContent/VideoPopup'

const NewInBuzzSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  @media( min-width: 768px ) and ( max-width: 1024px ){
    height: 200px;
  }
  .react-multi-carousel-list {
    @media( max-width: 767px ){
      padding-top: 0 !important ;
    }
    &.SingleItem {
      @media (min-width: 768px) {
        justify-content: center;
      }
    }
  }
  .react-multi-carousel-list {
    @media ( min-width: 768px ) {
      margin: -47px -6px;
    }
  }
  .react-multi-carousel-item {
    overflow: hidden;
  }
  .react-multiple-carousel__arrow {
    border: 1px solid #000;
    &:hover {
      border: 1px solid #000;
      background: transparent;
    }
  }
  .react-multiple-carousel__arrow::before {
    color: #000;
  }
  .react-multiple-carousel__arrow--left {
    left: inherit;
    top: 0px;
    right: 45px;
    @media (max-width: 767px) {
      left: 10px;
      top: 50px ;
      right: inherit;
    }
    /* @media screen and (-webkit-min-device-pixel-ratio: 0) {
      @media (min-width: 1025px) {
        top: -2px;
      }
    } */
    @media (min-width: 1025px) {
      @media not all and (min-resolution: 0.001dpcm) {
        @media {
          top: -2px;
        }
      }
    }
  }
  .react-multiple-carousel__arrow--right {
    top: 0px;
    right: 6px;
    @media (max-width: 767px) {
      right: 10px;
      top: 50px ;
      left: inherit;
    }
    @media (min-width: 1025px) {
      @media not all and (min-resolution: 0.001dpcm) {
        @media {
          top: -2px;
        }
      }
    }
  }
`

const VideoSectionSlider = ({ videos }) => {
  const [popUp, setPopup] = useState(false)
  const [popUpVideo, setPopUpVideo] = useState()
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 2,
      slidesToSlide: 1,
      // partialVisibilityGutter: 40,
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 2,
      slidesToSlide: 1,
      // partialVisibilityGutter: 40,
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 2,
      slidesToSlide: 1,
      // partialVisibilityGutter: 40,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
      // partialVisibilityGutter: 40,
    },
  }
  return (
    <>
      <VideoPopup popUpVideo={popUpVideo} popUp={popUp} setPopup={setPopup} />
      <NewInBuzzSliderWrapper className="demo">
        {videos && videos.length > 0 && (
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={videos && videos.length > 3 ? true : false}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={false}
            autoPlaySpeed={2000}
            partialVisible={videos && videos.length > 3 ? true : false}
            className={videos && videos.length < 3 ? 'SingleItem' : null}
          >
            {videos.map((video) => (
                <SliderItem 
                key={video._id}
                setPopup={setPopup}
                  setPopUpVideo={setPopUpVideo}
                  vid={video}
                  />
            ))}
          </Carousel>
        )}
      </NewInBuzzSliderWrapper>
    </>
  )
}

VideoSectionSlider.propTypes = {
    videos: PropTypes.array,    
}

export default VideoSectionSlider

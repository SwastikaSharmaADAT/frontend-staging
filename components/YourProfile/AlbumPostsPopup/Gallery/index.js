import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import 'react-alice-carousel/lib/alice-carousel.css'
import Slider from 'react-slick'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { createImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const SectionLeftWrap = styled.div`
width: 700px;
height: 700px;

@media (min-width: 992px) and (max-width: 1024px) {
  width: 100%;
  height: 100%;
}
@media (max-width: 767px) {
  width: 100%;
  height: 100%;
}

  @media (max-width: 991px) and (orientation: landscape) {
    width: 100%;
    height: 100%;
  }
    .slick-slider {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;  
  }
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 568px;
        margin: 0 auto;
        text-align: center;
        max-height: 700px;
      }
    }
  }
  .slick-next,
  .slick-prev {
    cursor: pointer;
    background-color: transparent;
    color: #fff;
    width: auto;
    height: auto;
    font-size: 48px;
    z-index: 9;
  }
  .slick-next {
    right: 0;
  }
  .slick-prev {
    left: 0;
  }
  .slick-disabled {
    opacity: 0.5;
  }
  img {
    max-width: 568px;
    margin: 0 auto;
    text-align: center;
    max-height: 700px;
  }
  .slick-list {
    width: 700px !important;
    height: 100%;
  }
  .slick-track {
    height: 100%;
  }
`


const Gallery = (props) => {
  const picR = useRef()
  const getImagesToRender = () =>
    props.imagesData.map((img, index) => (
      <img
        src={createImageUrl(img.pictureUrl)}
        onError={(e) => {
          imageErrorHandler(e, createImageUrl(img.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
        }}
        key={img._id}
        alt={`Pic ${index + 1}`}
      />
    ))

  const getAlbumImages = () =>
    props.imagesData.map((img, index) => (
      <img
        src={createImageUrl(img.pictureUrl)}
        onError={(e) => {
          imageErrorHandler(e, createImageUrl(img.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
        }}

        key={index}
        alt={`Pic ${index + 1}`}
      />
    ))

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    accessibility: true,
    // initialSlide: props.activeIndex,
    nextArrow: <BsChevronRight />,
    prevArrow: <BsChevronLeft />,
  }
  
  useEffect(() => {
    picR.current.innerSlider.slickGoTo(props.activeIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <>
      <SectionLeftWrap className={props.imagesData.length === 1 ? 'HideArrows' : null}>
        <Slider ref={picR} {...settings}>
          {!props.showRightSection ? getImagesToRender() : getAlbumImages()}
        </Slider>
      </SectionLeftWrap>
    </>
  )
}

Gallery.propTypes = {
  imagesData: PropTypes.array,
  activeIndex: PropTypes.number,
  showRightSection: PropTypes.bool,
}

export default Gallery
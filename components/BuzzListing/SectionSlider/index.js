import React, { useEffect } from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import PropTypes from 'prop-types'
import 'react-multi-carousel/lib/styles.css'
import SliderItem from './SliderItem'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import { useSelector } from 'react-redux'

const NewInBuzzSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1024px) {
    height: 200px;
  }
  .react-multi-carousel-list {
    @media (max-width: 767px) {
      padding-top: 0 !important ;
    }
    &.SingleItem {
      @media (min-width: 768px) {
        justify-content: center;
      }
    }
  }
  .react-multi-carousel-list {
    @media (min-width: 768px) {
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
    left: inherit !important;
    top: 0px;
    right: 45px;
    @media (max-width: 767px) {
      left: 10px !important;
      top: 50px;
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
      top: 50px;
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

const SectionSlider = ({ articles, type, redirectHandler }) => {
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
  const [title, translateTitle] = useTranslateContent('')
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)

  let titleString = ''

  if(articles.length && lang !== 'en')  {  
    titleString = getString(lang,articles,'title')
  }

  useEffect(()=>{
      if(articles.length && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])

  return (
    <>
      <NewInBuzzSliderWrapper className="demo">
        {articles && articles.length > 0 && (
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={articles && articles.length > 3 ? true : false}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={false}
            autoPlaySpeed={2000}
            partialVisible={articles && articles.length > 3 ? true : false}
            className={articles && articles.length < 3 ? 'SingleItem' : null}
          >
            {articles.map((article,ind) => (
              <div key={article._id}>
                <SliderItem titles={getArray(title)} ind={ind} article={article} redirectHandler={redirectHandler} type={type} />
              </div>
            ))}
          </Carousel>
        )}
      </NewInBuzzSliderWrapper>
    </>
  )
}

SectionSlider.propTypes = {
  articles: PropTypes.array,
  type: PropTypes.string,
  redirectHandler: PropTypes.func,
}

export default SectionSlider

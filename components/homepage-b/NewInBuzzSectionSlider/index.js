import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewInBuzzItems from './NewInBuzzItems'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { useSelector } from 'react-redux'

const NewInBuzzSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  .buzSlide {
    width: 100%;
  }
  .react-multi-carousel-list {
    overflow: hidden;
    max-width: 1270px;
    margin: auto;
  }
  .react-multi-carousel-track {
    padding: 20px 0;
    margin-bottom: 50px;
    align-items: flex-end;
  }
  .react-multi-carousel-dot-list {
    width: 100%;
    max-width: 1270px;
    margin: 0 auto;
    bottom: 7px;
    max-width: calc(100% - 200px);

    @media (max-width: 767px) {
      font-size: 24px;
      max-width: 90%;
    }
  }
  li.react-multi-carousel-dot {
    flex: 1;
  }
  .react-multi-carousel-dot button {
    width: 100%;
    border-radius: 0;
    border: 0;
    background: #222;
    height: 5px;
  }
  .react-multi-carousel-dot--active button {
    background: #fff;
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

const NewCollectionSectionSlider = ({ buzzArticles }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 3,
      slidesToSlide: 1,
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 3,
      slidesToSlide: 1,
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 2,
      slidesToSlide: 1,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)
  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(buzzArticles.length && lang !== 'en')  {  
    titleString = getString(lang,buzzArticles,'title')
  }

  useEffect(()=>{
      if(titleString && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])
  return (
    <>
      <NewInBuzzSliderWrapper>
        {buzzArticles && buzzArticles.length > 0 && (
          <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          arrows={true}
          responsive={responsive}
          infinite={true}
          keyBoardControl={false}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          autoPlay={true}
          autoPlaySpeed={200000}
          >
            {buzzArticles.map((article,ind) => (
              <div className="buzSlide">
                <NewInBuzzItems 
                titles={getArray(title)}
                ind={ind}
                article={article} />
              </div>
            ))}
          </Carousel>
        )}
      </NewInBuzzSliderWrapper>
    </>
  )
}

NewCollectionSectionSlider.propTypes = {
  buzzArticles: PropTypes.array,
}

export default NewCollectionSectionSlider

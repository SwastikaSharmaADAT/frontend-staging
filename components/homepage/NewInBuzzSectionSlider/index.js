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
  & .buzSlide{
    width: 100%;
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
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={true}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {buzzArticles.map((article,ind) => (
              <div className="buzSlide" key={article._id}>
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

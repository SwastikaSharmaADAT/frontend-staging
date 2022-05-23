import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewcollectionItems from './NewcollectionItems'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import { useSelector } from 'react-redux'

const NewcollectionSliderWrapper = styled.div`
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
  & .newColleSlide {
    width: 100%;
  }
`

const NewCollectionSectionSlider = ({ latestArtworks, currency, conversionRate, decimalSeparator }) => {
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
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
  const [title, translateTitle] = useTranslateContent('')
  const [name, translateName] = useTranslateContent('')

  let titleString = '',nameString = ''

  if(latestArtworks.length && lang !== 'en')  {  
    titleString = getString(lang,latestArtworks,'title')
    nameString = getString(lang,latestArtworks,'nameOfArtist','artwork')
  }

  useEffect(()=>{
      if(titleString && lang !== 'en')
      translateTitle(titleString)
      if(nameString && lang !== 'en')
      translateName(nameString)
  },[titleString, translateTitle,
    nameString, translateName, 
  ])

  return (
    <>
      <NewcollectionSliderWrapper>
        {latestArtworks && latestArtworks.length > 0 && (
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
            autoPlaySpeed={200000}
          >
            {latestArtworks.map((artwork,ind) => (
              <div className="newColleSlide" key={artwork._id}>
                <NewcollectionItems
                  ind={ind}
                  names={getArray(name)}
                  titles={getArray(title)}
                  artwork={artwork}
                  currency={currency}
                  conversionRate={conversionRate}
                  decimalSeparator={decimalSeparator}
                />
              </div>
            ))}
          </Carousel>
        )}
      </NewcollectionSliderWrapper>
    </>
  )
}

NewCollectionSectionSlider.propTypes = {
  latestArtworks: PropTypes.array,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}

export default NewCollectionSectionSlider

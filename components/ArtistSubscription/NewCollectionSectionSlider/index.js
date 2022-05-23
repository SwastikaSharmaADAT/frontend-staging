import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewcollectionItems from './NewcollectionItems'

const NewcollectionSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  .react-multi-carousel-item {
    display: flex;
    @media (max-width: 991px) {
      justify-content: center;
    }
  }
`

const NewCollectionSectionSlider = ({ latestArtworks }) => {
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

  const arts = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]

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
            containerClass='carousel-container'
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {arts.map((artwork) => (
              <div key={artwork._id}>
                <NewcollectionItems artwork={artwork} />
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
}

export default NewCollectionSectionSlider

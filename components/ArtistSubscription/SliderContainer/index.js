import React from 'react'
import Carousel from 'react-multi-carousel'
import PropTypes from 'prop-types'
import SliderItem from './SliderItem'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 991 },
    items: 4,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 990, min: 767 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  mobilexl: {
    breakpoint: { max: 766, min: 541 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  mobilexls: {
    breakpoint: { max: 540, min: 463 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
  mobilesm: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
    partialVisibilityGutter: 40,
  },
}

const SliderContainer = ({ latestArtworks }) => (
  <>
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={1}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      customTransition="all 10s linear"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 5,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 2,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={2}
      swipeable
      transitionDuration={10000}
    >
      {latestArtworks.map((artwork) => (
        <SliderItem artwork={artwork} key={artwork._id} />
      ))}
    </Carousel>
  </>
)

SliderContainer.propTypes = {
  latestArtworks: PropTypes.array,
}

export default SliderContainer

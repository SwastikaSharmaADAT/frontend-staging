import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-multi-carousel'
import PropTypes from 'prop-types'
import 'react-multi-carousel/lib/styles.css'
import FeaturedPostItem from './FeaturedPostItem'

const FeaturedPostSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  .react-multi-carousel-item {
    overflow: hidden;
  }
  .react-multi-carousel-list {
    margin: 0;
    padding: 0;
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
    left: 15px !important;
    top: 45% !important;
    right: inherit !important;
    background: #fff !important;
    @media (max-width: 767px) {
      left: 6px;
    }
  }
  .react-multiple-carousel__arrow--right {
    left: inherit !important;
    top: 45% !important;
    right: 15px !important;
    background: #fff !important;
    @media (max-width: 767px) {
      right: 6px;
    }
  }
`

const FeaturedPostSlider = ({ posts, redirectHandler }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 1,
      slidesToSlide: 1,
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 1,
      slidesToSlide: 1,
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 1,
      slidesToSlide: 1,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }
  return (
    <>
      <FeaturedPostSliderWrapper>
        {posts && posts.length > 0 && (
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            infinite={posts && posts.length > 1 ? true : false}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={posts && posts.length > 1 ? true : false}
            autoPlaySpeed={5000}
          >
            {posts.map((post) => (
              <FeaturedPostItem key={post._id} post={post} redirectHandler={redirectHandler} />
            ))}
          </Carousel>
        )}
      </FeaturedPostSliderWrapper>
    </>
  )
}

FeaturedPostSlider.propTypes = {
  posts: PropTypes.array,
  redirectHandler: PropTypes.func,
}

export default FeaturedPostSlider

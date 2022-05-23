import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewcollectionItems from './NewcollectionItemsRight'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { useRouter } from 'next/router'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import { useSelector } from 'react-redux'

const NewcollectionSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  .react-multiple-carousel__arrow {
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
    border: 1px solid #000 !important;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .react-multiple-carousel__arrow--left {
    top: 24px;
  }
  .react-multiple-carousel__arrow--right {
    top: 24px;
  }
`
const FollowButton = styled.button`
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px auto;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`

const NewCollectionSectionSliderRight = ({ latestArtworks }) => {
  const router = useRouter()
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 991 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 990, min: 767 },
      items: 2,
      slidesToSlide: 1,
    },
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 2,
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
      slidesToSlide: 1,
    },
  }

  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)
  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(latestArtworks.length && lang !== 'en')  {  
    titleString = getString(lang,latestArtworks,'title')
  }

  useEffect(()=>{
      if(latestArtworks.length && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])

  return (
    <>
      <NewcollectionSliderWrapper>
        {latestArtworks && latestArtworks.length > 0 && (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            infinite={true}
            keyBoardControl={false}
            containerClass="carousel-container sidebar-new-artworks"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-50-px"
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {latestArtworks.map((artwork,ind) => (
              <div key={artwork._id}>
                <NewcollectionItems titles={getArray(title)} ind={ind} artwork={artwork} />
              </div>
            ))}
          </Carousel>
        )}
        <FollowButton onClick={() => router.push('/artworks')}>See More</FollowButton>
      </NewcollectionSliderWrapper>
    </>
  )
}

NewCollectionSectionSliderRight.propTypes = {
  latestArtworks: PropTypes.array,
}

export default NewCollectionSectionSliderRight

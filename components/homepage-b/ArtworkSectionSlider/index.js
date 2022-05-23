import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ItemsWrapper from './ArtworkItems'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import { useSelector } from 'react-redux'

const ArtworkSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  padding-top: 40px;
  width: 100%;
  .react-multi-carousel-track {
    padding: 20px 0;
    margin-bottom: 50px;
  }
  .react-multi-carousel-dot-list {
    max-width: calc(100% - 200px);
    margin-top: 30px;
    bottom: 7px;
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

const ArtworkSectionSlider = ({ recentUsers }) => {
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
      slidesToSlide: 2,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  }
  const [city, translateCity] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')
  const [type, translateType] = useTranslateContent('')
  // const [name, translateName] = useTranslateContent('')

  // let cityString = '',countryString = '',typeString = '',nameString = ''
  let cityString = '',
    countryString = '',
    typeString = ''

  if (recentUsers.length && lang !== 'en') {
    cityString = getString(lang,recentUsers, 'city.value')
    countryString = getString(lang,recentUsers, 'country.value')
    typeString = getString(lang,recentUsers, 'userRoleId.roleName')
    // nameString = getString(lang,recentUsers, 'username', 'name')
  }

  useEffect(() => {
    if (cityString && lang !== 'en') translateCity(cityString)
    if (countryString && lang !== 'en') translateCountry(countryString)
    if (typeString && lang !== 'en') translateType(typeString)
    // if (nameString) translateName(nameString)
  }, [cityString, translateCity, countryString, translateCountry, typeString, translateType])
  // }, [cityString, translateCity, countryString, translateCountry, typeString, translateType, nameString, translateName])

  return (
    <>
      <ArtworkSliderWrapper>
        {recentUsers && recentUsers.length > 0 && (
          <Carousel
            swipeable={true}
            draggable={true}
            arrows={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            keyBoardControl={false}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={true}
            autoPlaySpeed={2000}
          >
            {recentUsers.map((user, ind) => (
              <div key={user._id}>
                <ItemsWrapper
                  // names={getArray(name)}
                  cities={getArray(city)}
                  countries={getArray(country)}
                  types={getArray(type)}
                  ind={ind}
                  user={user}
                />
              </div>
            ))}
          </Carousel>
        )}
      </ArtworkSliderWrapper>
    </>
  )
}

ArtworkSectionSlider.propTypes = {
  recentUsers: PropTypes.array,
}

export default ArtworkSectionSlider

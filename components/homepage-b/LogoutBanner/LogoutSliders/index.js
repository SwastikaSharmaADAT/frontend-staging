import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewcollectionItems from './NewcollectionItems'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../../utilities/getTranslatedContent'
import { useSelector } from 'react-redux'
import { Controls, PlayState, Timeline, Tween } from 'react-gsap';
import { createImageUrl, imageErrorHandler, createNsfwImageUrl, checkIfImageExists, createResizeImageUrl } from '../../../../utilities/imageUtils'
import { isLoginToken } from '../../../../utilities/authUtils.js'
import { useRouter } from 'next/router'

const NewcollectionSliderWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  canvas {
    position: absolute;
    height: 100%;
  }
`

const SingleSlider = styled.div`
  flex: 0 0 33.3%;
  display: flex;
  flex-direction: column;
  img {
    border: 3px solid #000;
    box-sizing: border-box;
    width: 100%;
  }
`

const UserThumbnail = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  color: #fff;
  font-size: 11px;
  line-height: 1.5;
  cursor: pointer;
  @media (max-width:640px) {
    display: none;
  }
  img {
    width: 50px;
    height: 50px;
    box-shadow: 5px 5px 50px 5px rgba(0,0,0,0.8);
  }
`

const SlidersOverlay = styled.div`
  background: linear-gradient(270deg,rgba(0,0,0,0) 0%,rgba(13,13,13,0) 80%, rgba(13,13,13,1) 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const MainImage = styled.img`
  width: 100%;
  object-fit: cover;
`

const Descr = styled.div`
  margin-right: 10px;
  text-align: right;
  z-index: 1;
`

const Title = styled.div`
  text-shadow: 2px 2px 20px rgb(0 0 0 / 80%), 1px 1px 1px rgb(0 0 0 / 50%);
`

const ByLine = styled.div`
  text-shadow: 2px 2px 20px rgb(0 0 0 / 80%), 1px 1px 1px rgb(0 0 0 / 50%);
`


const NewCollectionSectionSlider = ({ latestArtworks, currency, conversionRate, decimalSeparator }) => {
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)

  const router = useRouter()

  const canvasRef = useRef(null)

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

  let slider1 = [];
  let slider2 = [];
  let slider3 = [];

  for (var i = 1; i <= 10; i++) {
    slider1.push('/assets/sliderArtworks/artwork' + i + '.jpeg')
    slider2.push('/assets/sliderArtworks/artwork1' + i + '.jpeg')
    slider3.push('/assets/sliderArtworks/artwork2' + i + '.jpeg')
  }

  const currentArtwork = latestArtworks[Math.floor(Math.random() * 5)]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      //Our first draw
      // console.log(context)

      // context.fillStyle = '#fff'
      // context.fillRect(0, 0, context.canvas.width, context.canvas.height)

      var imageObj1 = new Image();
      imageObj1.src = createNsfwImageUrl(
        {
          path: currentArtwork.artPhotos[0].pictureUrl,
          login: isLoginToken(),
          age: 16,
          genreList: currentArtwork && currentArtwork.genreId ? currentArtwork.genreId : null,
        },
        2000,
        'auto',
        'mediaLibrary',
        false
      )
      // console.log(imageObj1)
      // imageObj1.onload = function() {
      //   context.drawImage(imageObj1,0,0, context.canvas.width, context.canvas.height);
      // }
      context.fillStyle = '#111'
      context.strokeStyle = "rgba(1, 1, 1, 0)";

      
      const gridSize = 40
      const sqSize = 20
      for (let i = 0; i < context.canvas.width/gridSize; i++) {
        for (let j = 0; j < context.canvas.width/gridSize; j++) {
            // context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            if ((sqSize-i) > 0) context.fillRect((context.canvas.width*(i/gridSize)-(sqSize-i)), (context.canvas.height*(j/gridSize) + (i/2)), sqSize-i, sqSize-i)
        }
      }
    }
  }, [latestArtworks, currentArtwork])

  return (
    <>
      { currentArtwork ?
      <NewcollectionSliderWrapper>
        {/* {
          latestArtworks ? latestArtworks.map((item, index) => {
            if (index > 5) return null
            return (
              <NewcollectionItems artwork={item} index={index} />
            )
          }) : ''
        } */}
        {/* <canvas ref={canvasRef} width="1600" height="2400"></canvas> */}
        <MainImage
          src={createNsfwImageUrl(
            {
              path: currentArtwork.artPhotos[0].pictureUrl,
              login: isLoginToken(),
              age: 16,
              genreList: currentArtwork && currentArtwork.genreId ? currentArtwork.genreId : null,
            },
            1000,
            'auto',
            'mediaLibrary',
            false
          )}
          onError={(e) => {
            imageErrorHandler(
              e,
              createImageUrl(currentArtwork.artPhotos[0].pictureUrl),
              '/assets/artworkdemo.png',
              'mediaLibrary',
              ''
            )
          }}
          alt="artworkImage"
        />
        <SlidersOverlay/>
        <UserThumbnail onClick={() => router.push('/user/' + currentArtwork.userId.username)}>
          <Descr>
            <Title>{currentArtwork.title}</Title>
            <ByLine>by {currentArtwork.userId.firstName} {currentArtwork.userId.lastName}</ByLine>
            <ByLine>View Profile</ByLine>
          </Descr>
          <img
            src={
              currentArtwork.userId.profilePicUrl
                ? createResizeImageUrl(currentArtwork.userId.profilePicUrl, 50, 50, 'profileCover')
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(currentArtwork.userId.profilePicUrl),
                '/assets/artmo-default.png',
                'profileCover',
                ''
              )
            }}
            alt=""
          />
        </UserThumbnail>
      </NewcollectionSliderWrapper>
      : <></>
      }
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

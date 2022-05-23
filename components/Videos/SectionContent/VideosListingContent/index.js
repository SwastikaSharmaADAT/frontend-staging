import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/lazy'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { checkVideoURL } from '../../../../utilities/checkVideoUrl'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { createImageUrl } from '../../../../utilities/imageUtils'
import { useRouter } from 'next/router'
import RightSideAds from '../../../YourProfile/RightSideAds'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 0 25px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 0;
  max-width: 429px;
  width: 100%;
  @media (min-width: 1025px) {
    max-width: 48.5%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 48%;
    margin: 0 auto 25px;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 auto 25px;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 15px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  svg {
    font-size: 70px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    @media (max-width: 767px) {
      font-size: 40px;
    }
  }
  > div:first-child {
    width: 100% !important ;
    height: 100% !important ;
  }
  ::after {
    padding-top: 56.25%;
    display: block;
    content: '';
  }
`
const Username = styled.div`
  font-family: 'Montserrat-Regular';
  padding: 0 15px;
  margin: 0 0 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.8;
  color: #666;
`
const Followers = styled.div`
  padding: 0 15px;
  margin: 20px 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  color: #000;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const LabelButton = styled.button`
  background: #eee;
  font-style: normal;
  color: #222;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 14px;
  padding: 4px 11px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  margin: 0 15px 10px;
  display: flex;
  justify-content: center;
  :hover,
  :focus {
    background: #eee;
    outline: none;
    color: #222;
  }
`
const OverlayDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  .react-player__preview {
    width: 100%;
    height: 100%;
  }
`
const VideosListingContent = ({ video, setPopup, setPopUpVideo, displayAd }) => {
  const [isLight, setIsLight] = useState(true)
  const router = useRouter()
  const redirectHandler = (route) => {
    router.push(route)
  }

  const nameOfUser =
    video && video.userId && video.userId.length > 0 && video.userId[0].firstName && video.userId[0].lastName
      ? video.userId[0].firstName + ' ' + video.userId[0].lastName
      : video.userId[0].username
  const videoCategory = video && video.categoryId && video.categoryId.length > 0 && video.categoryId[0].title
  const linkUserName = video.userId[0].username

  const [description, translateDescription] = useTranslateContent('')
  const [name, translateName] = useState('by ' + nameOfUser)
  const [category, translateCategory] = useTranslateContent('')

  useEffect(() => {
    if (video && video.url) {
      const customVideo = !checkVideoURL(video.url)
      if (!customVideo) {
        setIsLight(true)
      } else {
        if (video && video.picUrl && !isEmptyObj(video.picUrl) && video.picUrl.pictureUrl) {
          setIsLight(createImageUrl(video.picUrl.pictureUrl))
        } else {
          setIsLight(true)
        }
      }
    }
  }, [video])

  //** do not add 'by' in i18n */
  useEffect(() => {
    if (!isEmptyObj(video)) {
      translateDescription(video.description)
      translateName('by ' + nameOfUser)
      translateCategory(videoCategory)
    }
  }, [nameOfUser, video.description, videoCategory])
  return (
    <>
      {displayAd ? <ItemsWrapper><RightSideAds rate={1}/></ItemsWrapper> : <></>}
      <ItemsWrapper>
        <CoverImg>
          {video.url ? (
            <>
              <ReactPlayer playing={false} controls={true} url={video.url} playIcon={<></>} light={isLight} />
              <OverlayDiv></OverlayDiv>
              <AiOutlinePlaySquare
                onClick={() => {
                  setPopup(true)
                  setPopUpVideo(video)
                }}
              />
            </>
          ) : (
            <>
              <img src="/assets/cover_photo_1.jpg" alt="Cover" />
              <AiOutlinePlaySquare />
            </>
          )}
        </CoverImg>
        {video.description && <Username> {description ? description.slice(0, 130 + description.slice(130, description.length).indexOf(' ')) + '...' : video && video.description} </Username>}
        <Followers onClick={() => redirectHandler(`/user/${linkUserName}`)}>{'by ' + nameOfUser}</Followers>
        {videoCategory && <LabelButton>{videoCategory}</LabelButton>}
      </ItemsWrapper>
    </>
  )
}
VideosListingContent.propTypes = {
  video: PropTypes.object,
  setPopup: PropTypes.func,
  setPopUpVideo: PropTypes.func,
  displayAd: PropTypes.bool
}
export default VideosListingContent

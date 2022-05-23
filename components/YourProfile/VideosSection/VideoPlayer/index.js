import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
import { ImPlay2 } from 'react-icons/im'
import { MdEdit } from 'react-icons/md'
import { RiVideoLine } from 'react-icons/ri'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { checkVideoURL } from '../../../../utilities/checkVideoUrl'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { createImageUrl } from '../../../../utilities/imageUtils'

const VideoWrap = styled.div`
  position: relative;
  margin: 0;
  width: 48%;
  display: flex;
  height: 192px;
  @media (min-width: 767px) {
    height: 300px;
  }
  .react-player__preview {
    -webkit-transform-origin: center;
        -ms-transform-origin: center;
            transform-origin: center;
    -webkit-transform: scale(1.5);
        -ms-transform: scale(1.5);
            transform: scale(1.5);
  }
  & > div {
    overflow: hidden;
    @media( max-width: 767px ) {
      height: 205px !important;
    }
  }
  background-size: cover;
  color: #fff;
  align-items: center;
  max-width: 392px;
  @media (min-width: 1025px) and (max-width: 1259px) {
    max-width: 48%;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 48%;
    height: 250px;
  }
  @media (max-width: 991px) {
    max-width: 48%;
  }
  @media (max-width: 767px) {
    margin: 0 0 20px;
    max-width: 48%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
  .edit {
    position: absolute;
    top: 3px;
    right: 10px;
    font-size: 20px;
    margin: 0;
    cursor: pointer;
  }
  &.landingPage {
    overflow: hidden;
    max-width: 100%;
    &:hover {
      .react-player__preview {
        transform: scale(1.1);
        transition: transform 0.3s;
      }
    }
    .react-player__preview {
      transition: transform 0.3s;
    }
  }

  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    font-family: 'Montserrat-Medium';
    font-weight: 100;
    margin: 0 0 5px 0;
    padding: 0;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 16px;
    line-height: normal;
    margin: 0;
    padding: 0;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  svg {
    font-size: 60px;
    display: flex;
    margin-right: 15px;
    height: auto;
    align-items: flex-start;
    padding: 5px 0 0 0;
    &.landingPage {
      margin-right: 0;
      align-items: center;
      justify-content: center;
      padding: 0 0 0 0;
      position: inherit;
    }
    @media (max-width: 767px) {
      font-size: 48px;
      margin-right: 10px;
    }
  }
  > div:first-child {
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100% !important;
      height: 100% !important;
    }
  }
`
const OverlayDiv = styled.div`
  width: 100%;
  height: 300px;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  .react-player__preview {
    width: 100%;
    height: 300px;
  }
`
const InnerVideoText = styled.div`
  position: relative;
  padding-right: 20px;
  max-width: calc(100% - 80px);
  h1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const InnerVideoWrap = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
  padding-left: 30px;
  justify-content: flex-start;
  &.landingPage {
    padding-left: 0;
    justify-content: center;
  }
  display: flex;
  align-items: center;
  @media (max-width: 991px) {
    padding-left: 15px;
  }
  @media (max-width: 767px) {
    padding-left: 10px;
  }
`
const PlayDiv = styled.div`
  cursor: pointer;
  &.landingPage {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
/**
 * @description: Videoplayer component with overlay thumbnail
 * @param {object} param0
 */
function VideoPlayer({ video, landingPage, setPopup, setPopUpVideo, editHandler }) {
  const [isLight, setIsLight] = useState(true)
  const [overlay, setOverlay] = useState(true)
  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

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

  useEffect(() => {
    if(!isEmptyObj(video)){
      translateDescription(video.description)
      if(video.title)
      translateTitle(video.title)
    }
  }, [video.description])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

   const ownerOfPost=video&&video.userId.username===loggedInUsername
  return (
    <>
      <VideoWrap
        key={video._id}
        className={landingPage ? 'landingPage' : ''}
        onClick={() => {
          setPopup(true)
          setPopUpVideo(video)
        }}
      >
        <ReactPlayer
          width={!landingPage ? 392 : '100%'}
          height={300}
          playing={false}
          controls={true}
          url={video.url}
          playIcon={<></>}
          light={true}
        />
        {overlay && (
          <>
            <OverlayDiv>
              <InnerVideoWrap className={landingPage ? 'landingPage' : ''}>
                <PlayDiv className={landingPage ? 'landingPage' : ''}>
                  <RiVideoLine
                    className="play-icon"
                    onClick={() => {
                      setPopup(true)
                      setPopUpVideo(video)
                    }}
                  ></RiVideoLine>
                </PlayDiv>
                {!landingPage && (
                  <InnerVideoText>
                    <h1>{title ? title : video && video.title}</h1>
                    <p>{description ? description : video && video.description}</p>
                  </InnerVideoText>
                )}
              </InnerVideoWrap>
            </OverlayDiv>
            {/* {ownerOfPost&&<MdEdit className="edit" onClick={(e)=>{
             e.stopPropagation()
             editHandler(video)}}/>} */}
          </>
        )}
      </VideoWrap>
    </>
  )
}

VideoPlayer.propTypes = {
  video: PropTypes.object,
  landingPage: PropTypes.bool,
  setPopup: PropTypes.func,
  setPopUpVideo: PropTypes.func,
  editHandler: PropTypes.func,
}

export default VideoPlayer

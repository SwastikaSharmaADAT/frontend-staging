import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import VideoPlayer from '../../YourProfile/VideosSection/VideoPlayer'
import { stringTruncate } from '../../../utilities/stringTruncate'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import ReactPlayer from 'react-player/lazy'
import CoverPhoto from '../../../public/assets/cover_photo_1.jpg'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 0 25px;
  padding: 0 0 10px 0;
  background: linear-gradient(210deg, #222222 0%, #121212 100%);
  border: 1px solid rgba(255,255,255,0.02);
  box-shadow: 1px 1px 5px 5px rgb(0 0 0 / 25%);
  max-width: 429px;
  cursor: pointer;
  width: 100%;
  &:nth-child(2) {
    margin: 0 25px 25px 25px;
  }
  @media (max-width: 1023px) {
    &:nth-child(3) {
      display: none;
    }
  }
  @media (min-width: 1025px) {
    max-width: 418px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 418px;
  }
  @media (max-width: 767px) {
    max-width: 418px;
    margin: 0 10px 25px;
    &:nth-child(2) {
      margin: 0 10px 25px;
    }
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 auto 25px;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 10px;
  width: 100%;
  height: 300;
  @media (max-width: 767px) {
    height: 86px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
  svg {
    font-size: 40px;
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
  .react-player__preview {
    background-size: 135%!important;
  }
  .react-player__preview {
    @media (min-width: 767px) {
      height: 300px !important ;
    }
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
const Username = styled.div`
  font-family: 'Montserrat-Regular';
  margin: 1.5em 0.5em 1em;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  height: 100%;
  color: #fff;
  text-align: center;
`

function SingleVideo({ vid, setPopup, setPopUpVideo, titles, ind }) {
  return (
    <ItemsWrapper
      onClick={() => {
        setPopup(true)
        setPopUpVideo(vid)
      }}
    >
      <CoverImg>
        {vid.url ? (
          <>
            <ReactPlayer playing={false} controls={true} url={vid.url} playIcon={<></>} light={true} />
            <OverlayDiv></OverlayDiv>
            <AiOutlinePlaySquare
              onClick={() => {
                setPopup(true)
                setPopUpVideo(vid)
              }}
            />
          </>
        ) : (
          <>
            <img src={CoverPhoto} alt="Cover" />
            <AiOutlinePlaySquare />
          </>
        )}
      </CoverImg>
      {vid && vid.description && <Username>{stringTruncate(vid.description, 5)}</Username>}
    </ItemsWrapper>
  )
}
SingleVideo.propTypes = {
  vid: PropTypes.object,
  setPopup: PropTypes.func,
  setPopUpVideo: PropTypes.func,
  titles: PropTypes.array,
  ind: PropTypes.number,
}
export default SingleVideo

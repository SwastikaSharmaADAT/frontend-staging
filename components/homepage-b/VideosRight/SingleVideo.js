import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import VideoPlayer from '../../YourProfile/VideosSection/VideoPlayer'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import ReactPlayer from 'react-player/lazy'
import CoverPhoto from '../../../public/assets/cover_photo_1.jpg'
import { stringTruncate } from '../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

// const VideosName = styled.h1`
//   font-family: 'Montserrat-Regular';
//   padding: 8px 10px;
//   margin: 0;
//   font-style: normal;
//   font-weight: normal;
//   font-size: 18px;
//   line-height: 22px;
//   height: 100%;
// `
const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 0 25px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 0;
  max-width: 429px;
  cursor: pointer;
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
    max-width: 46%;
    margin: 0 auto 25px;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 15px;
  width: 100%;
  height: 86px;
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
  .react-player__preview {
    background-size: 135%;
  }
  ::after {
    padding-top: 56.25%;
    display: block;
    content: '';
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
  padding: 0 15px;
  margin: 0 0 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  color: #000;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

function SingleVideo({ vid, setPopup, setPopUpVideo, names, ind }) {

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
      {vid && vid.description && (<>
        <Username> {stringTruncate(vid.description, 2)} </Username>
        {/* <Username>{vid.description}</Username> */}
        </>
      )}
    </ItemsWrapper>
  )
}
SingleVideo.propTypes = {
  ind: PropTypes.number,
  names: PropTypes.array,
  vid: PropTypes.object,
  setPopup: PropTypes.func,
  setPopUpVideo: PropTypes.func,
}
export default SingleVideo

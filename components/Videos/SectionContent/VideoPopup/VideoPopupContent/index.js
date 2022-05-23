import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
import CloseIcon from '../../../../UI/CloseIcon/CloseIcon'

const VideoPopupWrap = styled.div`
  position: relative;
  justify-content: flex-end;
  padding: 7px 24px 24px 24px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  overflow: hidden;
  width: 700px;
  @media (max-width: 767px) {
    width: 90vw;
    max-height: 80vh;
    overflow-y: scroll;
    padding: 10px;
  }
  @media (max-width: 359px) {
    width: 90vw;
  }
  .close-icon {
    position: relative;
    right: -18px;
    margin-left: auto;
    color: #222;
    @media (max-width: 767px) {
      right: -4px;
    }
    svg {
      font-size: 24px;
    }
  }
  .popup-player {
    @media (max-width: 767px) {
      height: 100% !important ;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      height: 100% !important ;
    }
  }
  @media (max-width: 991px) and (orientation: landscape) {
    height: 80vh;
    overflow-y: auto;
  }
`

function VideoPopupContent({ popUpVideo, setPopup }) {
  return (
    <VideoPopupWrap>
      <CloseIcon className="close-icon" onclick={() => setPopup(false)} />
      <ReactPlayer className="popup-player" width={'100%'} controls={true} url={popUpVideo.url} playing={true} />
    </VideoPopupWrap>
  )
}
VideoPopupContent.propTypes = {
  popUpVideo: PropTypes.object,
  setPopup: PropTypes.func,
}
export default VideoPopupContent

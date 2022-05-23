import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import PropTypes from 'prop-types'
import { checkVideoURL } from '../../../../utilities/checkVideoUrl'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { createImageUrl } from '../../../../utilities/imageUtils'

const VideoPostWrap = styled.div`
  width: 100%;
  max-height: 320px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 10px;
  overflow: hidden;
  position: relative;
  video {
    width: 100%;
    height: 320px;
    border: 0;
    outline: 0;
  }
  iframe {
    width: 100%;
    height: 320px;
    border: 0;
    outline: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  > div:first-child {
    @media (max-width: 767px) {
      width: 100% !important;
      height: auto !important;
    }
  }
  ::after {
    padding-top: 56.25%;
    display: block;
    content: '';
  }
`

const VideoPost = ({ videoUrl, video }) => {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    if (video && videoUrl) {
      const customVideo = !checkVideoURL(videoUrl)
      if (!customVideo) {
        setIsLight(false)
      } else {
        if (video && video.picUrl && !isEmptyObj(video.picUrl) && video.picUrl.pictureUrl) {
          setIsLight(createImageUrl(video.picUrl.pictureUrl))
        } else {
          setIsLight(false)
        }
      }
    }
  }, [video, videoUrl])

  return (
    <>
      <VideoPostWrap>
        <ReactPlayer
          url={videoUrl}
          controls
          light={isLight}
          width={'100%'}
          height={'320px'}
          config={{
            facebook: {
              attributes: {
                'data-height': '320px',
              },
            },
          }}
          playing={isLight ? true : false}
        />
      </VideoPostWrap>
    </>
  )
}

VideoPost.propTypes = {
  videoUrl: PropTypes.string,
  video: PropTypes.object,
}

export default VideoPost

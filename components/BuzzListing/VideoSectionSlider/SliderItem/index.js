import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import FallbackImage from '../../../../public/assets/mo-fallback-image.png'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import ReactPlayer from 'react-player/lazy'
import CoverPhoto from '../../../../public/assets/cover_photo_1.jpg'
import { stringTruncate } from '../../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  background: #ffffff;
  border: 0;
  text-align: center;
  cursor: pointer;
  @media (max-width: 464px) {
    max-width: 222px;
    margin: 0 auto;
    padding: 0 5px;
    overflow: hidden;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0px;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    max-height: 160px;
    object-fit: cover;
  }
  svg {
    font-size: 30px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    top: 50px;
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
  @media (max-width: 464px) {
    height: 120px;
  }
`

const CollectionPara = styled.p`
  padding: 12px 0px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #222;
  @media (max-width: 767px) {
    font-size: 14px;
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

const SliderItem = ({ vid, setPopup, setPopUpVideo }) => {
  const [description, translateDescription] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(vid))
    translateDescription(vid.description)
  }, [vid.description])
  return (
    <>
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
        {description && <CollectionPara> {stringTruncate( description?description:vid && vid.description, 5 )} </CollectionPara>}
      </ItemsWrapper>
    </>
  )
}

SliderItem.propTypes = {
  vid: PropTypes.object,
  type: PropTypes.string,
  redirectHandler: PropTypes.func,
  setPopup: PropTypes.func,
  setPopUpVideo: PropTypes.func,
}

export default SliderItem

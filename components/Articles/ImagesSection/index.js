import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { IoCameraSharp } from 'react-icons/io5'
import { VscChromeClose } from 'react-icons/vsc'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

const ImagesSectionWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 25px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    margin: 20px 0 0;
  }
`
const ImgWrap = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  margin: 0 3px 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 3px solid #eee;
  padding: 5px;
  @media (max-width: 479px) {
    width: 100px;
    height: 100px;
    margin: 0 5px 10px 0;
  }
  img {
    max-height: 147px;
    @media (max-width: 479px) {
      max-height: 97px;
    }
  }
  .Close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: auto;
    height: auto;
    border-radius: 50%;
    background: #fff;
    padding: 2px;
    font-size: 12px;
    color: #000;
    cursor: pointer;
  }
  &.hoverable {
    cursor: pointer;
  }
  &.LastChild {
    justify-content: center;
    width: 150px;
    height: 146px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 17px;
    color: #222;
    flex-direction: column;
    cursor: pointer;
    position: relative;
    top: 2px;
    border: 3px dashed #eee;
    svg {
      color: #aaa;
      font-size: 62px;
      @media (max-width: 479px) {
        font-size: 48px;
      }
    }
    @media (max-width: 479px) {
      width: 100px;
      height: 100px;
    }
  }
`

const ImagesSection = (props) => {
  const { t } = useTranslation('articles')
  return (
    <>
      <ImagesSectionWrap>
        {props.articleImage && props.articleImage.length > 0 ? (
          <>
            {props.articleImage &&
              props.articleImage.length > 0 &&
              props.articleImage.map((img, index) => (
                <ImgWrap key={index}>
                  <img
                    src={createResizeImageUrl(img.pictureUrl, 300, 300, 'mediaLibrary')}
                    onError={(e) => {
                      imageErrorHandler(e, createImageUrl(img.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
                    }}

                    alt="Article Pic"
                  />
                  <VscChromeClose className="Close" onClick={() => props.deleteImg(index)} />
                </ImgWrap>
              ))}
          </>
        ) : null}
        {props.articleImage && props.articleImage.length < 1 ? (
          <ImgWrap className="LastChild" onClick={() => props.openModal()}>
            <IoCameraSharp />
            {t(`placeholderImage`)}
          </ImgWrap>
        ) : null}
      </ImagesSectionWrap>
    </>
  )
}

ImagesSection.propTypes = {
  articleImage: PropTypes.array,
  deleteImg: PropTypes.func,
  openModal: PropTypes.func,
  openLightbox: PropTypes.func,
}

export default ImagesSection

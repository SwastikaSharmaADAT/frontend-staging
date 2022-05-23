import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { IoCameraSharp } from 'react-icons/io5'
import { VscChromeClose } from 'react-icons/vsc'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

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
min-width: 150px;
flex: 1;
  width: 150px;
  height: 150px;
  position: relative;
  margin: 0 3px 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 3px solid transparent;
  @media (max-width: 479px) {
    width: 100px;
    height: 100px;
    margin: 0 5px 10px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    border: 3px dashed #eeeeee;
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
  const { t } = useTranslation(['translation', 'profile'])

  const isEditingFaculty = useSelector((state) => state.root.myProfile.isEditingFaculty)

  return (
    <>
      {!isEditingFaculty && props.images && props.images.length > 0 ? (
        <ImagesSectionWrap>
          {props.images.length > 0 ? (
            <>
              {props.images.map((img, index) => (
                img._id ? (
                  <ImgWrap key={img._id} className="hoverable" onClick={() => props.openLightbox(index)}>
                    <img
                      src={createResizeImageUrl(img.pictureUrl, 'auto', 320, 'mediaLibrary')}
                      onError={(e) => {
                        imageErrorHandler(e, createImageUrl(img.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
                      }}
                      alt=""
                    />
                  </ImgWrap>
                 ) : <></>
              ))}
            </>
          ) : null}
        </ImagesSectionWrap>
      ) : props.images && props.images.length === 0 && !props.description && !isEditingFaculty ? (
        <div className="NoWrap">{t(`profile:faculty.noExhibitionsFound`)}</div>
      ) : props.images && props.images.length === 0 && props.description && !isEditingFaculty ? (
        <div className="NoWrap"></div>
      ) : null}
      {isEditingFaculty ? (
        <ImagesSectionWrap>
          {props.facultyImages && props.facultyImages.length > 0 ? (
            <>
              {props.facultyImages.map((img, index) => (
                <ImgWrap key={index}>
                  <img
                    src={createResizeImageUrl(img.pictureUrl, 'auto', 320, 'mediaLibrary')}
                    onError={(e) => {
                      imageErrorHandler(e, createImageUrl(img.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
                    }}
                    alt=""
                  />
                  <VscChromeClose className="Close" onClick={() => props.deleteImg(index)} />
                </ImgWrap>
              ))}
            </>
          ) : null}
          {props.facultyImages && props.facultyImages.length < 5 ? (
            <ImgWrap className="LastChild" onClick={() => props.openModal()}>
              <IoCameraSharp />
              {t(`profile:faculty.addImages`)}
            </ImgWrap>
          ) : null}
        </ImagesSectionWrap>
      ) : null}
    </>
  )
}

ImagesSection.propTypes = {
  images: PropTypes.array,
  facultyImages: PropTypes.array,
  description: PropTypes.string,
  deleteImg: PropTypes.func,
  openModal: PropTypes.func,
  openLightbox: PropTypes.func,
}

export default ImagesSection
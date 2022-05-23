import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import update from 'immutability-helper'
import styled from 'styled-components'
import {uniqBy} from 'lodash'
import PropTypes from 'prop-types'
import { IoCameraSharp } from 'react-icons/io5'
import { VscChromeClose } from 'react-icons/vsc'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import CancelButton from '../../UI/CancelButton'
import { isTouchDevice } from '../../../utilities/newTabUtils'
import CloseIcon from '../../UI/CloseIcon/CloseIcon'
import AlbumImage from './singleAlbum'
const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend

const PopupWrap = styled.div`
  width: auto;
  position: relative;
  min-width: 400px;
  max-width: 560px;
  min-height: 220px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  padding: 25px;
  max-height: 80vh;
  overflow-y: auto;
  @media (max-width: 767px) {
    min-width: 260px;
    margin: 15px;
  }
  /* @media (min-width: 1025px) {
    max-width: inherit;
  } */
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 70vh;
    overflow-y: auto;
    height: auto;
    min-width: 320px;
  }
  .photo-album-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`
const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0;
  }
`
const ImagesSectionWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 15px 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  @media (max-width: 991px) {
    margin: 20px 0 0;
  }
`
const ImgWrap = styled.div`
  width: 98px;
  height: 98px;
  position: relative;
  margin: 0 3px 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 3px solid #eee;
  padding: 5px;
  img {
    max-height: 98px;
  }
  > div:first-child {
    @media (max-width: 1024px) {
      opacity: 1 !important;
    }
  }
  @media (max-width: 479px) {
    width: 98px;
    height: 98px;
    margin: 0 5px 10px 0;
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
  :last-child {
    border: 3px dashed #eeeeee;
    justify-content: center;
    width: 98px;
    height: 98px;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 17px;
    color: #222;
    flex-direction: column;
    cursor: pointer;
    svg {
      color: #aaa;
      font-size: 42px;
      @media (max-width: 479px) {
        font-size: 24px;
      }
    }
    @media (max-width: 479px) {
      width: 100px;
      height: 100px;
    }
  }
`

const AddImages = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 15px;
`

const AddComments = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 0;
  justify-content: flex-start;
  flex-wrap: wrap;
  input {
    padding: 0 15px;
    font-family: 'Montserrat-Regular';
    margin: 0 0 15px;
    width: 100%;
    border: 2px solid #eeeeee;
    height: 36px;
    overflow: auto;
    font-size: 14px;
    border-radius: 0;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
  textarea {
    padding: 15px;
    font-family: 'Montserrat-Regular';
    margin: 0 0 15px;
    width: 100%;
    resize: none;
    border: 2px solid #eeeeee;
    min-height: 73px;
    overflow: auto;
    font-size: 14px;
    border-radius: 0;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 5px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: Montserrat-Regular;
  :hover,
  :focus {
    outline: 0;
  }
  :disabled {
    opacity: 0.8;
    cursor: default;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
    margin: 15px 0 0;
  }
`

const BottomDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const DivText = styled.div`
  font-size: 14px;
`

const UploadImage = styled.div`
  max-width: 398px;
  height: 150px;
  position: relative;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #eeeeee;
  font-size: 14px;
  cursor: pointer;
  svg {
    color: #aaa;
    font-size: 62px;
    @media (max-width: 479px) {
      font-size: 24px;
    }
  }
`
const ErrorSpan = styled.div`
  font-size: 14px;
  color: #d62d1e;
  margin: 0 0 10px 0;
`
const BottomBtnwrap = styled.div`
  @media (max-width: 767px) {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
  }
`
const AddPhotoAlbumPopup = ({ onAddAlbumClick, setModal,setEditType,editType,editData,setEditData }) => {
  const { t } = useTranslation('newsFeed')

  const [openMediaLibrary, setOpenMediaLibrary] = useState(false)
  const [albumPhotos, setAlbumPhotos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({
    title: null,
    description: null,
  })
  
  useEffect(()=>{
    setAlbumPhotos(editData&&editData.pictures)
    setTitle(editData&&editData.title)
    setDescription(editData&&editData.description)
  },[editData])
  /**
   * Add images from media library to album
   * @param {*} imgsData media library images
   */
  const getSelectedImages = (imgsData) => {
    if (imgsData.length > 0) {
      const allPhotos = [...albumPhotos, ...imgsData]
      setAlbumPhotos(uniqBy(allPhotos, '_id').slice(0, 50))
    }
  }
  /**
   * Remove particular image from album
   * @param {*} photoId
   */
  const removeImageHandler = (photoId) => {
    const imagesArr = [...albumPhotos]
    const filteredArr = imagesArr.filter((imgObj) => imgObj._id !== photoId)
    setAlbumPhotos(filteredArr)
  }
  /**
   * Publish album
   */
  const publishAlbumHandler = () => {
    onAddAlbumClick({ title, description, albumPhotos,albumId:editData&&editData._id },editType&&'edit')
  }

  const handleTitleChange = (event) => {
    const value = event.target.value
    let titleError = null
    if (value.length > 100) {
      titleError = t(`addPhotoAlbumPopup.errorLabels.maxCharacter100`)
    } else if (value.length === 0) {
      titleError = t(`addPhotoAlbumPopup.errorLabels.titleRequired`)
    }
    setErrors({ ...errors, title: titleError })
    setTitle(value)
  }

  const handleDescriptionChange = (event) => {
    const value = event.target.value
    let descriptionError = null
    if (value.length > 500) {
      descriptionError = t(`addPhotoAlbumPopup.errorLabels.maxCharacter500`)
    }
    setErrors({ ...errors, description: descriptionError })
    setDescription(value)
  }
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = albumPhotos[dragIndex]
    setAlbumPhotos(
      update(albumPhotos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    )
  }

  const closeAddAlbum=()=>{
    setEditType('')
    setEditData('')
    setModal(false)
  }
  return (
    <>
      {openMediaLibrary && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openMediaLibrary}
          closeModal={() => setOpenMediaLibrary(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenMediaLibrary(false)}
            getUploadedImages={getSelectedImages}
            limit={50 - albumPhotos.length}
            fixedLimit={albumPhotos.length ? false : true}
          />
        </ModalComponent>
      )}
      <PopupWrap>
        <CloseIcon className="photo-album-close" onclick={closeAddAlbum} />
        <SectionHeading>{ editType?t(`editPhotoAlbumPopup.title`): t(`addPhotoAlbumPopup.title`)}</SectionHeading>

        {albumPhotos.length === 0 &&!editData&& (
          <UploadImage onClick={() => setOpenMediaLibrary(true)}>
            <IoCameraSharp />
            {t(`addPhotoAlbumPopup.limitText`)}
          </UploadImage>
        )}
        <AddImages>
          <DndProvider backend={backendForDND}>
            {(albumPhotos.length > 0||editData) && (
              <ImagesSectionWrap>
                <>
                  {albumPhotos.map((photo, index) => (
                    <ImgWrap key={photo._id}>
                      <AlbumImage image={photo} index={index} moveImage={moveImage} />
                      <VscChromeClose className="Close" onClick={() => removeImageHandler(photo._id)} />
                    </ImgWrap>
                  ))}
                  <ImgWrap onClick={() => setOpenMediaLibrary(true)}>
                    <IoCameraSharp />
                    {t(`addPhotoAlbumPopup.addImages`)}
                  </ImgWrap>
                </>
              </ImagesSectionWrap>
            )}
          </DndProvider>
          {(albumPhotos.length > 0||editData)&& (
            <AddComments>
              <input
                placeholder={t(`addPhotoAlbumPopup.placeholderAddTitle`)}
                value={title}
                onChange={handleTitleChange}
              ></input>
              <ErrorSpan>{errors.title}</ErrorSpan>
              <textarea
                placeholder={t(`addPhotoAlbumPopup.writeSomething`)}
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              <ErrorSpan>{errors.description}</ErrorSpan>
              <BottomDiv>
                <DivText>{t(`addPhotoAlbumPopup.firstPhotoInfo`)}</DivText>
                <BottomBtnwrap>
                  <CancelButton onClick={closeAddAlbum} /> &nbsp;
                  <PublishBtn
                    onClick={publishAlbumHandler}
                    disabled={albumPhotos.length === 0 || errors.title || title === '' || errors.description}
                  >
                    {editType? t(`editPhotoAlbumPopup.updateButton`): t(`addPhotoAlbumPopup.publish`)}
                  </PublishBtn>
                </BottomBtnwrap>
              </BottomDiv>
            </AddComments>
          )}
        </AddImages>
      </PopupWrap>
    </>
  )
}

AddPhotoAlbumPopup.propTypes = {
  setModal: PropTypes.func,
  onAddAlbumClick: PropTypes.func,
  editData: PropTypes.func,
  setEditData: PropTypes.func,
}

export default AddPhotoAlbumPopup

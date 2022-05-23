import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import AlbumPostsPopup from '../AlbumPostsPopup'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { updateRoleSpecificSection } from '../../../modules/profile/myProfileSlice'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const TechniqueSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px 0;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const TechniqueSection = ({refObject}) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation','successResponses'])
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [descValue, setDescValue] = useState(
    userDataState && !isEmptyObj(userDataState.technique) && userDataState.technique.description
      ? userDataState.technique.description
      : ''
  )
  const [descCharCount, setDescCharCount] = useState(
    userDataState && !isEmptyObj(userDataState.technique) && userDataState.technique.description
      ? userDataState.technique.description.length
      : 0
  )
  const [techniqueImages, setTechniqueImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.technique) &&
      userDataState.technique.images &&
      userDataState.technique.images.length
      ? userDataState.technique.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!isEmptyObj(userDataState.technique)) {
      if (userDataState.technique.description !== descValue) {
        setDescValue(userDataState.technique.description)
        if (userDataState.technique.description) {
          setDescCharCount(userDataState.technique.description.length)
        }
      }

      if (userDataState.technique.images !== techniqueImages) {
        setTechniqueImages(userDataState.technique.images)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataState])

  const descOnChange = (e) => {
    const value = e.target.value
    const length = value.length
    setDescValue(value)
    setDescCharCount(length)
  }

  const deleteImg = (imgId) => {
    const imagesArr = [...techniqueImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setTechniqueImages(filteredArr)
  }

  const getUploadedImages = (imgsData) => {
    const imagesArr = [...techniqueImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setTechniqueImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setTechniqueImages(newImages)
      }
    }
  }

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.technique)) {
      if (userDataState.technique.description !== descValue) {
        setDescValue(userDataState.technique.description)
        if (userDataState.technique.description) {
          setDescCharCount(userDataState.technique.description.length)
        }
      }

      if (userDataState.technique.images !== techniqueImages) {
        setTechniqueImages(userDataState.technique.images)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = techniqueImages.map((img) => img._id)
    const info = {
      field: 'technique',
      data: {
        description: descValue,
        images: imageIdsArr,
      },
    }
    dispatch(updateRoleSpecificSection(info, 'technique', 'artist',t))
  }

  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  return (
    <>
      {showSection(myProfile, 'techniques') ? (
        <div ref={refObject.TechniqueSectionRef} id="technique">
          {openUploadModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openUploadModal}
              closeModal={() => setOpenUploadModal(false)}
            >
              <MediaLibrary
                closeModal={() => setOpenUploadModal(false)}
                getUploadedImages={getUploadedImages}
                limit={5 - techniqueImages.length}
                fixedLimit={techniqueImages.length ? false : true}
                singleSelection={5 - techniqueImages.length === 1 ? true : false}
              />
            </ModalComponent>
          )}
          {openLightboxModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openLightboxModal}
              closeModal={() => setOpenLightboxModal(false)}
            >
              <AlbumPostsPopup
                activeIndex={activeImage}
                imagesData={techniqueImages}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          {userDataState.userRole === 'artist' ? (
            <TechniqueSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SectionHeader descCharCount={descCharCount} userData={userDataState} updateData={updateData} handleCancelClick={handleCancelClick} />
              <SectionContent
                descValue={descValue}
                deleteImg={deleteImg}
                descOnChange={descOnChange}
                descCharCount={descCharCount}
                techniqueImages={techniqueImages}
                openModal={() => setOpenUploadModal(true)}
                openLightbox={openLightboxHandler}
                userData={userDataState && userDataState.technique}
              />
            </TechniqueSectionWrap>
          ) : null}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
TechniqueSection.propTypes = {
  refObject:PropTypes.object
}
export default TechniqueSection

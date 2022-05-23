import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import AlbumPostsPopup from '../AlbumPostsPopup'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { updateRoleSpecificSection } from '../../../modules/profile/myProfileSlice'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const PublicationsSectionWrap = styled.div`
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

const PublicationsSection = (props) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation','successResponses'])

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [descValue, setDescValue] = useState(
    userDataState && !isEmptyObj(userDataState.publications) && userDataState.publications.description
      ? userDataState.publications.description
      : ''
  )
  const [descCharCount, setDescCharCount] = useState(
    userDataState && !isEmptyObj(userDataState.publications) && userDataState.publications.description
      ? userDataState.publications.description.length
      : 0
  )
  const [publicationsImages, setPublicationsImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.publications) &&
      userDataState.publications.images &&
      userDataState.publications.images.length
      ? userDataState.publications.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!isEmptyObj(userDataState.publications)) {
      if (userDataState.publications.description !== descValue) {
        setDescValue(userDataState.publications.description)
        if (userDataState.publications.description) {
          setDescCharCount(userDataState.publications.description.length)
        }
      }

      if (userDataState.publications.images !== publicationsImages) {
        setPublicationsImages(userDataState.publications.images)
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
    const imagesArr = [...publicationsImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setPublicationsImages(filteredArr)
  }

  const getUploadedImages = (imgsData) => {
    const imagesArr = [...publicationsImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setPublicationsImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setPublicationsImages(newImages)
      }
    }
  }

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.publications)) {
      if (userDataState.publications.description !== descValue) {
        setDescValue(userDataState.publications.description)
        // if (userDataState.publications.description) {
        setDescCharCount(userDataState.publications.description.length)
        // }
      }

      if (userDataState.publications.images !== publicationsImages) {
        setPublicationsImages(userDataState.publications.images)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = publicationsImages.map((img) => img._id)
    const info = {
      field: 'publications',
      data: {
        description: descValue,
        images: imageIdsArr,
      },
    }
    dispatch(updateRoleSpecificSection(info, 'publications', 'artist',t))
  }

  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  return (
    <>
      {showSection(myProfile, 'publications') ? (
        <div ref={props.refObject.PublicationsSectionRef} id="publications">
          {openUploadModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openUploadModal}
              closeModal={() => setOpenUploadModal(false)}
            >
              <MediaLibrary
                closeModal={() => setOpenUploadModal(false)}
                getUploadedImages={getUploadedImages}
                limit={5 - publicationsImages.length}
                fixedLimit={publicationsImages.length ? false : true}
                singleSelection={5 - publicationsImages.length === 1 ? true : false}
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
                imagesData={publicationsImages}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          {userDataState.userRole === 'artist' ? (
            <PublicationsSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SectionHeader descCharCount={descCharCount} userData={userDataState} updateData={updateData} handleCancelClick={handleCancelClick} />
              <SectionContent
                descValue={descValue}
                deleteImg={deleteImg}
                descOnChange={descOnChange}
                descCharCount={descCharCount}
                publicationsImages={publicationsImages}
                openModal={() => setOpenUploadModal(true)}
                openLightbox={openLightboxHandler}
                userData={userDataState && userDataState.publications}
              />
            </PublicationsSectionWrap>
          ) : null}
        </div>
      ) : (
        <></>

      )}
    </>
  )
}
PublicationsSection.propTypes = {
  refObject:PropTypes.object
}
export default PublicationsSection

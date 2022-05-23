import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import ModalComponent from '../../UI/Modal'
import PropTypes from 'prop-types'
import MediaLibrary from '../../UI/MediaLibrary'
import AlbumPostsPopup from '../AlbumPostsPopup'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { updateRoleSpecificSection } from '../../../modules/profile/myProfileSlice'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const BusinessSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
`

const BusinessSection = (props) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation','successResponses'])
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)

  const [descValue, setDescValue] = useState(
    userDataState &&
      !isEmptyObj(userDataState.aboutMyBusinessProfession) &&
      userDataState.aboutMyBusinessProfession.description
      ? userDataState.aboutMyBusinessProfession.description
      : ''
  )
  const [descCharCount, setDescCharCount] = useState(
    userDataState &&
      !isEmptyObj(userDataState.aboutMyBusinessProfession) &&
      userDataState.aboutMyBusinessProfession.description
      ? userDataState.aboutMyBusinessProfession.description.length
      : 0
  )
  const [aboutMyBusinessProfessionImages, setAboutMyBusinessProfessionImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.aboutMyBusinessProfession) &&
      userDataState.aboutMyBusinessProfession.images &&
      userDataState.aboutMyBusinessProfession.images.length
      ? userDataState.aboutMyBusinessProfession.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!isEmptyObj(userDataState.aboutMyBusinessProfession)) {
      if (userDataState.aboutMyBusinessProfession.description !== descValue) {
        setDescValue(userDataState.aboutMyBusinessProfession.description)
        if (userDataState.aboutMyBusinessProfession.description) {
          setDescCharCount(userDataState.aboutMyBusinessProfession.description.length)
        }
      }

      if (userDataState.aboutMyBusinessProfession.images !== aboutMyBusinessProfessionImages) {
        setAboutMyBusinessProfessionImages(userDataState.aboutMyBusinessProfession.images)
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
    const imagesArr = [...aboutMyBusinessProfessionImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setAboutMyBusinessProfessionImages(filteredArr)
  }
  const getUploadedImages = (imgsData) => {
    const imagesArr = [...aboutMyBusinessProfessionImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setAboutMyBusinessProfessionImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setAboutMyBusinessProfessionImages(newImages)
      }
    }
  }

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.aboutMyBusinessProfession)) {
      if (userDataState.aboutMyBusinessProfession.description !== descValue) {
        setDescValue(userDataState.aboutMyBusinessProfession.description)
        // if (userDataState.aboutMyBusinessProfession.description) {
        setDescCharCount(userDataState.aboutMyBusinessProfession.description.length)
        // }
      }

      if (userDataState.aboutMyBusinessProfession.images !== aboutMyBusinessProfessionImages) {
        setAboutMyBusinessProfessionImages(userDataState.aboutMyBusinessProfession.images)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = aboutMyBusinessProfessionImages.map((img) => img._id)
    const info = {
      field: 'aboutMyBusinessProfession',
      data: {
        description: descValue,
        images: imageIdsArr,
      },
    }
    dispatch(updateRoleSpecificSection(info, 'aboutMyBusinessProfession', 'member',t))
  }

  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  return (
    <>
      {showSection(myProfile, 'business') ? (
        <div ref={props.refObject.BusinessSectionRef} id="business">
          {openUploadModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openUploadModal}
              closeModal={() => setOpenUploadModal(false)}
            >
              <MediaLibrary
                closeModal={() => setOpenUploadModal(false)}
                getUploadedImages={getUploadedImages}
                limit={5 - aboutMyBusinessProfessionImages.length}
                fixedLimit={aboutMyBusinessProfessionImages.length ? false : true}
                singleSelection={5 - aboutMyBusinessProfessionImages.length === 1 ? true : false}
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
                imagesData={aboutMyBusinessProfessionImages}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          {userDataState.userRole !== 'artist' ? (
            <BusinessSectionWrap>
              <SectionHeader descCharCount={descCharCount} userData={userDataState} updateData={updateData} handleCancelClick={handleCancelClick} />
              <SectionContent
                descValue={descValue}
                deleteImg={deleteImg}
                descOnChange={descOnChange}
                descCharCount={descCharCount}
                aboutMyBusinessProfessionImages={aboutMyBusinessProfessionImages}
                openModal={() => setOpenUploadModal(true)}
                openLightbox={openLightboxHandler}
                userData={userDataState && userDataState.aboutMyBusinessProfession}
              />
            </BusinessSectionWrap>
          ) : null}
        </div>
      ) : (
        <></>

      )}
    </>
  )
}
BusinessSection.propTypes = {
  refObject:PropTypes.object
}
export default BusinessSection

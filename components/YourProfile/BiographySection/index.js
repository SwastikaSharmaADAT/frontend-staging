import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import AlbumPostsPopup from '../AlbumPostsPopup'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const BiographySectionWrap = styled.div`
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

const BlurSection = styled.div`
  width: 100%;
  position: relative;
  filter: blur(5px);
  overflow: hidden;
  pointer-events: none;
`

const BiographySection = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation', 'successResponses'])

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)

  const [biographyValue, setBiographyValue] = useState(
    userDataState && userDataState.biography && userDataState.biography.description
      ? userDataState.biography.description
      : ''
  )
  const [biographyCharCount, setBiographyCharCount] = useState(
    userDataState && userDataState.biography && userDataState.biography.description
      ? userDataState.biography.description.length
      : 0
  )
  const [biographyImages, setBiographyImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.biography) &&
      userDataState.biography.images &&
      userDataState.biography.images.length
      ? userDataState.biography.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (userDataState.biography && userDataState.biography.description !== biographyValue) {
      setBiographyValue(userDataState.biography.description)
      if (userDataState.biography.description) {
        setBiographyCharCount(userDataState.biography.description.length)
      }
    }
    if (userDataState && userDataState.biography && userDataState.biography.images !== biographyImages) {
      setBiographyImages(userDataState.biography.images)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataState])

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.biography)) {
      if (userDataState.biography.description !== biographyValue) {
        setBiographyValue(userDataState.biography.description)
        if (userDataState.biography.description) {
          setBiographyCharCount(userDataState.biography.description.length)
        }
      }
      if (userDataState.biography.images !== biographyImages) {
        setBiographyImages(userDataState.biography.images)
      }
    }
  }

  const biographyOnChange = (e) => {
    const value = e.target.value
    const length = value.length
    setBiographyValue(value)
    setBiographyCharCount(length)
  }
  const deleteImg = (imgId) => {
    const imagesArr = [...biographyImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setBiographyImages(filteredArr)
  }
  const getUploadedImages = (imgsData) => {
    const imagesArr = [...biographyImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setBiographyImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setBiographyImages(newImages)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = biographyImages.map((img) => img._id)
    const data = {
      section: 'others',
      sectionData: {
        bio: userDataState.bio,
        biography: biographyValue,
        profileSwitchTo: userDataState.userRoleType === 'page' ? '' : userDataState.userRole,
        firstName: userDataState.firstName,
        lastName: userDataState.lastName,
        biographyImages: imageIdsArr ? imageIdsArr : [],
        aboutMe: userDataState.aboutMe && userDataState.aboutMe.description ? userDataState.aboutMe.description : '',
        images: userDataState.aboutMe && userDataState.aboutMe.images ? userDataState.aboutMe.images : [],
      },
    }
    dispatch(editProfile(data, 'biography', false, {}, biographyImages, t))
  }
  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  const renderBiographySection = () => (
    <div id="biography">
      {openUploadModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openUploadModal}
          closeModal={() => setOpenUploadModal(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenUploadModal(false)}
            getUploadedImages={getUploadedImages}
            limit={5 - biographyImages.length}
            fixedLimit={biographyImages.length ? false : true}
            singleSelection={5 - biographyImages.length === 1 ? true : false}
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
            imagesData={biographyImages}
            closeLightbox={() => setOpenLightboxModal(false)}
          />
        </ModalComponent>
      )}
      <SectionHeader biographyCharCount={biographyCharCount} updateData={updateData} userData={userDataState} handleCancelClick={handleCancelClick} />
      <SectionContent
        biographyOnChange={biographyOnChange}
        deleteImg={deleteImg}
        biographyCharCount={biographyCharCount}
        biographyValue={biographyValue}
        biographyImages={biographyImages}
        openModal={() => setOpenUploadModal(true)}
        openLightbox={openLightboxHandler}
        userData={userDataState}
      />
    </div>
  )
  return (
    <>
      {userDataState?.userRole === 'artist' ? (
        showSection(myProfile, 'biography') ? (
          <BiographySectionWrap>
            {!isEmptyObj(userDataState) && userDataState.userIdentity === 'guestUser' ? (
              <BlurSection>{renderBiographySection()}</BlurSection>
            ) : (
              renderBiographySection()
            )}
          </BiographySectionWrap>
        ) : (
          <></>
        )
      ) : null}
    </>
  )
}

export default BiographySection

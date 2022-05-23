import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
//import MessagePopup from '../MessagePopup'
import AlbumPostsPopup from '../AlbumPostsPopup'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const AboutSectionWrap = styled.div`
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
  &.rtl-ar-content {
    direction: rtl;
  }
`

const BlurSection = styled.div`
  width: 100%;
  position: relative;
  filter: blur(5px);
  overflow: hidden;
  pointer-events: none;
`

const AboutSection = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation', 'successResponses'])
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const [aboutValue, setAboutValue] = useState(
    userDataState && userDataState.aboutMe && userDataState.aboutMe.description ? userDataState.aboutMe.description : ''
  )
  const [aboutCharCount, setAboutCharCount] = useState(
    userDataState && userDataState.aboutMe && userDataState.aboutMe.description
      ? userDataState.aboutMe.description.length
      : 0
  )
  const [aboutImages, setAboutImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.aboutMe) &&
      userDataState.aboutMe.images &&
      userDataState.aboutMe.images.length
      ? userDataState.aboutMe.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if (userDataState.aboutMe && userDataState.aboutMe.description !== aboutValue) {
      setAboutValue(userDataState.aboutMe.description)
      if (userDataState.aboutMe.description) {
        setAboutCharCount(userDataState.aboutMe.description.length)
      }
    }
    if (userDataState && userDataState.aboutMe && userDataState.aboutMe.images !== aboutImages) {
      setAboutImages(userDataState.aboutMe.images)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataState])

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.aboutMe)) {
      if (userDataState.aboutMe.description !== aboutValue) {
        setAboutValue(userDataState.aboutMe.description)
        if (userDataState.aboutMe.description) {
          setAboutCharCount(userDataState.aboutMe.description.length)
        }
      }
      if (userDataState.aboutMe.images !== aboutImages) {
        setAboutImages(userDataState.aboutMe.images)
      }
    }
  }

  const aboutOnChange = (e) => {
    const value = e.target.value
    const length = value.length
    setAboutValue(value)
    setAboutCharCount(length)
  }
  const deleteImg = (imgId) => {
    const imagesArr = [...aboutImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setAboutImages(filteredArr)
  }
  const getUploadedImages = (imgsData) => {
    const imagesArr = [...aboutImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setAboutImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setAboutImages(newImages)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = aboutImages.map((img) => img._id)
    const data = {
      section: 'others',
      sectionData: {
        bio: userDataState.bio,
        aboutMe: aboutValue,
        profileSwitchTo: userDataState.userRoleType === 'page' ? '' : userDataState.userRole,
        firstName: userDataState.firstName,
        lastName: userDataState.lastName,
        biography:
          userDataState.biography && userDataState.biography.description ? userDataState.biography.description : '',
        biographyImages:
          userDataState.biography && userDataState.biography.images ? userDataState.biography.images : [],
        images: imageIdsArr ? imageIdsArr : [],
      },
    }
    dispatch(editProfile(data, 'about', false, {}, aboutImages, t))
  }
  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  const renderAboutSection = () => (
    <div ref={props.refObject.AboutSectionRef} id="about">
      {openUploadModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openUploadModal}
          closeModal={() => setOpenUploadModal(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenUploadModal(false)}
            getUploadedImages={getUploadedImages}
            limit={5 - aboutImages.length}
            fixedLimit={aboutImages.length ? false : true}
            singleSelection={5 - aboutImages.length === 1 ? true : false}
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
            imagesData={aboutImages}
            closeLightbox={() => setOpenLightboxModal(false)}
          />
        </ModalComponent>
      )}
      <SectionHeader aboutCharCount={aboutCharCount} updateData={updateData} userData={userDataState} handleCancelClick={handleCancelClick} />
      <SectionContent
        aboutOnChange={aboutOnChange}
        deleteImg={deleteImg}
        aboutCharCount={aboutCharCount}
        aboutValue={aboutValue}
        aboutImages={aboutImages}
        openModal={() => setOpenUploadModal(true)}
        openLightbox={openLightboxHandler}
        userData={userDataState}
      />
    </div>
  )

  return (
    <>
      {showSection(myProfile, 'about') ? (
        <AboutSectionWrap ref={props.refProp} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          {!isEmptyObj(userDataState) && userDataState.userIdentity === 'guestUser' ? (
            <>
              {/* <MessagePopup className="singleUserProf"/> */}
              <BlurSection>{renderAboutSection()}</BlurSection>
            </>
          ) : (
            renderAboutSection()
          )}
        </AboutSectionWrap>
      ) : (
        <></>
      )}
    </>
  )
}

AboutSection.propTypes = {
  refProp: PropTypes.object,
  AboutSectionRef: PropTypes.object,
  refObject: PropTypes.object,
}

export default AboutSection

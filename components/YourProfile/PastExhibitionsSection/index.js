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

const PastExhibitionsSectionWrap = styled.div`
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

const PastExhibitionsSection = (props) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation','successResponses'])

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [descValue, setDescValue] = useState(
    userDataState && !isEmptyObj(userDataState.pastExhibitions) && userDataState.pastExhibitions.description
      ? userDataState.pastExhibitions.description
      : ''
  )
  const [descCharCount, setDescCharCount] = useState(
    userDataState && !isEmptyObj(userDataState.pastExhibitions) && userDataState.pastExhibitions.description
      ? userDataState.pastExhibitions.description.length
      : 0
  )
  const [pastExhibitionsImages, setPastExhibitionsImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.pastExhibitions) &&
      userDataState.pastExhibitions.images &&
      userDataState.pastExhibitions.images.length
      ? userDataState.pastExhibitions.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!isEmptyObj(userDataState.pastExhibitions)) {
      if (userDataState.pastExhibitions.description !== descValue) {
        setDescValue(userDataState.pastExhibitions.description)
        if (userDataState.pastExhibitions.description) {
          setDescCharCount(userDataState.pastExhibitions.description.length)
        }
      }

      if (userDataState.pastExhibitions.images !== pastExhibitionsImages) {
        setPastExhibitionsImages(userDataState.pastExhibitions.images)
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
    const imagesArr = [...pastExhibitionsImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setPastExhibitionsImages(filteredArr)
  }

  const getUploadedImages = (imgsData) => {
    const imagesArr = [...pastExhibitionsImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setPastExhibitionsImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setPastExhibitionsImages(newImages)
      }
    }
  }

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.pastExhibitions)) {
      if (userDataState.pastExhibitions.description !== descValue) {
        setDescValue(userDataState.pastExhibitions.description)
        // if (userDataState.pastExhibitions.description) {
        setDescCharCount(userDataState.pastExhibitions.description.length)
        // }
      }

      if (userDataState.pastExhibitions.images !== pastExhibitionsImages) {
        setPastExhibitionsImages(userDataState.pastExhibitions.images)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = pastExhibitionsImages.map((img) => img._id)
    const info = {
      field: 'pastExhibitions',
      data: {
        description: descValue,
        images: imageIdsArr,
      },
    }
    dispatch(updateRoleSpecificSection(info, 'pastExhibitions', 'artist',t))
  }

  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  return (
    <>
      {showSection(myProfile, 'pastExhibitions') ? (
        <div ref={props.refObject.PastExhibitionsSectionRef} id="pastExhibitons">
          {openUploadModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openUploadModal}
              closeModal={() => setOpenUploadModal(false)}
            >
              <MediaLibrary
                closeModal={() => setOpenUploadModal(false)}
                getUploadedImages={getUploadedImages}
                limit={5 - pastExhibitionsImages.length}
                fixedLimit={pastExhibitionsImages.length ? false : true}
                singleSelection={5 - pastExhibitionsImages.length === 1 ? true : false}
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
                imagesData={pastExhibitionsImages}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          <PastExhibitionsSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader descCharCount={descCharCount} userData={userDataState} updateData={updateData} handleCancelClick={handleCancelClick} />
            <SectionContent
              descValue={descValue}
              deleteImg={deleteImg}
              descOnChange={descOnChange}
              descCharCount={descCharCount}
              pastExhibitionsImages={pastExhibitionsImages}
              openModal={() => setOpenUploadModal(true)}
              openLightbox={openLightboxHandler}
              userData={userDataState && userDataState.pastExhibitions}
            />
          </PastExhibitionsSectionWrap>
        </div>
      ) : (
        <></>

      )}
    </>
  )
}
PastExhibitionsSection.propTypes = {
  refObject:PropTypes.object
}
export default PastExhibitionsSection

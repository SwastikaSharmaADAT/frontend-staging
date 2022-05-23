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

const NewsSectionWrap = styled.div`
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

const NewsSection = (props) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['translation','successResponses'])

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [descValue, setDescValue] = useState(
    userDataState && !isEmptyObj(userDataState.news) && userDataState.news.description
      ? userDataState.news.description
      : ''
  )
  const [descCharCount, setDescCharCount] = useState(
    userDataState && !isEmptyObj(userDataState.news) && userDataState.news.description
      ? userDataState.news.description.length
      : 0
  )
  const [newsImages, setNewsImages] = useState(
    userDataState &&
      !isEmptyObj(userDataState.news) &&
      userDataState.news.images &&
      userDataState.news.images.length
      ? userDataState.news.images
      : []
  )
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!isEmptyObj(userDataState.news)) {
      if (userDataState.news.description !== descValue) {
        setDescValue(userDataState.news.description)
        if (userDataState.news.description) {
          setDescCharCount(userDataState.news.description.length)
        }
      }

      if (userDataState.news.images !== newsImages) {
        setNewsImages(userDataState.news.images)
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
    const imagesArr = [...newsImages]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setNewsImages(filteredArr)
  }

  const getUploadedImages = (imgsData) => {
    const imagesArr = [...newsImages]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setNewsImages(newImages)
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setNewsImages(newImages)
      }
    }
  }

  const handleCancelClick = () => {
    if (!isEmptyObj(userDataState.news)) {
      if (userDataState.news.description !== descValue) {
        setDescValue(userDataState.news.description)
        // if (userDataState.news.description) {
        setDescCharCount(userDataState.news.description.length)
        // }
      }

      if (userDataState.news.images !== newsImages) {
        setNewsImages(userDataState.news.images)
      }
    }
  }

  const updateData = () => {
    const imageIdsArr = newsImages.map((img) => img._id)
    const info = {
      field: 'news',
      data: {
        description: descValue,
        images: imageIdsArr,
      },
    }
    dispatch(updateRoleSpecificSection(info, 'news', 'artist',t))
  }

  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }

  return (
    <>
      {showSection(myProfile, 'news') ? (
        <div ref={props.refObject.NewsSectionRef} id="pastExhibitons">
          {openUploadModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openUploadModal}
              closeModal={() => setOpenUploadModal(false)}
            >
              <MediaLibrary
                closeModal={() => setOpenUploadModal(false)}
                getUploadedImages={getUploadedImages}
                limit={5 - newsImages.length}
                fixedLimit={newsImages.length ? false : true}
                singleSelection={5 - newsImages.length === 1 ? true : false}
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
                imagesData={newsImages}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          <NewsSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader descCharCount={descCharCount} userData={userDataState} updateData={updateData} handleCancelClick={handleCancelClick} />
            <SectionContent
              descValue={descValue}
              deleteImg={deleteImg}
              descOnChange={descOnChange}
              descCharCount={descCharCount}
              newsImages={newsImages}
              openModal={() => setOpenUploadModal(true)}
              openLightbox={openLightboxHandler}
              userData={userDataState && userDataState.news}
            />
          </NewsSectionWrap>
        </div>
      ) : (
        <></>

      )}
    </>
  )
}
NewsSection.propTypes = {
  refObject:PropTypes.object
}
export default NewsSection

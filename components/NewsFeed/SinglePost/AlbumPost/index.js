import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../../UI/Modal'
import AlbumPostsPopup from '../../../YourProfile/AlbumPostsPopup'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const AlbumPostWrap = styled.div`
  width: 100%;
  max-height: 1000px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 10px;
  height: 100%;
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    max-height: 1000px;
  }
`
// const DefaultMessage = styled.span`
//   font-style: normal;
//   color: #666;
//   font-size: 16px;
// `
const AlbumPostTextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-family: 'Montserrat-Regular';
  padding: 0 50px;
  text-align: left;
  @media (max-width: 767px) {
    padding: 0 20px;
  }
`

const TextHeading = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  text-align: left;
  font-size: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
const TextDescription = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Montserrat-Regular';
  text-align: left;
  font-size: 16px;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 0 0 10px 0;
  }
  @media (max-width: 479px) {
    font-size: 12px;
  }
`

const AddPhotos = styled.div`
  width: 100%;
  color: #fff;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  text-align: left;
  font-size: 24px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const OverlayBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  display: flex;
`

const AlbumPost = ({ postInfo, singleActivityType }) => {
  const { t } = useTranslation('newsFeed')

  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [title, translateTitle] = useTranslateContent('')
  const [description, translateDescription] = useTranslateContent('')

  const getSlug = () => {
    if (
      postInfo.newsFeedType === 'buzzs' ||
      postInfo.newsFeedType === 'potds' ||
      postInfo.newsFeedType === 'exhibitions'
    ) {
      return postInfo.articleSlug
    } else if (postInfo.newsFeedType === 'artworks') {
      return postInfo.artworkSlug
    } else return postInfo._id
  }

  useEffect(() => {
    if (postInfo && postInfo.description) translateDescription(postInfo && postInfo.description)
    if (postInfo && postInfo.title) translateTitle(postInfo && postInfo.title)
  }, [postInfo])
  return (
    <>
      {openLightboxModal && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openLightboxModal}
          closeModal={() => setOpenLightboxModal(false)}
        >
          <AlbumPostsPopup
            activeIndex={0}
            imagesData={postInfo.pictures}
            showRightSection={true}
            userInfo={postInfo && !isEmptyObj(postInfo.userId) && postInfo.userId}
            likes={postInfo && Array.isArray(postInfo.likes) && postInfo.likes}
            postDate={postInfo.dateCreated}
            comments={postInfo && Array.isArray(postInfo.comments) && postInfo.comments}
            albumTitle={postInfo.title}
            activityId={postInfo._id}
            activityType={postInfo.newsFeedType}
            activityOwnerUsername={postInfo.userId.username}
            shareSlug={getSlug()}
            singleActivityType={singleActivityType}
            closeLightbox={() => setOpenLightboxModal(false)}
          />
        </ModalComponent>
      )}
      {postInfo && (
        <>
          <AlbumPostWrap
            onClick={() => (postInfo.pictures && postInfo.pictures.length > 0 ? setOpenLightboxModal(true) : null)}
          >
            <img
              src={
                !isEmptyObj(postInfo.coverPicture)
                  ? createResizeImageUrl(postInfo.coverPicture.pictureUrl, 'auto', 720, 'mediaLibrary')
                  : postInfo.coverPicture === null
                  ? '/assets/image_not_available.png'
                  : '/assets/mo-fallback-image.png'
              }
              onError={(e) => {
                imageErrorHandler(
                  e,
                  createImageUrl(postInfo.coverPicture && postInfo.coverPicture.pictureUrl),
                  '/assets/mo-fallback-image.png',
                  'mediaLibrary',
                  ''
                )
              }}
              alt="Album Post"
            />
            <OverlayBg>
              <AlbumPostTextWrap>
                <TextHeading>{title ? title : postInfo && postInfo.title}</TextHeading>
                <TextDescription>{description ? description : postInfo && postInfo.description}</TextDescription>
                <AddPhotos>
                  {postInfo.pictures && postInfo.pictures.length > 1
                    ? `+ ${postInfo.pictures.length - 1} ${
                        postInfo.pictures.length - 1 > 1 ? t(`singlePost.photoPlural`) : t(`singlePost.photo`)
                      }`
                    : null}
                </AddPhotos>
              </AlbumPostTextWrap>
            </OverlayBg>
          </AlbumPostWrap>
          {/* {postInfo.coverPicture === null && <DefaultMessage>The content is not available anymore</DefaultMessage>} */}
          {/* {postInfo.coverPicture === null && <img src={PlaceholderImage} alt="" />} */}
        </>
      )}
    </>
  )
}

AlbumPost.propTypes = {
  postInfo: PropTypes.object,
  singleActivityType: PropTypes.bool,
}

export default AlbumPost

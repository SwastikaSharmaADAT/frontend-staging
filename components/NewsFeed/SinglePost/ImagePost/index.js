import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import ModalComponent from '../../../UI/Modal'
import AlbumPostsPopup from '../../../YourProfile/AlbumPostsPopup'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ImagePostWrap = styled.div`
  width: 100%;
  max-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 10px;
  &.clickable {
    cursor: pointer;
  }
  img {
    width: 100%;
    max-height: 1000px;
  }
`

const ImagePost = ({ pic, picObj, type, activityId }) => {
  const router = useRouter()
  const [openLightboxModal, setOpenLightboxModal] = useState(false)

  const redirectHandler = (route) => {
    router.push(route)
  }

  return (
    <>
      {pic && (
        <>
          {openLightboxModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openLightboxModal}
              closeModal={() => setOpenLightboxModal(false)}
            >
              <AlbumPostsPopup
                activeIndex={0}
                imagesData={[picObj]}
                closeLightbox={() => setOpenLightboxModal(false)}
              />
            </ModalComponent>
          )}
          <ImagePostWrap
            className={type === 'userPosts' ? 'clickable' : 'clickable'}
            onClick={() =>
              type === 'userPosts' ? setOpenLightboxModal(true) : redirectHandler(`/${type.slice(0, -1)}/${activityId}`)
            }
          >
            <img
              src={createResizeImageUrl(pic, 'auto', 720, 'mediaLibrary')}
              onError={(e) => {
                imageErrorHandler(e, createImageUrl(pic), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
              }}
              alt="PostImg"
            />
          </ImagePostWrap>
        </>
      )}
    </>
  )
}

ImagePost.propTypes = {
  pic: PropTypes.string,
  picObj: PropTypes.object,
  type: PropTypes.string,
  activityId: PropTypes.string,
}

export default ImagePost

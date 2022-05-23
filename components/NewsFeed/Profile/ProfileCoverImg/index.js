import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ProfileCoverImgWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    @media (max-width: 767px) {
      height: 100%;
    }
  }
  @media (max-width: 767px) {
    padding: 0;
    flex-direction: column;
  }
`

const ProfileCoverImg = (props) => (
  <>
    <ProfileCoverImgWrapper>
      <img
        src={
          props.userData && props.userData.coverPicUrl
            ? createResizeImageUrl(props.userData.coverPicUrl, 300, 150, 'profileCover') +
            '?' +
            new Date(props.userData.dateUpdated).getTime()
            : '/assets/artmo_profile_default_cover.jpg'
        }
        onError={(e) => {
          const timeSuffix = '?' + new Date(props.userData.dateUpdated).getTime()
          imageErrorHandler(
            e,
            createImageUrl(props.userData.coverPicUrl),
            '/assets/artmo_profile_default_cover.jpg',
            'profileCover',
            timeSuffix
          )
        }}
        alt="Profile Cover"
      />
    </ProfileCoverImgWrapper>
  </>
)

ProfileCoverImg.propTypes = {
  userData: PropTypes.object,
}

export default ProfileCoverImg
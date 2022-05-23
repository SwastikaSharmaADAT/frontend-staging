import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ProfileImgWrapper = styled.div`
  width: 81px;
  position: relative;
  height: 81px;
  display: flex;
  align-items: center;
  margin: -40px auto 0;
  overflow: hidden;
  border: 2px solid #ffffff;
  background: #fff;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`

const ProfileImage = (props) => (
  <>
    <ProfileImgWrapper>
      <img
        src={
          props.userData && props.userData.profilePicUrl
            ? createResizeImageUrl(props.userData.profilePicUrl, 150, 150, 'profileCover') +
            '?' +
            new Date(props.userData.dateUpdated).getTime()
            : '/assets/artmo-default.png'
        }
        onError={(e) => {
          const timeSuffix = '?' + new Date(props.userData.dateUpdated).getTime()
          imageErrorHandler(e, createImageUrl(props.userData.profilePicUrl), '/assets/artmo-default.png', 'profileCover', timeSuffix)
        }}
        onClick={() => props.redirectToUserProfile(props.username)}
        alt="Profile Img"
      />
    </ProfileImgWrapper>
  </>
)

ProfileImage.propTypes = {
  userData: PropTypes.object,
  redirectToUserProfile: PropTypes.func,
  username: PropTypes.string,
}

export default ProfileImage
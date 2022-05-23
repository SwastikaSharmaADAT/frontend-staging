import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ArtworkImgWrapper = styled.div`
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
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`

const ArtworkImage = (props) => (
  <>
    <ArtworkImgWrapper>
      <img
        src={
          props.userPageDetails && props.userPageDetails.pageUserId.profilePicUrl
            ? createResizeImageUrl(props.userPageDetails.pageUserId.profilePicUrl, 150, 150, 'profileCover') +
              '?' +
              new Date(props.userPageDetails.pageUserId.dateUpdated).getTime()
            : '/assets/artmo-default.png'
        }
        onError={(e) => {
          const timeSuffix = '?' + new Date(props.userPageDetails.pageUserId.dateUpdated).getTime()
          imageErrorHandler(
            e,
            createImageUrl(props.userPageDetails.pageUserId.profilePicUrl),
            '/assets/artmo-default.png',
            'profileCover',
            timeSuffix
          )
        }}
        onClick={() => props.redirectToPageProfile(props.username)}
        alt="Profile Img"
      />
    </ArtworkImgWrapper>
  </>
)

ArtworkImage.propTypes = {
  userPageDetails: PropTypes.object,
  redirectToPageProfile: PropTypes.func,
  username: PropTypes.string,
}

export default ArtworkImage
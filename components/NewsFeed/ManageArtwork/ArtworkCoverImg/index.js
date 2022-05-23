import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ArtworkCoverImgWrapper = styled.div`
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

const ArtworkCoverImg = (props) => (
  <>
    <ArtworkCoverImgWrapper>
      <img
        src={
          props.userPageDetails && props.userPageDetails.pageUserId.coverPicUrl
            ? createResizeImageUrl(props.userPageDetails.pageUserId.coverPicUrl, 300, 150, 'profileCover') +
              '?' +
              new Date(props.userPageDetails.pageUserId.dateUpdated).getTime()
            : '/assets/artmo_profile_default_cover.jpg'
        }
        onError={(e) => {
          const timeSuffix = '?' + new Date(props.userPageDetails.pageUserId.dateUpdated).getTime()
          imageErrorHandler(
            e,
            createImageUrl(props.userPageDetails.pageUserId.coverPicUrl),
            '/assets/artmo_profile_default_cover.jpg',
            'profileCover',
            timeSuffix
          )
        }}
        alt="Profile Cover"
      />
    </ArtworkCoverImgWrapper>
  </>
)

ArtworkCoverImg.propTypes = {
  userPageDetails: PropTypes.object,
}

export default ArtworkCoverImg
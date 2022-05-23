import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, checkOldImage, imageErrorHandler } from '../../../../utilities/imageUtils'

const InnerBanner = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  height: 369px;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    height: 200px;
  }
`

const InnerBannerBar = styled.div`
  position: absolute;
  background: rgba(170, 170, 170, 0.7);
  width: 96%;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
  justify-content: flex-start;
  padding: 30px 20px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  bottom: 0;
  @media (max-width: 767px) {
    padding: 15px;
  }
`

const FeaturedPostItem = ({ post, redirectHandler }) => {
  const getType = (val) => {
    if (val === 'buzzs') {
      return 'buzz'
    } else if (val === 'exhibitions') {
      return 'exhibition'
    } else if (val === 'potds') {
      return 'potd'
    }
  }

  return (
    <>
      <InnerBanner onClick={() => redirectHandler(`/${getType(post.type)}/${post.articleSlug}`)}>
        <img
          src={
            post && post.picUrl === null
              ? '/assets/image_not_available.png'
              : post.picUrl && post.picUrl.pictureUrl
              ? checkOldImage(post.picUrl.pictureUrl, 1400, 1000, 'mediaLibrary', getType(post.type), post)
              : '/assets/mo-fallback-image.png'
          }
          onError={(e) => {
            imageErrorHandler(
              e,
              createImageUrl(post.picUrl.pictureUrl),
              '/assets/mo-fallback-image.png',
              'mediaLibrary',
              ''
            )
          }}
          alt=""
        />
        <InnerBannerBar>{post.title}</InnerBannerBar>
      </InnerBanner>
    </>
  )
}

FeaturedPostItem.propTypes = {
  post: PropTypes.object,
  redirectHandler: PropTypes.func,
}

export default FeaturedPostItem

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, checkOldImage, imageErrorHandler } from '../../../utilities/imageUtils'

const InnerBanner = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  /* height: 370px; */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    /* height: 200px; */
  }
`

const HeadingSection = ({ article, articleType }) => (
  <>
    <InnerBanner>
      <img
        src={
          article && article.picUrl === null
            ? '/assets/image_not_available.png'
            : article.picUrl && article.picUrl.pictureUrl
            ? checkOldImage(article.picUrl.pictureUrl, 'auto', 720, 'mediaLibrary', articleType, article)
            : '/assets/mo-fallback-image.png'
        }
        onError={(e) => {
          imageErrorHandler(
            e,
            createImageUrl(article.picUrl.pictureUrl),
            '/assets/mo-fallback-image.png',
            'mediaLibrary',
            ''
          )
        }}
        alt={article.imageAlt ? article.imageAlt : article.title}
      />
    </InnerBanner>
  </>
)

HeadingSection.propTypes = {
  article: PropTypes.object,
  articleType: PropTypes.string,
}

export default HeadingSection

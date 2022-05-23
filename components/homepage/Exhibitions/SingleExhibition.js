import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { stringTruncate } from '../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const OuterExhibition = styled.div`
  height: 230px;
  @media ( max-width: 450px ) {
    height: auto;
  }
`

const VideosName = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 8px 10px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  height: 100%;
  position: relative;
  z-index: 1;
  background: #000 ;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
`
function SingleExhibition({ article, openInNewTab, names, ind }) {
  const router=useRouter()
  return (
    <li key={article._id}>
      <OuterExhibition>
        <a onClick={() => router.push(`/exhibition/${article.articleSlug}`)}>
          <img
            src={
              article && article.picUrl === null
                ? '/assets/image_not_available.png'
                : article && article.picUrl && article.picUrl.pictureUrl
                  ? createResizeImageUrl(article.picUrl.pictureUrl, 450, 250, 'mediaLibrary')
                  : '/assets/image_not_available.png'
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(article.picUrl.pictureUrl),  '/assets/mo-fallback-image.png', 'mediaLibrary', '')
            }}

            alt="Home"
          />
          { article && article.title && (<VideosName>{ stringTruncate( names[ind]  ? names[ind]  : article.title, 5 )}</VideosName>) }
        </a>
      </OuterExhibition>
    </li>
  )
}
SingleExhibition.propTypes = {
  article: PropTypes.object,
  openInNewTab: PropTypes.func,
  names: PropTypes.array,
  ind: PropTypes.number,
}

export default SingleExhibition

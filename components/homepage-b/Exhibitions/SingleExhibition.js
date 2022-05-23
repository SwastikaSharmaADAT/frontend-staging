import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { stringTruncate } from '../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const OuterExhibition = styled.div`
  height: 150px;
  display: flex;
  box-shadow: 1px 1px 5px 5px rgb(0 0 0 / 25%);
  flex: 0 0 100%;
  box-sizing: border-box;
  background: linear-gradient(210deg, #121212 0%, #000 100%);
  border: 1px solid rgba(255,255,255,0.02);
  margin-bottom: 20px;
  align-content: center;
  img {
    width: auto;
    flex: 0 0 40%;
    object-fit: cover;
    max-width: 40%;
  }
`

const VideosName = styled.h1`
  font-family: 'Montserrat-Regular';
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
`

const Location = styled.div`
  margin-top: 15px;
  text-transform: uppercase;
  font-size: 12px;
  color: #ccc;
`

const ExhibitionInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 0 15px;

`


function SingleExhibition({ article, openInNewTab, names, ind }) {
  const router=useRouter()
  return (
      <OuterExhibition onClick={() => openInNewTab(`/exhibition/${article.articleSlug}`)}>
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
          <ExhibitionInfo>
          { article && article.title && (<VideosName>{ article.title}</VideosName>) }
          {article && article.country && article.city && <Location>{article.city + ', ' + article.country}</Location>}
          </ExhibitionInfo>
      </OuterExhibition>
  )
}
SingleExhibition.propTypes = {
  article: PropTypes.object,
  openInNewTab: PropTypes.func,
  names: PropTypes.array,
  ind: PropTypes.number,
}

export default SingleExhibition

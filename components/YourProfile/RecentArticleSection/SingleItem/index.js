import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { stringTruncate } from '../../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const SectionArticles = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  max-width: 140px;
  width: 100%;
  padding: 0;
  cursor: pointer;
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 145px;
  }
  @media (max-width: 479px) {
    max-width: 48%;
  }
`
const SectionImg = styled.div`
  height: 86px;
  max-width: 150px;
  margin: 0 0 5px;
  overflow: hidden;
  &:hover {
    img {
      transform: scale(1.1);
      transition: all 0.5s;
    }
  }
  img {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    object-fit: cover;
  }
`
const ArticleHeading = styled.div`
  font-style: normal;
  font-weight: normal;
  display: block !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: normal;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 5px;
`
const ArticleAuthorWrapper = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;
  color: #ccc;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
`
function SingleItem({ article }) {
  const router = useRouter()

  const nameOfUser =
    article && article.userId && article.userId.firstName && article.userId.lastName
      ? `${article.userId.firstName} ${article.userId.lastName}`
      : article.userId && article.userId.firstName
      ? article.userId.firstName
      : article.userId && article.userId.username
      ? article.userId.username
      : ''

  const [title, translateTitle] = useTranslateContent('')
  const [name, translateName] = useTranslateContent('')
  
  useEffect(() => {
    if (!isEmptyObj(article)) {
      translateTitle(article && article.title)
      translateName('by ' + nameOfUser)
    }
  }, [article, nameOfUser])

  return (
    <SectionArticles key={article._id} onClick={() => openInNewTab(`/buzz/${article.articleSlug}`)}>
      <SectionImg>
        <img
          src={
            article && article.picUrl === null
              ? '/assets/image_not_available.png'
              : article && article.picUrl && article.picUrl.pictureUrl
              ? createResizeImageUrl(article.picUrl.pictureUrl, 150, 100, 'mediaLibrary')
              : '/assets/image_not_available.png'
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
          alt=""
        />
      </SectionImg>
      {article && article.title && (
        <ArticleHeading>{stringTruncate(title ? title : article.title, 3)}</ArticleHeading>
      )}
      {article && article.userId && <ArticleAuthorWrapper>{name ? name : nameOfUser}</ArticleAuthorWrapper>}
    </SectionArticles>
  )
}
SingleItem.propTypes = {
  article: PropTypes.object,
}
export default SingleItem

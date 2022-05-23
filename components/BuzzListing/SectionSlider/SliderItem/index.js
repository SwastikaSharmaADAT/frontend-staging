import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, checkOldImage, imageErrorHandler } from '../../../../utilities/imageUtils'
import { stringTruncate } from '../../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  background: #ffffff;
  border: 0;
  text-align: center;
  cursor: pointer;
  @media (max-width: 464px) {
    max-width: 222px;
    margin: 0 auto;
    padding: 0 5px;
    overflow: hidden;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0px;
  height: 160px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  padding: 0;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    max-height: 160px;
    object-fit: cover;
  }
  @media (max-width: 464px) {
    height: 120px;
  }
`

const CollectionPara = styled.p`
  padding: 12px 0px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #222;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const SliderItem = ({ article, type, redirectHandler, titles, ind }) => {

  const [title, translateTitle] = useTranslateContent('')
  
  useEffect(() => {
    if (!isEmptyObj(article)) {
      translateTitle(article && article.title)
    }
  }, [article])

  return (
    <>
      <ItemsWrapper onClick={() => redirectHandler(`/${type}/${article.articleSlug}`)}>
        <CoverImg>
          <img
            src={
              article && article.picUrl === null
                ? '/assets/image_not_available.png'
                : article.picUrl && article.picUrl.pictureUrl
                ? checkOldImage(article.picUrl.pictureUrl, 300, 160, 'mediaLibrary', type, article)
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
            alt="Cover"
          />
        </CoverImg>
        {article && article.title && (
          <CollectionPara>{stringTruncate(titles[ind] ? titles[ind] : article && article.title, 5)}</CollectionPara>
        )}
      </ItemsWrapper>
    </>
  )
}

SliderItem.propTypes = {
  article: PropTypes.object,
  type: PropTypes.string,
  redirectHandler: PropTypes.func,
  titles: PropTypes.array,
  ind: PropTypes.number,
}

export default SliderItem

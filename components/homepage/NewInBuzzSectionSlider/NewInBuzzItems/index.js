import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { stringTruncate } from '../../../../utilities/stringTruncate'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const WrapperDiv = styled.div`
  @media( max-width: 767px ) {
    height: 100%
  }
`

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  background: #000;
  border: 2px solid #eeeeee;
  text-align: center;
  cursor: pointer;
  //min-height: 100%;
  @media (max-width: 464px) {
    max-width: 90%;
    margin: 0 auto;
    min-width: inherit;
    height: 98%;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0px;
  height: 190px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  padding: 0;
  justify-content: center;
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  img {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    object-fit: cover;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`

const CollectionPara = styled.p`
  padding: 12px 15px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const NewInBuzzItems = ({ article, titles, ind }) => {
  const router=useRouter()

  return (
    <WrapperDiv>
      <ItemsWrapper onClick={() => router.push(`/buzz/${article.articleSlug}`)}>
      <CoverImg>
          <img
            src={
              article && article.picUrl === null
                ? '/assets/image_not_available.png'
                : article && article.picUrl && article.picUrl.pictureUrl
                  ? createResizeImageUrl(article.picUrl.pictureUrl, 450, 250, 'mediaLibrary')
                  : '/assets/image_not_available.png'
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(article.picUrl.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
            }}

            alt="Cover"
          />
        </CoverImg>
        { article  && article.title && (<CollectionPara>{stringTruncate( titles[ind] ? titles[ind] :article.title, 4 ) }</CollectionPara>)}
      </ItemsWrapper>
    </WrapperDiv>
  )
}

NewInBuzzItems.propTypes = {
  article: PropTypes.object,
  title: PropTypes.array,
  ind: PropTypes.number,
}

export default NewInBuzzItems

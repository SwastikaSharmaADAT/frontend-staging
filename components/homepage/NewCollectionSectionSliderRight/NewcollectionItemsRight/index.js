import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { numberWithCommas } from '../../../../utilities/decimalSeparator'
import { stringTruncate } from '../../../../utilities/stringTruncate'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: relative;
  padding: 0 0 6px;
  background: #ffffff;
  text-align: center;
  cursor: pointer;
  min-height: 100%;
  @media (max-width: 464px) {
    margin: 0 auto;
    min-width: inherit;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 10px;
  height: 150px;
  max-height: 150px;
  object-fit: cover;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 150px;
    transition: transform 0.3s;
    object-fit: cover;
    @media (max-width: 479px) {
      max-height: 140px;
    }
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
  @media (max-width: 479px) {
    width: 140px;
    height: 140px;
    max-height: 140px;
  }
  @media (max-width: 359px) {
    width: 120px;
    height: 120px;
    max-height: 120px;
  }
`

const CollectionName = styled.h2`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  color: #000;
`

const CollectionUser = styled.h2`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;
  text-align: center;
  color: #222;
`
const CollectionPrice = styled.h2`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;
  text-align: center;
  color: #222;
`

const NewcollectionItemsRight = ({ artwork, titles, ind }) => {
  const { t } = useTranslation(['translation', 'landingPage'])
  const router = useRouter()

  // const nameOfUser =
  //   artwork && !artwork.isAdmin
  //     ? artwork.nameOfArtist &&
  //       artwork.nameOfArtist.firstName &&
  //       `${artwork.nameOfArtist.firstName} ${artwork.nameOfArtist.lastName}`
  //     : artwork.userId && artwork.userId.firstName && artwork.userId.lastName
  //       ? `${artwork.userId.firstName} ${artwork.userId.lastName}`
  //       : artwork.userId && artwork.userId.username
  //         ? artwork.userId.username
  //         : ''

  // const [name, translateName] = useTranslateContent('by ' + nameOfUser)
  // const price = artwork.price

  const [title, translateTitle] = useTranslateContent('')
  /**do not remove 'by' */
  useEffect(() => {
    if (!isEmptyObj(artwork)) {
      translateTitle(artwork && artwork.title)
      // translateName('by ' + nameOfUser)
    }
  }, [artwork])
  // }, [artwork, nameOfUser])
  return (
    <>
      <ItemsWrapper onClick={() => router.push(`/artworks/${artwork.productSlug}`)}>
        <CoverImg>
          <img
            src={
              artwork && artwork.artPhotos && artwork.artPhotos.length > 0 && artwork.artPhotos[0].pictureUrl
                ? createResizeImageUrl(artwork.artPhotos[0].pictureUrl, 150, 150, 'mediaLibrary')
                : '/assets/artworkdemo.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(artwork.artPhotos[0].pictureUrl),
                '/assets/artworkdemo.png',
                'mediaLibrary',
                ''
              )
            }}
            alt="Cover"
          />
        </CoverImg>
        {artwork && artwork.title && (
          <CollectionName>{stringTruncate(titles[ind] ? titles[ind] : artwork.title, 2)}</CollectionName>
        )}
        {/* <CollectionUser> {name}</CollectionUser> */}
        <CollectionPrice>
          {!artwork.priceOnRequest
            ? `€ ${numberWithCommas(artwork.price)}`
            : t(`landingPage:artworkSection.priceOnRequest`)}
        </CollectionPrice>
      </ItemsWrapper>
    </>
  )
}

NewcollectionItemsRight.propTypes = {
  artwork: PropTypes.object,
  title: PropTypes.object,
  ind: PropTypes.object,
}

export default NewcollectionItemsRight

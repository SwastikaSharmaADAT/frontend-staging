import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: absolute;
  margin: 0 6px;
  text-align: center;
  cursor: pointer;
  max-width: 20vw;
  @media (max-width: 464px) {
    max-width: 90%;
    margin: 0 auto;
    min-width: inherit;
  }
`
const CoverImg = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  &:hover {
    img {
      transform: scale(1.02);
    }
  }
  img {
    backdrop-filter: blur(2em);
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    object-fit: cover;
    @media (max-width: 1280px) {
      width: 100%;
    }
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
  color: #fff;
`

const CollectionUser = styled.h2`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;
  text-align: center;
  color: #fff;
`

const CollectionPrice = styled.h2`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: normal;
  text-align: center;
  color: #fff;
`

const NewcollectionItems = ({ artwork, index }) => {
  const { t } = useTranslation(['translation', 'landingPageB'])
  const router = useRouter()



  return (
    <ItemsWrapper style={{top: ((Math.random()) * 41) + '%', left: ((((Math.random() * 2))) * 15 + 'vw')}} onClick={() => openInNewTab(`/artworks/${artwork.productSlug}`)}>
      <CoverImg>
        <img
          src={
            artwork && artwork.artPhotos && artwork.artPhotos.length > 0 && artwork.artPhotos[0].pictureUrl
              ? createResizeImageUrl(artwork.artPhotos[0].pictureUrl, 1000, 'auto', 'mediaLibrary')
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
    </ItemsWrapper>
  )
}

NewcollectionItems.propTypes = {
  artwork: PropTypes.object,
  index: PropTypes.number
}

export default NewcollectionItems

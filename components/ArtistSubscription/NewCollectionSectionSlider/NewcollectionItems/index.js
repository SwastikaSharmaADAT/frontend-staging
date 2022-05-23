import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import CoverPhoto from '../../../../public/assets/artworkdemo.png'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0 0 6px;
  background: #ffffff;
  border: 2px solid #eeeeee;
  text-align: center;
  cursor: pointer;
  min-height: 100%;
  @media (max-width: 464px) {
    max-width: 150px;
    margin: 0 auto;
    min-width: inherit;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 10px;
  height: 200px;
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

const NewcollectionItems = ({ artwork }) => {
  const { t } = useTranslation(['translation', 'landingPage'])

  const nameOfUser =
    artwork && !artwork.isAdmin
      ? artwork.nameOfArtist &&
        artwork.nameOfArtist.firstName &&
        `${artwork.nameOfArtist.firstName} ${artwork.nameOfArtist.lastName}`
      : artwork.userId && artwork.userId.firstName && artwork.userId.lastName
      ? `${artwork.userId.firstName} ${artwork.userId.lastName}`
      : artwork.userId && artwork.userId.username
      ? artwork.userId.username
      : ''
  const [title, translateTitle] =useTranslateContent('')
  const [name, translateName] = useState(nameOfUser)
  useEffect(() => {
    if(!isEmptyObj(artwork)){
      translateTitle(artwork && artwork.title)
      translateName(nameOfUser)
    }
  }, [artwork, nameOfUser])

  return (
    <>
      <ItemsWrapper>
      <CoverImg>
          <img
            src={
              artwork && artwork.artPhotos && artwork.artPhotos.length > 0 && artwork.artPhotos[0].pictureUrl
                ? createResizeImageUrl(artwork.artPhotos[0].pictureUrl, 300, 300, 'mediaLibrary')
                : CoverPhoto
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(artwork.artPhotos[0].pictureUrl), CoverPhoto, 'mediaLibrary', '')
            }}
            alt="Cover"
          />
        </CoverImg>
        <CollectionName>{title?title:artwork && artwork.title}</CollectionName>
        <CollectionUser>{name?name:nameOfUser}</CollectionUser>
        <CollectionPrice>
          {!artwork.priceOnRequest
            ? `€ ${artwork.price.toString().replace('.', ',')}`
            : t(`landingPage:artworkSection.priceOnRequest`)}
        </CollectionPrice>
      </ItemsWrapper>
    </>
  )
}

NewcollectionItems.propTypes = {
  artwork: PropTypes.object,
}

export default NewcollectionItems

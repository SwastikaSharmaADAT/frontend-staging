import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { currenciesList } from '../../../../utilities/currenciesList'
import { decimalSeparatorMethod } from '../../../../utilities/decimalSeparator'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 12px;
  padding: 0 0 6px;
  color: #ffffff;
  background: linear-gradient(210deg, #222222 0%, #121212 100%);
  border: 1px solid rgba(255,255,255,0.02);
  box-shadow: 1px 1px 5px 5px rgb(0 0 0 / 25%);
  text-align: center;
  text-align: center;
  cursor: pointer;
  @media (max-width: 464px) {
    max-width: 90%;
    margin: 0 auto;
    min-width: inherit;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  max-height: 45vh;
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

const NewcollectionItems = ({ artwork, currency, conversionRate, decimalSeparator, names, titles, ind }) => {
  const { t } = useTranslation(['translation', 'landingPageB'])
  const router = useRouter()

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

  const [title, translateTitle] = useTranslateContent(artwork && artwork.title)
  const [name, translateName] = useState(nameOfUser)
  useEffect(() => {
    translateTitle(artwork && artwork.title)
    translateName(nameOfUser)
  }, [artwork, nameOfUser, translateName, translateTitle])

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const formattedPrice = (price) => {
    if (price.toString().includes(',')) {
      return price.toString().replace(',', '.')
    } else {
      return price
    }
  }

  return (
    <>
      <ItemsWrapper onClick={() => openInNewTab(`/artworks/${artwork.productSlug}`)}>
      <CoverImg>
          <img
            src={
              artwork && artwork.artPhotos && artwork.artPhotos.length > 0 && artwork.artPhotos[0].pictureUrl
                ? createResizeImageUrl(artwork.artPhotos[0].pictureUrl, 400, 'auto', 'mediaLibrary')
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
        <CollectionName>{titles[ind] ? titles[ind] : artwork && artwork.title}</CollectionName>
        <CollectionUser>{names[ind] ? names[ind] : nameOfUser && nameOfUser}</CollectionUser>
        <CollectionPrice>
          {!artwork.priceOnRequest
            ? `${getCurrencyDetail(currency).symbol} ${decimalSeparatorMethod(
              (formattedPrice(artwork.price) * conversionRate).toFixed(0),
              decimalSeparator
            )}`
            : t(`landingPage:artworkSection.priceOnRequest`)}
        </CollectionPrice>
      </ItemsWrapper>
    </>
  )
}

NewcollectionItems.propTypes = {
  artwork: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  names: PropTypes.array,
  titles: PropTypes.array,
  ind: PropTypes.number,
}

export default NewcollectionItems

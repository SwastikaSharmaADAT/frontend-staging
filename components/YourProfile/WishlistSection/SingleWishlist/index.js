import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { currenciesList } from '../../../../utilities/currenciesList'
import { decimalSeparatorMethod, numberWithCommas } from '../../../../utilities/decimalSeparator'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const ArtWorkWrap = styled.div`
  position: relative;
  margin: 0 0 30px;
  width: 100%;
  max-width: 48%;
  display: flex;
  background-size: cover;
  color: #222;
  align-items: center;
  border: 2px solid #eeeeee;
  @media (min-width: 1025px) and (max-width: 1259px) {
    max-width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 48%;
  }
  @media (max-width: 991px) {
    max-width: 48%;
  }
  @media (max-width: 767px) {
    margin: 0 0 20px;
    max-width: 100%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
`

const ArtWorkText = styled.div`
  position: relative;
  padding: 0 20px;
  width: calc(100% - 235px);
  @media (min-width: 768px) and (max-width: 991px) {
    width: calc(100% - 195px);
  }
  @media (max-width: 479px) {
    width: calc(100% - 150px);
    padding: 0 10px;
  }
`
const ArtworkPrice = styled.div`
  font-size: 16px;
  line-height: normal;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ArtworkDesp = styled.div`
  font-size: 16px;
  line-height: normal;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 0 0 5px;
  }
`

const ArtworkName = styled.div`
  font-size: 24px;
  line-height: 29px;
  cursor: pointer;
  margin: 0 0 5px 0;
  padding: 0;
  font-family: 'Montserrat-Regular';
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
`
const SoldDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ff0000;
  min-height: 45px;
  min-width: 45px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  padding: 0;
  font-size: 14px;
  font-family: 'Montserrat-Regular';
  color: #fff;
  text-transform: uppercase;
`
const ArtWorkImg = styled.div`
  width: 195px;
  height: 195px;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 155px;
    height: 155px;
  }
  @media (max-width: 479px) {
    width: 130px;
    height: 130px;
  }
`

function SinglelWishlist({ artwork, currency, conversionRate, decimalSeparator }) {
  const { t } = useTranslation('artworks')
  const router = useRouter()
  const [title,translateTitle] =useTranslateContent('')
  const [material,translateMaterial] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(artwork)){
      translateTitle(artwork.title)
      translateMaterial(artwork.artMaterial)
    }
  }, [artwork.artMaterial])

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
    <ArtWorkWrap key={artwork._id}>
      {artwork && !artwork.inStock && <SoldDiv>{t(`artworks:artworkListing.sold`)}</SoldDiv>}
      <ArtWorkImg>
        <img
          src={
            artwork && artwork.artPhotos && artwork.artPhotos.length > 0
              ? createResizeImageUrl(artwork.artPhotos[0].pictureUrl, 400, 'auto', 'mediaLibrary')
              : '/assets/artworkdemo.png'
          }
          onClick={() => router.push(`/artworks/${artwork.productSlug}`)}
          onError={(e) => {
            imageErrorHandler(
              e,
              createImageUrl(artwork.artPhotos[0].pictureUrl),
              '/assets/artworkdemo.png',
              'mediaLibrary',
              ''
            )
          }}
          alt="ArtworkImg"
        />
      </ArtWorkImg>
      <ArtWorkText>
        <ArtworkName onClick={() => router.push(`/artworks/${artwork.productSlug}`)}>{title ? title : artwork && artwork.title}</ArtworkName>
        <ArtworkDesp>
          {material ? material : artwork && artwork.artMaterial}, {artwork && artwork.year && parseInt(artwork.year)}
        </ArtworkDesp>
        <ArtworkPrice>
          {artwork && artwork.priceOnRequest
            ? 'Price on Request'
            : `${getCurrencyDetail(currency).symbol} ${numberWithCommas(
                formattedPrice(artwork.price) * conversionRate
              )}`}
        </ArtworkPrice>
      </ArtWorkText>
    </ArtWorkWrap>
  )
}
SinglelWishlist.propTypes = {
  artwork: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default SinglelWishlist
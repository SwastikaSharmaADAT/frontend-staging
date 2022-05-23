import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { openInNewTab } from '../../../../../../utilities/newTabUtils'
import { currenciesList } from '../../../../../../utilities/currenciesList'
import { decimalSeparatorMethod, numberWithCommas } from '../../../../../../utilities/decimalSeparator'
import { createImageUrl, imageErrorHandler, createNsfwImageUrl } from '../../../../../../utilities/imageUtils'
import CoverPhoto from '../../../../../../public/assets/artworkdemo.png'
import useTranslateContent from '../../../../../../hooks/useTranslateContent'
import { isLoginToken } from '../../../../../../utilities/authUtils'
import { isEmptyObj } from '../../../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 10px 10px 0;
  padding: 0 0 10px 0;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`

const ListName = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0 5px;
  margin: 15px auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`
const PriceList = styled.div`
  padding: 0 5px;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  color: #222;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ListingContent = ({ artwork, currency, conversionRate, titles, ind }) => {
  const { t } = useTranslation('artworks')
  const router = useRouter()
  const myProfile = useSelector((state) => state.root.myProfile)
  const dob =
    myProfile && myProfile.userData && myProfile.userData.dob && myProfile.userData.dob.value
      ? myProfile.userData.dob.value
      : ''
  let age = 0
  if (dob) age = moment().diff(moment(dob), 'years', false)


  const redirectToDetails = () => {
    openInNewTab(`/artworks/${artwork.productSlug}`)
  }

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
  const [title, translateTitle] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(artwork))
    translateTitle(artwork.title)
  }, [artwork.title])

  return (
    <>
      <ItemsWrapper onClick={redirectToDetails}>
        <CoverImg>
          <img
            src={
              artwork.artPhotos[0] &&
              createNsfwImageUrl(
                {
                  path: artwork.artPhotos[0].pictureUrl,
                  login: isLoginToken(),
                  age,
                  genreList: artwork && artwork.genreId ? artwork.genreId : null,
                },
                400,
                'auto',
                'mediaLibrary',
                false
              )
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(artwork.artPhotos[0].pictureUrl), '/public/assets/artworkdemo.png', 'mediaLibrary', '')
            }}
            alt="Cover"
          />
        </CoverImg>
        <ListName>{titles[ind] ? titles[ind] : artwork&&artwork.title}</ListName>
        <PriceList>
          {artwork && artwork.priceOnRequest
            ? t(`priceOnRequest`)
            : `${getCurrencyDetail(currency).symbol} ${numberWithCommas(
                (formattedPrice(artwork.price) * conversionRate))}`}
        </PriceList>
      </ItemsWrapper>
    </>
  )
}
ListingContent.propTypes = {
  artwork: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default ListingContent

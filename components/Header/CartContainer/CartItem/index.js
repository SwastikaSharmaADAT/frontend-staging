import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import styled from 'styled-components'
import { CgTrash } from 'react-icons/cg'
import PropTypes from 'prop-types'
import { capitalize } from 'lodash'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createNsfwImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { currenciesList } from '../../../../utilities/currenciesList'
import { decimalSeparatorMethod } from '../../../../utilities/decimalSeparator'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isLoginToken } from '../../../../utilities/authUtils'
import { useRouter } from 'next/router'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const NotiWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 !important;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const UserNotiImg = styled.div`
  width: 60px;
  height: 60px;
  margin: 2px 10px 0 0 !important;
  img {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    max-width: inherit !important;
  }
`
const NotiNameWrap = styled.div`
  display: flex;
  max-width: 210px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 0 !important;
`
const TopDiv = styled.div`
  font-size: 14px;
  color: #666;
  margin: 0 0 4px !important;
  line-height: normal;
  text-align: left;
  @media (max-width: 767px) {
    font-size: 11px;
    flex-direction: column;
  }
  b {
    color: #222;
    margin-right: 4px;
  }
`
const CloseNoti = styled.div`
  font-size: 12px;
  color: #000;
  margin: 0 !important;
  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    color: #666;
  }
`
const WarningLabel = styled.div`
  color: red;
  font-size: small;
`

function CartItem({ item, deleteItem, currency, conversionRate, decimalSeparator }) {
  const { t } = useTranslation(['translation', 'header'])

  const myProfile = useSelector((state) => state.root.myProfile)
  const dob =
    myProfile && myProfile.userData && myProfile.userData.dob && myProfile.userData.dob.value
      ? myProfile.userData.dob.value
      : ''
  let age = 0
  if (dob) age = moment().diff(moment(dob), 'years', false)

  const router = useRouter()
  const redirectToArtworkPage = (e) => {
    e.stopPropagation()
    router.push(`/artworks/${item.productSlug}`)
  }
  const [title, translateTitle] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(item))
    translateTitle(item.title)
  }, [item.title])

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
    <div className="list-item" onClick={redirectToArtworkPage}>
      <NotiWrap>
        <NotiNameWrap>
          <UserNotiImg>
            <img
              src={
                item.artPhotos && item.artPhotos.length&&item.artPhotos[0].pictureUrl
                  ? createNsfwImageUrl(
                    {
                      path: item.artPhotos[0].pictureUrl,
                      login: isLoginToken(),
                      age,
                      genreList: item && item.genreId ? item.genreId : null,
                    },
                    150,
                    150,
                    'mediaLibrary',
                    false
                  )
                  :'/assets/artworkdemo.png'
              }
              onError={(e) => {
                imageErrorHandler(
                  e,
                  createImageUrl(item.artPhotos[0].pictureUrl),
                  '/assets/artmo-default.png',
                  'mediaLibrary',
                  ''
                )
              }}
              alt="cartItem"
            />
          </UserNotiImg>
          <TopDiv>
            {title ? capitalize(title) : item && item.title}
            <br />
            {!item.inStock && <WarningLabel>{t(`header:cart.outOfStock`)}</WarningLabel>}
            <b>{`${getCurrencyDetail(currency).symbol}`}</b>{' '}
            {`${decimalSeparatorMethod((formattedPrice(item.price) * conversionRate).toFixed(2), decimalSeparator)}`}
          </TopDiv>
        </NotiNameWrap>
        <CloseNoti>
          <CgTrash size={'20px'} onClick={(e) => deleteItem(item._id, e)} />
        </CloseNoti>
      </NotiWrap>
    </div>
  )
}
CartItem.propTypes = {
  item: PropTypes.object,
  deleteItem: PropTypes.func,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default CartItem

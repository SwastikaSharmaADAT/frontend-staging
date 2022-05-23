import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CgTrash } from 'react-icons/cg'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { capitalize } from 'lodash'
import { useTranslation } from 'next-i18next'
import ProfileImg from '../../../../public/assets/artmo-default.png'
import { createImageUrl, showDefaultImg } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
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

function CartItem({ item, deleteItem }) {
  const { t } = useTranslation(['translation', 'header'])


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
  return (
    <div className="list-item" onClick={redirectToArtworkPage}>
      <NotiWrap>
        <NotiNameWrap>
          <UserNotiImg>
            <img
              src={
                item.artPhotos && item.artPhotos[0].pictureUrl
                  ? createImageUrl(item.artPhotos[0].pictureUrl)
                  : ProfileImg
              }
              onError={(e) => showDefaultImg(e, ProfileImg)}
              alt="cartItem"
            />
          </UserNotiImg>
          <TopDiv>
            {title ? capitalize(title) : item && capitalize(item.title)}
            <br />
            {!item.inStock && <WarningLabel>{t(`header:cart.outOfStock`)}</WarningLabel>} <b> €</b>{' '}
            {item.price.toFixed(2).toString().replace('.', ',')}
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
}
export default CartItem

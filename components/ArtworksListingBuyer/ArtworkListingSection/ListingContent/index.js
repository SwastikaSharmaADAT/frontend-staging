import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import { IoThumbsUpSharp } from 'react-icons/io5'
import { RiEditBoxFill, RiDeleteBin6Line } from 'react-icons/ri'
import { IoPricetagSharp } from 'react-icons/io5'
import { useRouter } from 'next/router'
import moment from 'moment'
import { IconWrap } from '../../styled.js'
import { isLoginToken } from '../../../../utilities/authUtils'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject.js'
import { currenciesList } from '../../../../utilities/currenciesList'
import { decimalSeparatorMethod, numberWithCommas } from '../../../../utilities/decimalSeparator'
import ModalComponent from '../../../UI/Modal'
import QuickEditModal from '../../../VendorSection/ArtworkListingSection/QuickEditModal'
import LikesPopup from '../../../NewsFeed/SinglePost/LikesPopup/index.js'
import ConfirmBox from '../../../UI/ConfirmBox'
import { deleteDetailArtwork } from '../../../../modules/subscription/subscriptionSlice.js'
import { likeAnActivity } from '../../../../modules/newsFeed/newsFeedSlice.js'
import {
  createImageUrl,
  createResizeImageUrl,
  imageErrorHandler,
  createNsfwImageUrl,
} from '../../../../utilities/imageUtils'
import { closeAllModals, setLoginError, setLoginPopup, setSocialUserError } from '../../../../modules/auth/authSlice.js'
import renderPremiumBatch from '../../../../utilities/renderPremiumBatch'
import useTranslateContent from '../../../../hooks/useTranslateContent.js'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 15px 20px 0;
  padding: 0;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
  display: inline-block;
  box-sizing: border-box;
  @media (max-width: 767px) {
    margin: 0 5px 10px 5px;
  }
  @media (max-width: 479px) {
    min-width: 150px;
    margin: 0 5px 10px 5px;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    object-fit: cover;
  }
`
const BottomDescription = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  @media (max-width: 767px) {
    padding: 15px;
  }
`

const ArtworkName = styled.h1`
  font-family: 'Montserrat-Regular';
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  padding: 0;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`
const Location = styled.h1`
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  color: #000;
  font-family: 'Montserrat-Regular';
  & .point{
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ArtworkPrice = styled.h1`
  padding: 0;
  margin: 0 auto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 16px;
  }
`
const ArtworkDescription = styled.h1`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #000;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    display: none;
  }
`
const BorderBottomSec = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  flex-direction: row;
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 10px 5px;
  }
`
const LikeDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const UsersButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: transparent;
  width: auto;
  border: 0;
  padding: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 14px;
  }
  svg {
    margin: 0 5px 0 0;
    font-size: 18px;
    color: #aaa;
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
`
const ConnectionsUl = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ConnectionsLi = styled.div`
  width: 25px;
  height: 25px;
  margin: 0 0 0 2px;
  :first-child {
    width: auto;
    height: auto;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #222;
    padding: 0 5px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    display: none;
    :first-child {
      display: flex;
    }
    :nth-of-type(2) {
      display: flex;
    }
  }
  a {
    cursor: pointer;
  }
  img {
    width: 25px;
    height: 25px;
  }
`

const LeftIcons = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  min-height: 33px;
  min-width: 100px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 0 10px;
  svg {
    color: #000;
    font-size: 18px;
    cursor: pointer;
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

const ListingContent = ({
  artwork,
  currency,
  conversionRate,
  decimalSeparator,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  setRecallApi,
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation', 'artworks', 'dashboard', 'successResponses'])

  const [likesModal, setLikesModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modal, setModal] = useState('')

  const myProfile = useSelector((state) => state.root.myProfile)
  const dob =
    myProfile && myProfile.userData && myProfile.userData.dob && myProfile.userData.dob.value
      ? myProfile.userData.dob.value
      : ''
  let age = 0
  if (dob) age = moment().diff(moment(dob), 'years', false)

  /**get username from local storage */
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const filteredLikes = !isEmptyObj(artwork) && artwork.likes.filter((like) => like.username !== loggedInUsername)
  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  /**like/unlike handler for artwork */
  const likeUnlike = (type) => {
    if (isLoginToken()) {
      dispatch(likeAnActivity(type, artwork._id, 'artworks', loggedInUsername, false, 'allArtworks'))
    } else {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  /**open quick edit modal */
  const quickEditHandler = () => {
    setModal('quickEdit')
    setOpenModal(true)
  }

  const callFiltersApi = () => {
    setCallUseEffect(!callUseEffect)
    setInitialPageLoad(true)
    setRecallApi(true)
  }

  /**open delete confirmation modal */
  const deleteHandler = () => {
    setModal('delete')
    setOpenModal(true)
  }

  /**delete artwork after confirmation */
  const confirmDelete = async () => {
    const resultAction = await dispatch(
      deleteDetailArtwork({ data: { artworkId: artwork._id, type: 'allArtworks' }, t })
    )
    const result = await unwrapResult(resultAction)
    if (result.success) {
      setOpenModal(false)
    }
  }

  const formattedPrice = (price) => {
    if (price.toString().includes(',')) {
      return price.toString().replace(',', '.')
    } else {
      return price
    }
  }

  const [artworkTitle, translateArtworkTitle] = useTranslateContent('')

      const artistName =
      artwork && artwork.userId && `${artwork.userId.firstName} ${artwork.userId.lastName}`

  const [artistTitle, translateArtistTitle] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')
  const [material, translateMaterial] = useTranslateContent('')
  useEffect(() => {
    if (!isEmptyObj(artwork)) {
      translateArtworkTitle(artwork.title)
      translateArtistTitle(artistName)
      translateCountry(artwork.country)
      translateMaterial(artwork.artMaterial)
    }
  }, [
    translateMaterial,
    translateCountry,
    translateArtworkTitle,
    translateArtistTitle,
    artworkTitle,
    artistName,
    artwork.country,
    artwork.material,
  ])
  return (
    <>
      <ModalComponent closeOnOutsideClick={true} isOpen={openModal} closeModal={() => setOpenModal(false)}>
        {modal === 'quickEdit' && (
          <QuickEditModal
            type="allArtworksPage"
            setOpenModal={setOpenModal}
            artworkInModal={artwork}
            callFiltersApi={callFiltersApi}
          />
        )}
        {modal === 'delete' && (
          <ConfirmBox
            open={openModal}
            closeModal={() => setOpenModal(false)}
            deleteHandler={confirmDelete}
            confirmButtonText={t(`dashboard:artworks.delete.confirmButton`)}
            heading={t(`dashboard:artworks.delete.confirmDeleteText`)}
          />
        )}
      </ModalComponent>
      <ModalComponent closeOnOutsideClick={true} isOpen={likesModal} closeModal={() => setLikesModal(false)}>
        <LikesPopup likesData={artwork && artwork.likes} setLikesPopup={setLikesModal} />
      </ModalComponent>
      <ItemsWrapper>
        {artwork &&
          artwork.inStock &&
          isLoginToken() &&
          artwork.userId &&
          artwork.userId.username &&
          artwork.userId.username === loggedInUsername && (
            <LeftIcons>
              <IconWrap title={t(`artworks:quickEditTooltip`)}>
                <IoPricetagSharp onClick={quickEditHandler} />
              </IconWrap>
              <IconWrap title={t(`artworks:editTooltip`)}>
                <RiEditBoxFill onClick={() => router.push(`/artworks/edit/${artwork.productSlug}`)} />
              </IconWrap>
              <IconWrap title={t(`artworks:deleteTooltip`)}>
                <RiDeleteBin6Line onClick={deleteHandler} />
              </IconWrap>
            </LeftIcons>
          )}
        {artwork && !artwork.inStock && <SoldDiv>{t(`artworks:artworkListing.sold`)}</SoldDiv>}
        <CoverImg onClick={() => openInNewTab( `/artworks/${artwork.productSlug}`)}>
          {artwork && artwork.artPhotos && artwork.artPhotos.length > 0 && artwork.artPhotos[0].pictureUrl ? (
            <img
              src={createNsfwImageUrl(
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
              )}
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
          ) : (
            <img src="/assets/artworkdemo.png" alt="cover" />
          )}
        </CoverImg>
        <BottomDescription>
          <ArtworkName onClick={() => openInNewTab( `/artworks/${artwork.productSlug}`)}>
            {artworkTitle ? artworkTitle : artwork && artwork.title}
          </ArtworkName>
          <Location className="yeahh">
            <span className="point" onClick={() => {
                router.push(`/user/${artwork.userId.username}`)
              }}>{artistTitle ? artistTitle : artistName}</span>
            {renderPremiumBatch(artwork.sellerSubscriptionType)}
            {artwork &&
            ((artwork.isAdmin && artwork.userId && artwork.userId.username) ||
              (!artwork.isAdmin && artwork.nameOfArtist && artwork.nameOfArtist.firstName)) &&
            artwork.country
              ? ` • `
              : null}
            {(artwork && (artwork.userId && artwork.userId.userSubscriptionId && artwork.userId.userSubscriptionId.subscription.role === 'member') && artwork.nameOfArtist && artwork.nameOfArtist.firstName) ? ` Artist: ${artwork.nameOfArtist.firstName} ${artwork.nameOfArtist.lastName} • ` : null}
            {country ? country : artwork && artwork.country}
          </Location>
          <ArtworkDescription>
            {artwork && parseInt(artwork.year)} {artwork && artwork.year && artwork.artMaterial ? ` • ` : null}{' '}
            {material ? material : artwork && artwork.artMaterial}
            <br />
            {artwork &&
              artwork.type === 'edition' &&
              artwork.editionDetail &&
              artwork.editionDetail.version &&
              artwork.editionDetail.count !== 0 && (
                <>
                  Edition{' '}
                  {artwork && artwork.editionDetail && artwork.editionDetail.version && artwork.editionDetail.version}/
                  {artwork && artwork.editionDetail && artwork.editionDetail.count !== 0 && artwork.editionDetail.count}
                </>
              )}{' '}
            {artwork &&
            artwork.type === 'edition' &&
            artwork.editionDetail &&
            artwork.editionDetail.version &&
            artwork.editionDetail.count !== 0 &&
            artwork.artDimensions &&
            artwork.artDimensions.length > -1
              ? ` • `
              : null}
            { artwork.artDimensions && artwork.artDimensions.length && artwork.artDimensions.height ? 
              artwork && artwork.artDimensions && artwork.sizeType === '3D'
              ? `${artwork.artDimensions.length} x ${artwork.artDimensions.height} x ${artwork.artDimensions.width} cm`
              : artwork && artwork.artDimensions && artwork.sizeType === '2D'
              ? `${artwork.artDimensions.length} x ${artwork.artDimensions.height} cm`
              : null : ''}
            {artwork.partOfSeries && ' • '}
            {artwork.seriesDetails}
          </ArtworkDescription>
          <ArtworkPrice>
            {artwork && artwork.priceOnRequest
              ? t(`artworks:priceOnRequest`)
              : `${getCurrencyDetail(currency).symbol} ${numberWithCommas(
                  formattedPrice(artwork.price) * conversionRate
                )}`}
            {/* `${getCurrencyDetail(currency).symbol} ${decimalSeparatorMethod(
                 (formattedPrice(artwork.price) * conversionRate).toFixed(2),
                  decimalSeparator
                )}` */}
          </ArtworkPrice>
        </BottomDescription>
        <BorderBottomSec>
          <LikeDiv>
            <UsersButton onClick={() => likeUnlike(filteredLikes.length < artwork.likes.length ? 'unlike' : 'like')}>
              {filteredLikes.length < artwork.likes.length ? (
                <>
                  <IoThumbsUpSharp color="#222" /> {t(`artworks:liked`)}{' '}
                </>
              ) : (
                <>
                  <IoThumbsUpSharp /> {t(`artworks:like`)}{' '}
                </>
              )}
            </UsersButton>
          </LikeDiv>
          {artwork.likes && artwork.likes.length > 0 && (
            <ConnectionsUl>
              <ConnectionsLi>
                {artwork.likes.length > 5 && <a onClick={() => setLikesModal(true)}>+{artwork.likes.length - 5}</a>}
              </ConnectionsLi>
              {artwork.likes.slice(0, 5).map((user) => (
                <ConnectionsLi onClick={() => setLikesModal(true)} key={user._id}>
                  <a>
                    <img
                      src={
                        user.profilePicUrl
                          ? createResizeImageUrl(user.profilePicUrl, 50, 50, 'profileCover') +
                            '?' +
                            new Date(user.dateUpdated).getTime()
                          : '/assets/artmo-default.png'
                      }
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(user.dateUpdated).getTime()
                        imageErrorHandler(
                          e,
                          createImageUrl(user.profilePicUrl),
                          '/assets/artmo-default.png',
                          'profileCover',
                          timeSuffix
                        )
                      }}
                      alt=""
                    />
                  </a>
                </ConnectionsLi>
              ))}
            </ConnectionsUl>
          )}
        </BorderBottomSec>
      </ItemsWrapper>
    </>
  )
}

ListingContent.propTypes = {
  artwork: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  callUseEffect: PropTypes.bool,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  setRecallApi: PropTypes.func,
}

export default ListingContent

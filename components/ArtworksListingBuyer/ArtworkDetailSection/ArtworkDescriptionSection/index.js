import React, { useEffect, useState } from 'react'
import { IoThumbsUpSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { TiTick } from 'react-icons/ti'
import { AiOutlinePlus } from 'react-icons/ai'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { followUnfollowUser } from '../../../../modules/landingPage/landingPageSlice'
import {
  DescriptionSection,
  MuseumLabel,
  ArtworkName,
  Location,
  ArtworkDescription,
  BorderBottomSec,
  LikeDiv,
  UsersButton,
  ConnectionsUl,
  ConnectionsLi,
  ArtworkPrice,
  TagsWrap,
  LabeLTags,
  TagsInputWrap,
  TagsDiv,
  SoldDiv,
  DigitalSpan,
  TopDiv,
  DescriptionToggleIcon,
  FollowButton,
  UnFollowButton,
  ArtworkWishlist
} from '../../styled.js'
import { IoIosCart } from 'react-icons/io'
import { FaEnvelope }  from 'react-icons/fa'
import Select from '../../../UI/Select'
import Button from '../../../UI/Button'
import ButtonLight from '../../../UI/ButtonLight'
import { currenciesList } from '../../../../utilities/currenciesList'
import { decimalSeparatorMethod, numberWithCommas } from '../../../../utilities/decimalSeparator'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject.js'
import { likeAnActivity } from '../../../../modules/newsFeed/newsFeedSlice.js'
import { isLoginToken } from '../../../../utilities/authUtils.js'
import { closeAllModals, setLoginError, setLoginPopup, setSocialUserError } from '../../../../modules/auth/authSlice.js'
import { addCartLocal, addToCart } from '../../../../modules/cart/cartSlice.js'
import { notifyError } from '../../../../modules/profile/myProfileSlice.js'
import renderPremiumBatch from '../../../../utilities/renderPremiumBatch'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent.js'
import { connectSocket } from '../../../../modules/socket/socketSlice.js'
import { renderOwnerName } from '../../../../utilities/artworkSort.js'
import { capitalizeFirstChar } from '../../../../utilities/capitalizeFirstChar'
import { setAllArtists } from '../../../../modules/subscription/subscriptionSlice.js'
import { populateChatBox, setMessageState } from '../../../../modules/messages/messagesSlice.js'
import { getArray, getString } from '../../../../utilities/getTranslatedContent.js'
import { divide } from 'lodash'
import { addToWishlist } from '../../../../modules/wishlist/wishlistSlice' 

const ArtworkDescriptionSection = ({
  setShareModal,
  setLikesModal,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  setMedium,
  setGenre,
  setSubjects,
  setCountry,
  setTimePeriod,
  setSeriesDetails,
  currency,
  handleCurrencyChange,
  conversionRate,
  decimalSeparator,
  insertToTitle,
}) => {
  const { t } = useTranslation(['artworks', 'errorResponses', 'usersListing'])

  const dispatch = useDispatch()
  const router = useRouter()
  const [showFullDesc, setShowFullDesc] = useState(false)

  /**fetch artwork details from store */
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const cart = useSelector((state) => state.root.cart.cart)
  const socketObj = useSelector((state) => state.root.socket.socketObj)
  useEffect(() => {
    if (isLoginToken() && !socketObj) {
      dispatch(connectSocket())
    }
  }, [dispatch, socketObj])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const accountType = userInfo && JSON.parse(userInfo).accountType

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const filteredLikes =
    !isEmptyObj(artworkDetail) && artworkDetail.likes.filter((like) => like.username !== loggedInUsername)

  /**like/unlike handler for artwork */
  const likeUnlike = (type) => {
    if (isLoginToken()) {
      dispatch(likeAnActivity(type, artworkDetail._id, 'artworks', loggedInUsername, false, 'artworkDetailPage'))
    } else {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }
  const filterRedirect = (type, value) => {
    if (type === 'medium') {
      setMedium([value])
    } else if (type === 'genre') {
      setGenre([value])
    } else if (type === 'subject') {
      setSubjects([value])
    } else if (type === 'country') {
      setCountry([value])
    } else if (type === 'timePeriod') {
      setTimePeriod([value])
    } else if (type === 'series') {
      setSeriesDetails([value])
    }
    setCallUseEffect(!callUseEffect)
    setInitialPageLoad(true)
  }

  const followUnfollow = (toFollow, action) => {
    dispatch(followUnfollowUser(toFollow, action, t))
  }

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const Divider = () => {
    return(
      <span class="divider"> • </span>
    )
  }

  const formattedPrice = (price) => {
    if (price.toString().includes(',')) {
      return price.toString().replace(',', '.')
    } else {
      return price
    }
  }
  const addToCartHandler = () => {
    if (!isLoginToken()) {
      dispatch(addCartLocal({ artworkDetail, t: t }))
    } else {
      if (cart && cart.find((item) => item === artworkDetail._id)) notifyError(t(`errorResponses:cart.alreadyInCart`))
      dispatch(addToCart({ data: [artworkDetail], t }))
    }
  }

  const checkDisable = () => {
    if (!isLoginToken()) {
      const cartArr = localStorage.getItem('userCart') && JSON.parse(localStorage.getItem('userCart'))
      if (!cartArr) return
      if (cartArr && cartArr.find((item) => item === artworkDetail._id)) return true
      else return false
    } else {
      if (cart && cart.find((item) => item._id === artworkDetail._id)) return true
      else return false
    }
  }
  const messageSellerHandler = async () => {
    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: artworkDetail.userId }))
  }
  const name = artworkDetail.userId && artworkDetail.userId.firstName && artworkDetail.userId.lastName
    ? `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`
    : artworkDetail.userId && artworkDetail.userId.username
    ? artworkDetail.userId.username
    : ''
  const [title, translateTitle] = useTranslateContent('')
  const [artistName, translateArtistName] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')
  const [material, translateMaterial] = useTranslateContent('')
  const [description, translateDescription] = useTranslateContent('')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  useEffect(() => {
    if (!isEmptyObj(artworkDetail)) {
      translateTitle(artworkDetail.title)
      translateArtistName(name)
      translateCountry(artworkDetail.country)
      translateMaterial(artworkDetail.artMaterial)
      translateDescription(artworkDetail.description)
    }
  }, [
    translateTitle,
    translateArtistName,
    translateCountry,
    translateMaterial,
    translateDescription,
    artworkDetail.artMaterial,
    artworkDetail.description,
    artworkDetail.title,
    artworkDetail.country,
    name,
  ])
  const redirectHandler = () => {
    const params = router.query
    const artistId = artworkDetail && artworkDetail.userId && artworkDetail.userId._id
    const artistName =
      artworkDetail && artworkDetail.userId && `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`

    const artistUserObj = {
      firstName: artworkDetail && artworkDetail.userId && artworkDetail.userId.firstName,
      fullName: artistName,
      lastName: artworkDetail && artworkDetail.userId && artworkDetail.userId.lastName,
      username: artworkDetail && artworkDetail.userId && artworkDetail.userId.username,
      _id: artistId,
    }
    dispatch(setAllArtists([artistUserObj]))
    const artistIdArr = [artistId]
    params.artist = JSON.stringify(artistIdArr)
    router.push({ pathname: '/artworks', query: params })
  }
  const openLoginPopHandler = () => {
    if (!isLoginToken()) {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }
  const checkFollower = () => {
    const result = artworkDetail && artworkDetail.userId && artworkDetail.userId.followers && artworkDetail.userId.followers.find((o) => o.username === loggedInUsername)
    if (result === undefined) {
      return false
    } else {
      return true
    }
  }
  const [seriesList, translateSeries] = useTranslateContent('')
  const [categoriesList, translateCategories] = useTranslateContent('')
  const [mediumList, translateMedium] = useTranslateContent('')
  const [genreList, translateGenre] = useTranslateContent('')
  const [subjectList, translateSibject] = useTranslateContent('')
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  let seriesString = '',
    categoriesString = '',
    mediumString = '',
    genreString = '',
    subjectString = ''
  if (!isEmptyObj(artworkDetail)) {
    seriesString = artworkDetail.seriesDetails
    categoriesString = [
      renderOwnerName(artworkDetail.userId),
      artworkDetail.timePeriod,
      artworkDetail.country,
    ].toString()
    mediumString = artworkDetail.artMediumId.map((med) => med.title).toString()
    genreString = artworkDetail.genreId.map((med) => med.title).toString()
    subjectString = artworkDetail.subjects.toString()
  }
  useEffect(() => {
    if (seriesString) translateSeries(seriesString)
    if (categoriesString) translateCategories(categoriesString)
    if (mediumString) translateMedium(mediumString)
    if (genreString) translateGenre(genreString)
    if (subjectString) translateSibject(subjectString)
  }, [
    seriesString,
    translateSeries,
    categoriesString,
    translateCategories,
    mediumString,
    translateMedium,
    genreString,
    translateGenre,
    subjectString,
    translateSibject,
  ])

  const [ artworkWishlisted, setArtworkWishlisted ] = useState( artworkDetail.userId.isWishlisted )
  const [ sameUserArtwork, setSameUserArtwork ] = useState( false )
  useEffect(()=>{
    setArtworkWishlisted( artworkDetail.userId.isWishlisted )
    setSameUserArtwork(artworkDetail && artworkDetail.userId && artworkDetail.userId.username === loggedInUsername)
   }, [ artworkDetail ])
  const addRemoveArtworkFromWishlist = (toAddRemove, action) => {
    if ( action === 'removeFromWishlist' ) {
      setArtworkWishlisted( false ) 
    } else {
      setArtworkWishlisted( true )
    }
    dispatch(addToWishlist(toAddRemove, action , t))
  }
  const setWishlistButton = artworkWishlisted ? <ArtworkWishlist className="btnFollowUnfollow" onClick={() => addRemoveArtworkFromWishlist(artworkDetail._id , 'removeFromWishlist')}>{t(`wishlistSection.removeFromWishlist`)} </ArtworkWishlist> : <ArtworkWishlist className="btnFollowUnfollow" onClick={() => addRemoveArtworkFromWishlist(artworkDetail._id , 'addToWishlist')}>{t(`wishlistSection.addToWishlist`)}</ArtworkWishlist>
  return (
    <>
      {!isEmptyObj(artworkDetail) && (
        <DescriptionSection className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <MuseumLabel>
          <TopDiv>
            <ArtworkName>{title ? title : artworkDetail && artworkDetail.title} {artworkDetail.artworkType === 'digital' && <DigitalSpan>{t(`artworkListing.digital`)}</DigitalSpan>}</ArtworkName>
            {!artworkDetail.inStock && <SoldDiv>{t(`artworkListing.sold`)}</SoldDiv>}
          </TopDiv>
          <Location className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <img
              src={
                artworkDetail && artworkDetail.userId && artworkDetail.userId.profilePicUrl
                  ? createResizeImageUrl(artworkDetail.userId.profilePicUrl, 150, 150, 'profileCover')
                  : '/public/assets/artmo-default.png'
              }
              onError={(e) => {
                imageErrorHandler(e, createImageUrl(artworkDetail.userId.profilePicUrl), '/assets/artmo-default.png', 'profileCover', '')
              }}

              alt=""
            />
            <span
              onClick={() => {
                router.push(`/user/${artworkDetail.userId.username}`)
              }}
            >
              {artistName ? artistName : name}
            </span>
            {renderPremiumBatch(artworkDetail.subscription)}
            {artworkDetail &&
            ((artworkDetail.userId && artworkDetail.userId.username) &&
            artworkDetail.country)
              ? ' • '
              : null}
            {(artworkDetail && (artworkDetail.userId.userSubscriptionId.subscription.role === 'member') && artworkDetail.nameOfArtist && artworkDetail.nameOfArtist.firstName) ? ` Artist: ${artworkDetail.nameOfArtist.firstName} ${artworkDetail.nameOfArtist.lastName} • ` : null}
            <span 
              onClick={() => filterRedirect('country', artworkDetail.country)}>
                {country ? country : artworkDetail && artworkDetail.country}
            </span>
            {/* {!isLoginToken() ? (
              <FollowButton onClick={openLoginPopHandler}>
                <AiOutlinePlus /> {t(`artworks:follow`)}
              </FollowButton>
            ) : (
              <>
                {loggedInUsername === artworkDetail.userId.username || loggedInAccountType === 'page' ? (
                  <></>
                ) : checkFollower() ? (
                  <FollowButton onClick={() => followUnfollow(artworkDetail.userId._id, 'unfollow')}>
                    {t(`artworks:following`)}
                  </FollowButton>
                ) : (
                  <FollowButton onClick={() => followUnfollow(artworkDetail.userId._id, 'follow')}>
                    <AiOutlinePlus /> {t(`artworks:follow`)}
                  </FollowButton>
                )}
              </>
            )} */}
          </Location>
          <ArtworkDescription className={appLanguageCode === 'ar' ? 'rtl-ar-content fullWidth' : 'fullWidth'}>
            {artworkDetail && parseInt(artworkDetail.year)}
            {artworkDetail && artworkDetail.year && artworkDetail.artMaterial ? ` • ` : null}
            {material ? material : artworkDetail && artworkDetail.artMaterial}
            <br />
            {artworkDetail.type === 'edition' &&
              artworkDetail.editionDetail &&
              artworkDetail.editionDetail.version &&
              artworkDetail.editionDetail.count !== 0 && (
                <>
                  {t(`edition`)}{' '}
                  {artworkDetail.editionDetail &&
                    artworkDetail.editionDetail.version &&
                    artworkDetail.editionDetail.version}
                  /
                  {artworkDetail.editionDetail &&
                    artworkDetail.editionDetail.count !== 0 &&
                    artworkDetail.editionDetail.count}
                </>
              )}{' '}
            {artworkDetail.type === 'edition' &&
              artworkDetail.editionDetail &&
              artworkDetail.editionDetail.version &&
              artworkDetail.editionDetail.count !== 0 &&
              artworkDetail.artDimensions &&
              ' • '}
            {
            artworkDetail.artworkType === 'digital' ? 
            `${artworkDetail.imageDetails.imageWidth} px x ${artworkDetail.imageDetails.imageHeight} px •  ${artworkDetail.imageDetails.size} MB`
              :
            artworkDetail.artDimensions && artworkDetail.sizeType === '2D'
              ? artworkDetail.artDimensions.length !== null &&
                artworkDetail.artDimensions.height !== null &&
                `${artworkDetail.artDimensions.height} cm x ${artworkDetail.artDimensions.length} cm`
              : artworkDetail.artDimensions.length !== null &&
                artworkDetail.artDimensions.height !== null &&
                artworkDetail.artDimensions.width !== null &&
                `${artworkDetail.artDimensions.height} cm x ${artworkDetail.artDimensions.length} cm x ${artworkDetail.artDimensions.width} cm`}
            {artworkDetail.partOfSeries && ' • '}
            {artworkDetail.seriesDetails}
            {artworkDetail.isFramed &&
              ` • ${t(`framed`)}: ${artworkDetail.frameDimensions.length} cm x ${
                artworkDetail.frameDimensions.width
              } cm`}
            <br />
            {artworkDetail.isFramed &&
              artworkDetail.frameMaterial &&
              `${t(`frameDescription`)}: ${artworkDetail.frameMaterial} `}
          </ArtworkDescription>
          <ArtworkDescription className={appLanguageCode === 'ar' ? 'rtl-ar-content fullWidth' : 'fullWidth'}>
            {artworkDetail && artworkDetail.description && artworkDetail.description.length < 201
              ? description
                ? description
                : artworkDetail.description
              : artworkDetail && artworkDetail.description && artworkDetail.description.length > 200 && !showFullDesc
              ? description
                ? description.slice(0, 201)
                : artworkDetail.description.slice(0, 201)
              : artworkDetail && artworkDetail.description && artworkDetail.description.length > 200 && showFullDesc
              ? description
                ? description
                : artworkDetail.description
              : null}
          </ArtworkDescription>
          <DescriptionToggleIcon>
            {artworkDetail && artworkDetail.description && artworkDetail.description.length > 200 && !showFullDesc && (
              <RiArrowDownSLine onClick={() => setShowFullDesc(true)} />
            )}
            {artworkDetail && artworkDetail.description && artworkDetail.description.length > 200 && showFullDesc && (
              <RiArrowUpSLine onClick={() => setShowFullDesc(false)} />
            )}
          </DescriptionToggleIcon>
          {artworkDetail.isDrafted && artworkDetail.price === 0 ? (
            <></>
          ) : (
            <BorderBottomSec className="FlexStartDivFirst">
              {!artworkDetail.priceOnRequest && (
                <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
                  {currenciesList.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.value}
                    </option>
                  ))}
                </Select>
              )}
              <ArtworkPrice showMargin={artworkDetail.priceOnRequest}>
                {artworkDetail && artworkDetail.priceOnRequest ? (
                  <>
                    {t(`priceOnRequest`)} <BsFillQuestionCircleFill />
                  </>
                ) : (
                  `${getCurrencyDetail(currency).symbol} ${numberWithCommas(
                    formattedPrice(artworkDetail.price) * conversionRate
                  )}`
                )}
              </ArtworkPrice>
              { 
                isLoginToken() ? !sameUserArtwork && setWishlistButton :
                (<ArtworkWishlist className="btnFollowUnfollow" onClick={openLoginPopHandler}>{t(`wishlistSection.addToWishlist`)}</ArtworkWishlist>)
              }
            </BorderBottomSec>
          )}
          {artworkDetail.userId.username !== loggedInUsername ? (
            <BorderBottomSec className="FlexStartDiv">
              {(!isLoginToken() || (isLoginToken() && accountType === 'personal')) && (
                <>
                  {checkDisable() ? (
                    <>
                      <Button className="added-button" disabled={true}>
                        {t(`added`)}
                        <TiTick />{' '}
                      </Button>
                    </>
                  ) : (
                    <>
                      {!artworkDetail.priceOnRequest && artworkDetail.inStock && (
                        <Button onClick={addToCartHandler}><IoIosCart/> {t(`addToCart`)}</Button>
                      )}
                    </>
                  )}
                </>
              )}
              {artworkDetail.canSendMessage && (
                <ButtonLight onClick={messageSellerHandler} label={t(`messageSeller`)} />
              )}
              {!isLoginToken() && <ButtonLight onClick={openLoginPopHandler} label={t(`messageSeller`)} />}
              {!artworkDetail.isDrafted && <ButtonLight label={t(`share`)} onClick={() => setShareModal(true)} />}
            </BorderBottomSec>
          ) : (
            <BorderBottomSec>
              {!artworkDetail.isDrafted && <ButtonLight label={t(`share`)} onClick={() => setShareModal(true)} />}
            </BorderBottomSec>
          )}
          </MuseumLabel>
          <BorderBottomSec>
            <LikeDiv>
              <UsersButton
                onClick={() => likeUnlike(filteredLikes.length < artworkDetail.likes.length ? 'unlike' : 'like')}
              >
                {filteredLikes.length < artworkDetail.likes.length ? (
                  <>
                    <IoThumbsUpSharp color="#222" /> {t(`liked`)}{' '}
                  </>
                ) : (
                  <>
                    <IoThumbsUpSharp /> {t(`like`)}{' '}
                  </>
                )}
              </UsersButton>
            </LikeDiv>
            {artworkDetail && artworkDetail.likes.length > 0 && (
              <ConnectionsUl>
                <ConnectionsLi>
                  {artworkDetail.likes.length > 5 && (
                    <a onClick={() => setLikesModal(true)}>+{artworkDetail.likes.length - 5}</a>
                  )}
                </ConnectionsLi>
                {artworkDetail.likes.slice(0, 5).map((user) => (
                  <ConnectionsLi onClick={() => setLikesModal(true)} key={user._id}>
                    <a>
                      <img
                        src={
                          user.profilePicUrl
                            ? createResizeImageUrl(user.profilePicUrl, 50, 50, 'profileCover')
                            : '/assets/artmo-default.png'
                        }
                        onError={(e) => {
                          imageErrorHandler(
                            e,
                            createImageUrl(user.profilePicUrl),
                            '/assets/artmo-default.png',
                            'profileCover',
                            ''
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
          {artworkDetail.seriesDetails && (
            <>
              <TagsWrap>
                <LabeLTags>{t(`series`)}</LabeLTags>
                <TagsDiv onClick={() => filterRedirect('series', artworkDetail.seriesDetails)}>
                  {seriesList ? seriesList : artworkDetail.seriesDetails}
                </TagsDiv>
              </TagsWrap>
            </>
          )}
          {artworkDetail && artworkDetail.timePeriod && (
            <TagsWrap>
              <LabeLTags>Time Period</LabeLTags>
              <TagsDiv onClick={() => filterRedirect('timePeriod', artworkDetail && artworkDetail.timePeriod)}>
                {categoriesList && categoriesList.split(',')[1]
                  ? capitalizeFirstChar (categoriesList && categoriesList.split(',')[1])
                  : capitalizeFirstChar(artworkDetail && artworkDetail.timePeriod)}
              </TagsDiv>
            </TagsWrap>
            )}
          {artworkDetail.artMediumId && artworkDetail.artMediumId.length > 0 && (
            <TagsWrap>
              <LabeLTags>{t(`medium`)}</LabeLTags>
              <TagsInputWrap>
                {artworkDetail.artMediumId.map((medium, ind) => (
                  <TagsDiv
                    onClick={() => {
                      insertToTitle({ label: medium.title, value: medium._id }, 'mediumFromDescription')
                      filterRedirect('medium', medium._id)
                    }}
                    key={medium._id}
                  >
                    {/* {getArray(mediumList)[ind] ? getArray(mediumList)[ind] : medium.title} */}
                    {medium.title}
                  </TagsDiv>
                ))}
              </TagsInputWrap>
            </TagsWrap>
          )}
          {artworkDetail.genreId && artworkDetail.genreId.length > 0 && (
            <TagsWrap>
              <LabeLTags>{t(`genre`)}</LabeLTags>
              <TagsInputWrap>
                {artworkDetail.genreId.map((genre, ind) => (
                  <TagsDiv
                    key={genre._id}
                    onClick={() => {
                      insertToTitle({ label: genre.title, value: genre._id }, 'genreFromDescription')
                      filterRedirect('genre', genre._id)
                    }}
                  >
                    {/* {getArray(genreList)[ind] ? getArray(genreList)[ind] : genre.title} */}
                    {genre.title}
                  </TagsDiv>
                ))}
              </TagsInputWrap>
            </TagsWrap>
          )}
          {artworkDetail.subjects && artworkDetail.subjects.length > 0 && (
            <TagsWrap>
              <LabeLTags>{t(`subject`)}</LabeLTags>

              <TagsInputWrap>
                {artworkDetail.subjects.map((subject, ind) => (
                  <TagsDiv
                    key={ind}
                    onClick={() => {
                      filterRedirect('subject', subject)
                    }}
                  >
                    {subjectList && subjectList.split(',')[ind] ? subjectList && subjectList.split(',')[ind] : subject}
                  </TagsDiv>
                ))}
              </TagsInputWrap>
            </TagsWrap>
          )}
        </DescriptionSection>
      )}
    </>
  )
}

ArtworkDescriptionSection.propTypes = {
  setShareModal: PropTypes.func,
  setLikesModal: PropTypes.func,
  callUseEffect: PropTypes.bool,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  setMedium: PropTypes.func,
  setGenre: PropTypes.func,
  setSubjects: PropTypes.func,
  setRedirectFromDetails: PropTypes.func,
  currency: PropTypes.string,
  handleCurrencyChange: PropTypes.func,
  insertToTitle: PropTypes.func,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  setCountry: PropTypes.func,
  setTimePeriod: PropTypes.func,
  setSeriesDetails: PropTypes.func,
}
export default ArtworkDescriptionSection
// const [seriesList, translateSeries] = useTranslateContent('')
//   const [categoriesList, translateCategories] = useTranslateContent('')
//   const [mediumList, translateMedium] = useTranslateContent('')
//   const [genreList, translateGenre] = useTranslateContent('')
//   const [subjectList,

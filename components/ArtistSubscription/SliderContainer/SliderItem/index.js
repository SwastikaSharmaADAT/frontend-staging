import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { HiOutlineThumbUp, HiThumbUp } from 'react-icons/hi'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import renderPremiumBatch from '../../../../utilities/renderPremiumBatch'
import { isLoginToken } from '../../../../utilities/authUtils'
import { closeAllModals, setLoginError, setLoginPopup, setSocialUserError } from '../../../../modules/auth/authSlice'
import { likeAnActivity } from '../../../../modules/newsFeed/newsFeedSlice'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  border: 0;
  text-align: center;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  @media (max-width: 464px) {
    max-width: 222px;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0px;
  height: 245px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  width: 100%;
  padding: 0;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    max-height: 245px;
    object-fit: cover;
  }
  @media (max-width: 464px) {
    height: 160px;
  }
`

const CollectionPara = styled.div`
  padding: 10px 10px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #222;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const LeftContent = styled.div`
  padding: 0px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  text-align: left;
  color: #222;
  max-width: calc(100% - 30px);
  span {
    cursor: pointer;
  }
  strong {
    font-family: 'Montserrat-Medium';
  }
  img {
    margin: 0 0 0 5px;
  }
`
const RightThumb = styled.div`
  width: 30px;
  text-align: center;
  svg {
    color: #000;
    font-size: 22px;
    cursor: pointer;
  }
`

const SliderItem = ({ artwork }) => {
  const { t } = useTranslation('subscriptions')
  const dispatch = useDispatch()

  const [userInfo,setUserInfo]=useState(null)

  // const filteredLikes = !isEmptyObj(artwork) && artwork.likes.filter((like) => like.username !== loggedInUsername)

  /**get username from local storage */
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const filteredLikes = loggedInUsername&&!isEmptyObj(artwork) && artwork&&artwork.likes&&artwork.likes.filter((like) => like.username !== loggedInUsername)
  /**like/unlike handler for artwork */
  const likeUnlike = (type) => {
    if (isLoginToken()) {
      dispatch(likeAnActivity(type, artwork._id, 'artworks', loggedInUsername, false, 'subscriptionCarousel'))
    } else {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }

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
                : '/assets/artworkdemo.png'
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(artwork.artPhotos[0].pictureUrl), '/assets/artworkdemo.png', 'mediaLibrary', '')
            }}
            alt="Artwork Cover Img"
          />
        </CoverImg>
        <CollectionPara>
          <LeftContent>
            <span>{title?title:artwork && artwork.title}</span>
            <br />
            {t(`artworkListing.byText`)} <strong>{name?name:nameOfUser}</strong>{' '}
            {artwork &&
              !isEmptyObj(artwork.userSubscription) &&
              !isEmptyObj(artwork.userSubscription.subscription) &&
              renderPremiumBatch(artwork.userSubscription.subscription, '/assets/Mo_Icon.png')}
          </LeftContent>
          {/* <RightThumb onClick={() => likeUnlike(filteredLikes.length < artwork.likes.length ? 'unlike' : 'like')}>
            {filteredLikes.length < artwork.likes.length ? <HiThumbUp /> : <HiOutlineThumbUp />}
          </RightThumb> */}
        </CollectionPara>
      </ItemsWrapper>
    </>
  )
}

SliderItem.propTypes = {
  artwork: PropTypes.object,
}

export default SliderItem

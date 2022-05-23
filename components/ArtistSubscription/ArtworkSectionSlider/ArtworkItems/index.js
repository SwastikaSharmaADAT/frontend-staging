import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { capitalize } from '@material-ui/core'
import ProfileCoverImage from '../../../../public/assets/artmo_profile_default_cover.jpg'
import ProfileImg from '../../../../public/assets/artmo-default.png'
import { isLoginToken } from '../../../../utilities/authUtils'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../../modules/auth/authSlice'
import { followUnfollowUser } from '../../../../modules/landingPage/landingPageSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 2px solid #eeeeee;
  text-align: center;
  min-height: 100%;
  min-width: 205px;
  @media (min-width: 1025px) and (max-width: 1299px) {
    min-width: inherit;
    width: 90%;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    min-width: 230px;
    width: 80%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    min-width: 230px;
    width: 90%;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    min-width: 250px;
    width: 90%;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    min-width: 200px;
    width: 90%;
  }
  @media (max-width: 650px) and (orientation: landscape) {
    min-width: 190px;
    width: 90%;
  }
  @media (max-width: 464px) {
    max-width: 150px;
    margin: 0 auto;
    min-width: inherit;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  max-height: 92px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  img {
    width: 100%;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`
const MemberImg = styled.div`
  position: relative;
  margin: -50px auto 10px;
  border: 2px solid #eeeeee;
  width: 80px;
  height: 80px;
  cursor: pointer;
  background: #fff;
  img {
    height: 100%;
  }
`
const Username = styled.h1`
  font-family: 'Montserrat-Medium';
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #000;
  cursor: pointer;
`
const Followers = styled.h1`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #222;
  font-family: 'Montserrat-Regular';
`
const FollowButton = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 11px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  :hover,
  :focus {
    background: #222;
    outline: none;
  }
  svg {
    margin-right: 4px;
  }
`
const UnFollowButton = styled.button`
  background: #666;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 11px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  :hover,
  :focus {
    background: #666;
    outline: none;
  }
  svg {
    margin-right: 4px;
  }
`
const CategoryList = styled.h2`
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 15px;
  text-align: center;
  color: #222;
  text-transform: capitalize;
`
const Userlocation = styled.h2`
  text-transform: capitalize;
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 15px;
  text-align: center;
  color: #222;
`
const CityCountryWrapper = styled.div`
  width: 100%;
  h2 {
      display: inline-block;
      padding-right: 2px;
      text-transform: capitalize;
  }
  span {
    font-size: 24px;
    vertical-align: middle;
  }
`

const ArtworkItems = ({ user }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['translation', 'landingPage'])

  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType

  const openLoginPopup = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  const followUnfollow = (toFollow, action) => {
    dispatch(followUnfollowUser(toFollow, action))
  }

  const checkFollower = () => {
    const result = user.followers.find((o) => o.username === loggedInUsername)
    if (result === undefined) {
      return false
    } else {
      return true
    }
  }
  const nameOfUser =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user && user.firstName
      ? user.firstName
      : user.username
  const [name, translateName] = useState(nameOfUser)
  const [city, translateCity] =useTranslateContent('')
  const [country, translateCountry] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(user)){
      translateName(nameOfUser)
      translateCity(user.city.value)
      translateCountry(user.country.value)
    }
  }, [nameOfUser, user])
  return (
    <>
      <ItemsWrapper>
      <CoverImg>
          <img
            src={
              user && user.coverPicUrl
                ? createResizeImageUrl(user.coverPicUrl, 300, 150, 'profileCover') +
                  '?' +
                  new Date(user.dateUpdated).getTime()
                : ProfileCoverImage
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(user.dateUpdated).getTime()
              imageErrorHandler(e, createImageUrl(user.coverPicUrl), ProfileCoverImage, 'profileCover', timeSuffix)
            }}
            alt="Cover"
          />
        </CoverImg>
        <MemberImg onClick={() => openInNewTab(`/user/${user.username}`)}>
          <img
              src={
                user && user.profilePicUrl
                  ? createResizeImageUrl(user.profilePicUrl, 150, 150, 'profileCover') +
                    '?' +
                    new Date(user.dateUpdated).getTime()
                  : ProfileImg
              }
              onError={(e) => {
                const timeSuffix = '?' + new Date(user.dateUpdated).getTime()
                imageErrorHandler(e, createImageUrl(user.profilePicUrl), ProfileImg, 'profileCover', timeSuffix)
              }}
              alt="Profile"
            />
        </MemberImg>
        <Username onClick={() => openInNewTab(`/user/${user.username}`)}>{name?name:nameOfUser}</Username>
        {!isLoginToken() ? (
          <FollowButton onClick={openLoginPopup}>
            <AiOutlinePlus /> {t(`usersListing.follow`)}
          </FollowButton>
        ) : (
          <>
            {loggedInUsername === user.username || loggedInAccountType === 'page' ? (
              <></>
            ) : checkFollower() ? (
              <UnFollowButton onClick={() => followUnfollow(user._id, 'unfollow')}>
                {t(`usersListing.following`)}
              </UnFollowButton>
            ) : (
              <FollowButton onClick={() => followUnfollow(user._id, 'follow')}>
                <AiOutlinePlus /> {t(`usersListing.follow`)}
              </FollowButton>
            )}
          </>
        )}
        {user && user.userRoleId && user.userRoleId.roleName && (
          <CategoryList>
            {user.userRoleId.roleName.includes('artist') ? t(`artworkSection:artist`) : t(`artworkSection:member`)}
          </CategoryList>
        )}
        <CityCountryWrapper>
        {user && user.city && user.city.value && <Userlocation>{city?city:user.city.value}</Userlocation>}
        {user && user.country && user.country.value && <Userlocation> <span>|</span> {country?country:user.country.value}</Userlocation>}
        </CityCountryWrapper>
      </ItemsWrapper>
    </>
  )
}

ArtworkItems.propTypes = {
  user: PropTypes.object,
}

export default ArtworkItems

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { capitalize } from '@material-ui/core'
import PropTypes from 'prop-types'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { isLoginToken } from '../../../../utilities/authUtils'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../../modules/auth/authSlice'
import { followUnfollowUser } from '../../../../modules/landingPage/landingPageSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent.js'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 4px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 2px solid #eeeeee;
  text-align: center;
  min-height: 100%;
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
    max-width: 90%;
    margin: 0 auto;
    min-width: inherit;
  }
  @media (min-width: 541px) and (max-width: 655px) {
    min-width: inherit;
    max-width: 90%;
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
  font-family: 'Montserrat-Regular';
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
  background: #eee;
  font-style: normal;
  color: #222;
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
    background: #eee;
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
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #666;
  text-transform: capitalize;
`
const Userlocation = styled.h2`
  text-transform: capitalize;
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #666;
`
const CityCountryWrapper = styled.div`
  width: 100%;
  h2 {
    padding-right: 2px;
    text-transform: capitalize;
  }
  span {
    font-size: 14px;
    vertical-align: baseline;
  }
`

const ArtworkItems = ({ user, ind, cities, countries, types }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('landingPage')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const openLoginPopup = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  const followUnfollow = (toFollow, action) => {
    dispatch(followUnfollowUser(toFollow, action, t))
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

  // const [name, translateName] = useState(nameOfUser)
  // const [city, translateCity] = useTranslateContent(user.city.value)
  // const [country, translateCountry] = useTranslateContent(user.country.value)
  // useEffect(() => {
  //   translateName(nameOfUser)
  //   translateCity(user.city.value)
  //   translateCountry(user.country.value)
  // }, [nameOfUser, translateCity, translateCountry, translateName, user.city.value, user.country.value])

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
                : '/assets/artmo_profile_default_cover.jpg'
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(user.dateUpdated).getTime()
              imageErrorHandler(
                e,
                createImageUrl(user.coverPicUrl),
                '/assets/artmo_profile_default_cover.jpg',
                'profileCover',
                timeSuffix
              )
            }}
            alt="Cover"
          />
        </CoverImg>
        <MemberImg onClick={() => router.push(`/user/${user.username}`)}>
          <img
            src={
              user && user.profilePicUrl
                ? createResizeImageUrl(user.profilePicUrl, 150, 150, 'profileCover') +
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
            alt="Profile"
          />
        </MemberImg>
        {/* <Username onClick={() => openInNewTab(`/user/${user.username}`)}>{names[ind] ? names[ind] : user && nameOfUser}</Username> */}
        <Username onClick={() => router.push(`/user/${user.username}`)}>
          {user && nameOfUser}
        </Username>
        {!isLoginToken() ? (
          <FollowButton onClick={openLoginPopup}>
            <AiOutlinePlus /> {t(`landingPage:usersListing.follow`)}
          </FollowButton>
        ) : (
          <>
            {loggedInUsername === user.username || loggedInAccountType === 'page' ? (
              <></>
            ) : checkFollower() ? (
              <UnFollowButton onClick={() => followUnfollow(user._id, 'unfollow')}>
                {t(`landingPage:usersListing.following`)}
              </UnFollowButton>
            ) : (
              <FollowButton onClick={() => followUnfollow(user._id, 'follow')}>
                <AiOutlinePlus /> {t(`landingPage:usersListing.follow`)}
              </FollowButton>
            )}
          </>
        )}
        {user && user.userRoleId && user.userRoleId.roleName && (
          <CategoryList>{types[ind] ? types[ind] : capitalize(user.userRoleId.roleName)}</CategoryList>
        )}
        <CityCountryWrapper>
          {user && user.city && user.city.value && (
            <Userlocation>{cities[ind] ? cities[ind] : user && user.city && user.city.value}</Userlocation>
          )}
          {user && user.country && user.country.value && (
            <Userlocation>
              {countries[ind] ? countries[ind] : user && user.city && user.country.value}
            </Userlocation>
          )}
        </CityCountryWrapper>
      </ItemsWrapper>
    </>
  )
}

ArtworkItems.propTypes = {
  user: PropTypes.object,
  // names: PropTypes.array,
  ind: PropTypes.number,
}

export default ArtworkItems

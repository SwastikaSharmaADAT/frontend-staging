import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { capitalizeFirstChar } from '../../../../utilities/capitalizeFirstChar'
import { isLoginToken } from '../../../../utilities/authUtils'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../../modules/auth/authSlice'
import { followUnfollow } from '../../../../modules/profile/myProfileSlice'
import renderPremiumBatch from '../../../../utilities/renderPremiumBatch'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import Head from 'next/head'

const ItemsWrapper = styled.div`
  position: relative;
  // margin: 0 10px 20px 0;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 2px solid #eeeeee;
  box-sizing: border-box;
  text-align: center;
  max-width: 275px;
  margin: 0;
  max-width: 100%;
  width: 100%;
  @media (min-width: 992px) and (max-width: 1024px) {
    width: 97%;
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 97%;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  max-height: 120px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  min-width: 275px;
  height: 120px;
  min-width: 100%;
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    max-height: 120px;
    object-fit: cover;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`
const MemberImg = styled.div`
  position: relative;
  margin: -50px auto 10px;
  border: 6px solid #fff;
  width: 80px;
  height: 80px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    max-height: 80px;
  }
`
const Username = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0 10px;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`
const Followers = styled.h1`
  padding: 0;
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
const FollowButton = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 15px;
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
  @media (max-width: 767px) {
    font-size: 16px;
  }
  &.followed {
    text-transform: capitalize;
    background: #eee;
    color: #222;
  }
`
const CategoryList = styled.h2`
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  text-align: center;
  color: #666;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const Userlocation = styled.h2`
  padding: 0 10px;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  text-align: center;
  color: #666;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const UserListingContent = ({ user, index, redirectHandler, cities, cntries, types }) => {
  // console.log(cities)
  const dispatch = useDispatch()
  const { t } = useTranslation(['userListing', 'successResponses', 'translation'])

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

  const followUnfollowUser = (toFollow, action) => {
    dispatch(followUnfollow(toFollow, action, 'followers', false, true, t))
  }
  const userName =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user && user.firstName
      ? user.firstName
      : user.username
  return (
    <>
      <ItemsWrapper>
        <CoverImg>
          <img
            onClick={() => redirectHandler(`/user/${user.username}`)}
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
        <MemberImg onClick={() => redirectHandler(`/user/${user.username}`)}>
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
        <Username onClick={() => redirectHandler(`/user/${user.username}`)}>
          {/* {names&&names.length?names[index]:user&&userName} */}
          {user && userName}
          {renderPremiumBatch(user.subscription)}
        </Username>
        <Followers>
          {user && user.userFollowersCount}{' '}
          {user && user.userFollowersCount > 1 ? `${t(`followers`)}` : `${t(`follower`)}`}
        </Followers>
        {loggedInAccountType === 'page' ? (
          <></>
        ) : loggedInUsername === user.username ? (
          <FollowButton onClick={() => redirectHandler(`/user/${user.username}`)}>{t(`editProfile`)}</FollowButton>
        ) : (
          <>
            {user && user.alreadyFollow === 'true' ? (
              <FollowButton className="followed" onClick={() => followUnfollowUser(user._id, 'unfollow')}>
                {t(`following`)}
              </FollowButton>
            ) : user && user.alreadyFollow === 'false' ? (
              <FollowButton onClick={() => followUnfollowUser(user._id, 'follow')}>
                <AiOutlinePlus /> {t(`follow`)}
              </FollowButton>
            ) : user && user.alreadyFollow === '' && !isLoginToken() ? (
              <FollowButton onClick={openLoginPopup}>
                <AiOutlinePlus /> {t(`follow`)}
              </FollowButton>
            ) : null}
          </>
        )}
        {user && user.userRole && user.userRole.length > 0 && user.userRole[0].roleName && (
          <CategoryList>
            {types && types.length
              ? capitalizeFirstChar(types && types[index])
              : user &&
                user.userRole &&
                user.userRole.length &&
                user.userRole[0].roleName &&
                capitalizeFirstChar(user.userRole[0].roleName)}
          </CategoryList>
        )}
        <Userlocation>
          {cities && cities.length ? cities && cities[index] : user && user.city && user.city.value}
        </Userlocation>
        <Userlocation>
          {cntries && cntries.length ? cntries && cntries[index] : user && user.country && user.country.value}
        </Userlocation>
      </ItemsWrapper>
    </>
  )
}

UserListingContent.propTypes = {
  user: PropTypes.object,
  redirectHandler: PropTypes.func,
  // names: PropTypes.array,
  index: PropTypes.number,
  cities: PropTypes.array,
  cntries: PropTypes.array,
  types: PropTypes.array,
}

export default UserListingContent

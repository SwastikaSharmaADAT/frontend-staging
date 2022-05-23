import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { setAllArtists } from '../../../modules/subscription/subscriptionSlice'
import ArtistProfileNav from './ArtistProfileNav'
import MemberProfileNav from './MemberProfileNav'


const UserProfileWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: row;
  padding: 0;
  max-width: 328px;
  @media (max-width: 1024px) {
    margin: 0 auto 16px;
  }
`

const UserProfileLeft = styled.div`
  padding: 20px 10px 20px 15px;
`
const ProfileArtImgWrap = styled.div`
  width: 174px;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`

const ProfileArtImg = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  img {
    height: 100%;
  }
  &.artist {
    height: 300px;
  }
`

const ButtonWrap = styled.div`
  position: absolute;
`

const SeeAllArtButton = styled.button`
  height: auto;
  min-height: 30px;
  background: #ffffff;
  font-size: 16px;
  line-height: 19px;
  color: #222;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  padding: 5px 15px;
  width: 120px;
`

const UserProfileName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #666666;
  padding: 0;
  margin: 0 0 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const UserProfileDetails = styled.ul`
  padding: 0;
  margin: 10px 0 0;
  li {
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    color: #222;
    list-style: none;
    display: flex;
    align-items: center;
    a {
      color: #222;
      text-transform: uppercase;
      cursor: pointer;
      width: calc(100% - 20px);
    }
    svg {
      font-size: 19px;
      margin: 0 14px 0 0;
    }
  }
`

const UserProfile = (props) => {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const dispatch = useDispatch()
  const { username } = router.query

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const userArtworks = useSelector((state) => state.root.myProfile.userArtworks)

  const renderName = () => {
    if (userDataState && userDataState.userRoleType === 'personal') {
      return (
        <>
          {userDataState && userDataState.firstName && userDataState.lastName
            ? `${userDataState.firstName} ${userDataState.lastName}'s`
            : `${userDataState.username}'s`}
        </>
      )
    } else if (userDataState && userDataState.userRoleType === 'page') {
      return (
        <>{userDataState && userDataState.firstName ? `${userDataState.firstName}'s` : `${userDataState.username}'s`}</>
      )
    }
  }

  const redirectToArtworks = () => {
    const params = router.query
    const userId = userDataState && userDataState.uuid

    if (userDataState && userDataState.userRole === 'artist') {
      const userFullName = userDataState && `${userDataState.firstName} ${userDataState.lastName}`
      const userObj = {
        firstName: userDataState && userDataState.firstName,
        fullName: userFullName,
        lastName: userDataState && userDataState.lastName,
        username: username,
        _id: userId,
      }
      dispatch(setAllArtists([userObj]))
      const artistIdArr = [userId]
      params.artist = JSON.stringify(artistIdArr)

      router.push({ pathname: '/artworks', query: params })
    } else if (userDataState && userDataState.userRole === 'member') {
      dispatch(setAllArtists([]))
      params.member = JSON.stringify(userId) 
      router.push({ pathname: '/artworks', query: params })
    }
  }

  return (
    <>
      <UserProfileWrap>
        <UserProfileLeft>
          <UserProfileName>
            {renderName()} {t(`profileNavigator.profile`)}:
          </UserProfileName>
          <UserProfileDetails>
            {userDataState.userRole === 'artist' ? (
              <ArtistProfileNav refObject={props.refObject} />
            ) : (
              <MemberProfileNav refObject={props.refObject} userRoleType={userDataState.userRoleType} />
            )}
          </UserProfileDetails>
        </UserProfileLeft>
      </UserProfileWrap>
    </>
  )
}
UserProfile.propTypes = {
  refObject: PropTypes.object,
}
export default UserProfile

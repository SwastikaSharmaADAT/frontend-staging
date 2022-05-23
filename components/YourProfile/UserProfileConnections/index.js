import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { getUserConnections } from '../../../modules/profile/myProfileSlice'
import ModalComponent from '../../UI/Modal'
import ConnectionsPopup from '../ConnectionsPopup'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

const ProfileConnectionsWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  padding: 30px 17px;
  max-width: 328px;
  box-sizing: border-box;
  text-align: center;
  @media (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
    max-width: 315px;
  }
  @media (max-width: 1024px) {
    margin: 0 auto 16px;
  }
`

const ProfileName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #666666;
  padding: 0;
  margin: 0 0 15px;
`

const ConnectionsUl = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const ConnectionsLi = styled.div`
  width: 40px;
  height: 38px;
  margin: 0 5px 5px 0;
  img {
    width: 100%;
    height: 100%;
  }
  &.lastChild {
    width: auto;
    height: auto;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #222;
    padding: 0 13px;
  }
  a {
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const FollowingList = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #222;
  margin: 15px 0 0;
  span {
    margin: 0 5px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const DefaultMsgWrapper = styled.div`
  color: #666;
  font-style: normal;
  text-align: center;
`

const UserProfileConnections = ({ scrollToBlurred }) => {
  const { t } = useTranslation('profile')

  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = router.query
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const connections = useSelector((state) => state.root.myProfile.connections)

  const [showConnections, setShowConnections] = useState(false)

  // Fetch list from server
  useEffect(() => {
    let user = ''
    if (userDataState.username) {
      user = userDataState.username
    } else {
      user = username
    }
    const userInfo = {
      username: user,
      offset:0,
      limit:10
    }
    dispatch(getUserConnections(userInfo))
  }, [dispatch, userDataState.username, username])

  const redirectToUserProfile = (username) => {
    if (userDataState && userDataState.userIdentity === 'guestUser') {
      scrollToBlurred()
    } else {
      router.push(`/user/${username}`)
    }
  }

  const seeAllHandler = () => {
    if (userDataState && userDataState.userIdentity === 'guestUser') {
      scrollToBlurred()
    } else if (userDataState && userDataState.userIdentity === 'verifiedUser') {
      router.push(`/user/${userDataState.username}/connections`)
    } else {
      setShowConnections(true)
    }
  }

  return (
    <>
      {showConnections && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={showConnections}
          closeModal={() => setShowConnections(false)}
        >
          <ConnectionsPopup
            firstName={userDataState && userDataState.firstName ? userDataState.firstName : null}
            lastName={userDataState && userDataState.lastName ? userDataState.lastName : null}
            setShowConnections={setShowConnections}
          />
        </ModalComponent>
      )}
      <ProfileConnectionsWrap>
        <ProfileName>
          {userDataState && userDataState.firstName && userDataState.lastName
            ? `${userDataState.firstName} ${userDataState.lastName}'s`
            : `${userDataState.username}'s`}{' '}
          {t(`connections.title`)}
        </ProfileName>
        {connections.length === 0 && (
          <DefaultMsgWrapper> {t(`connections.noConnectionsFound`)}</DefaultMsgWrapper>
        )}
        <ConnectionsUl>
          {connections.map((connection, index) => {
            if (index < 10) {
              return (
                <ConnectionsLi key={connection._id}>
                  <a>
                    <img
                      src={
                        connection.profilePicUrl
                          ? createResizeImageUrl(connection.profilePicUrl, 50, 50, 'profileCover') +
                            '?' +
                            new Date(connection.dateUpdated).getTime()

                          : '/assets/artmo-default.png'
                      }
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(connection.dateUpdated).getTime()
                        imageErrorHandler(
                          e,
                          createImageUrl(connection.profilePicUrl),
                          '/assets/artmo-default.png',
                          'profileCover',
                          timeSuffix
                        )
                      }}
                      onClick={() => redirectToUserProfile(connection.username)}
                      alt=""
                    />
                  </a>
                </ConnectionsLi>
              )
            } else {
              return null
            }
          })}
          {connections.length > 10 && (
            <ConnectionsLi className="lastChild">
              <a onClick={() => seeAllHandler()}>{t(`connections.seeAll`)}</a>
            </ConnectionsLi>
          )}
        </ConnectionsUl>
        <FollowingList>
          {t(`connections.followers`)}:{' '}
          <span>{userDataState && userDataState.followersCount ? userDataState.followersCount : 0}</span> •{' '}
          <span>
            {t(`connections.following`)}:{' '}
            {userDataState && userDataState.followingCount ? userDataState.followingCount : 0}
          </span>
        </FollowingList>
      </ProfileConnectionsWrap>
    </>
  )
}

UserProfileConnections.propTypes = {
  scrollToBlurred: PropTypes.func,
}

export default UserProfileConnections
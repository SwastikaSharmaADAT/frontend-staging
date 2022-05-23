import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FollowsDesp = styled.div`
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #666666;
  margin: 0;
  padding: 5px 0;
  @media (max-width: 479px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  span {
    font-family: 'Montserrat-Medium';
    font-weight: 100;
    color: #222;
    margin: 0 5px;
  }
  .followrap .followrap-count {
    cursor: pointer;
  }
  .dots {
    margin: 0 5px 0 0;
    @media (max-width: 767px) {
      display: none;
    }
  }
  .followrap {
    @media (max-width: 767px) {
      margin: 0 10px 5px 0;
    }
    @media (max-width: 479px) {
      width: 100%;
      margin: 0 10px 5px 0;
    }
  }
`

const ProfileFollowsdesp = (props) => {
  const {
    userData,
    setShowFollowers,
    setShowFollowing,
    setShowConnections,
    scrollToBlurred,
    redirectToConnections,
  } = props

  const followingClickHandler = () => {
    if (userData && userData.userIdentity === 'guestUser') {
      scrollToBlurred()
    } else {
      setShowFollowing(true)
    }
  }

  const followClickHandler = () => {
    if (userData && userData.userIdentity === 'guestUser') {
      scrollToBlurred()
    } else {
      setShowFollowers(true)
    }
  }

  const connectionClickHandler = () => {
    if (userData && userData.userIdentity === 'guestUser') {
      scrollToBlurred()
    } else if (userData && userData.userIdentity === 'verifiedUser') {
      redirectToConnections()
    } else {
      setShowConnections(true)
    }
  }

  const openConnectionsPage = () => {
    if (userData && userData.userIdentity === 'verifiedUser') {
      redirectToConnections()
    }
  }

  return (
    <>
      <FollowsDesp>
        {userData ? (
          <>
            {userData.userRoleType === 'personal' && (
              <>
                <div className="followrap">
                  Following:{' '}
                  {userData.followingCount ? (
                    <span className="followrap-count" onClick={() => followingClickHandler()}>
                      {userData.followingCount}
                    </span>
                  ) : (
                    <span>0</span>
                  )}
                </div>{' '}
                <div className="dots">•</div>{' '}
              </>
            )}
            <div className="followrap">
              Followers:{' '}
              {userData.followersCount ? (
                <span className="followrap-count" onClick={() => followClickHandler()}>
                  {userData.followersCount}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>{' '}
            {userData.userRoleType === 'personal' && (
              <>
                <div className="dots">•</div>{' '}
                <div className="followrap">
                  Connections:{' '}
                  {userData.connectionCount ? (
                    <span className="followrap-count" onClick={() => connectionClickHandler()}>
                      {userData.connectionCount}
                    </span>
                  ) : (
                    <span
                      className={userData.userIdentity === 'verifiedUser' ? 'followrap-count' : null}
                      onClick={() => openConnectionsPage()}
                    >
                      0
                    </span>
                  )}
                </div>
              </>
            )}
          </>
        ) : null}
      </FollowsDesp>
    </>
  )
}

ProfileFollowsdesp.propTypes = {
  userData: PropTypes.object,
  setShowFollowers: PropTypes.func.isRequired,
  setShowFollowing: PropTypes.func.isRequired,
  setShowConnections: PropTypes.func.isRequired,
  scrollToBlurred: PropTypes.func,
  redirectToConnections: PropTypes.func,
}

export default ProfileFollowsdesp

import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { getUserConnections, addConnection } from '../../../modules/profile/myProfileSlice'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'


const FollowingPopupWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: 374px;
  min-width: 374px;
  min-height: 270px;
  height: auto;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  @media (max-width: 767px) {
    min-width: 300px;
    max-width: 300px;
  }
`

const ConnectionsPopup = ({ setShowConnections, firstName, lastName }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {t} =useTranslation(['successResponses','translation'])
  const connections = useSelector((state) => state.root.myProfile.connections)
  const userDataState = useSelector((state) => state.root.myProfile.userData)

  const loggedInUserInfo = localStorage.getItem('user_info')
  const loggedInUsername = loggedInUserInfo && JSON.parse(loggedInUserInfo).username

  /** Get account type from local storage */
  const parsedUserInfo = loggedInUserInfo && JSON.parse(loggedInUserInfo)
  const { accountType } = parsedUserInfo

  // Fetch list from server
  useEffect(() => {
    const userInfo = {
      username: userDataState.username,
      limit:10,
      offset:0
    }
    dispatch(getUserConnections(userInfo))
  }, [dispatch, userDataState.username])

  const addConnectionRequest = (username) => {
    const userInfoObj = {
      username: username,
    }
    dispatch(addConnection(userInfoObj,t))
  }

  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
    setShowConnections(false)
  }

  return (
    <>
      <FollowingPopupWrap>
        <SectionHeader firstName={firstName} lastName={lastName} setShowConnections={setShowConnections} />
        <SectionContent
          addConnectionRequest={addConnectionRequest}
          redirectToUserProfile={redirectToUserProfile}
          loggedInUsername={loggedInUsername}
          accountType={accountType}
        />
      </FollowingPopupWrap>
    </>
  )
}

ConnectionsPopup.propTypes = {
  setShowConnections: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
}

export default ConnectionsPopup

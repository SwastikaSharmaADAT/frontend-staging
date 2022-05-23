import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import GroupMembers from '../GroupMembers'
import InviteConnections from '../InviteConnections'
import JoinRequests from '../JoinRequests'

const SubLeftBar = styled.div`
  width: 100%;
  position: relative;
  max-width: 263px;
  @media (max-width: 1024px) {
    margin-right: 15px;
  }
  @media (max-width: 500px) {
    max-width: 100%;
    margin-right: 0px;
  }
`

const SubLeftSection = () => {
  const [userInfo, setuserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const groupMembers = useSelector((state) => state.root.groups.currentPageGroupMembers)
  const exist = groupMembers.find((member) => member.user.username === loggedInUsername)
  const invitationType = useSelector((state) => state.root.groups.groupInfo.invitationType)
  const inviteFeature = useSelector((state) => state.root.groups.groupInfo.inviteFeature)
  const loggedInUserType = useSelector((state) => state.root.groups.loggedInUserType)
  const groupInfo = useSelector((state) => state.root.groups.groupInfo)

  useEffect(()=>{
    setuserInfo(localStorage.getItem('user_info'))
  },[])

  return (
    <>
      <SubLeftBar>
        <GroupMembers />
        {groupInfo &&
          groupInfo.privacy !== 'public' &&
          groupInfo.privacy !== 'hidden' &&
          (loggedInUserType === 'admin' || loggedInUserType === 'moderator') && <JoinRequests />}
        {invitationType === 'adminModerators' &&
        ((exist && exist.isAdmin) || (exist && exist.isModerator)) &&
        inviteFeature ? (
            <InviteConnections />
          ) : invitationType === 'admin' && exist && exist.isAdmin && inviteFeature ? (
            <InviteConnections />
          ) : invitationType === 'everyone' && exist && inviteFeature ? (
            <InviteConnections />
          ) : null}
      </SubLeftBar>
    </>
  )
}

export default SubLeftSection

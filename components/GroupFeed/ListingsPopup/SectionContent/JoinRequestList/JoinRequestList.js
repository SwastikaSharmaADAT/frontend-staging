import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { joinRequestAction } from '../../../../../modules/groups/groupsSlice'
import useTranslateArray from '../../../../../hooks/useTranslateArray'
import SingleItem from './SingleItem'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 15px 0 0;
  padding: 0 15px 30px;
  overflow-y: auto;
  max-height: 180px;
  @media (max-width: 767px) {
    max-height: 250px;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    max-height: 155px;
  }
  /* ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 0.233);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    cursor: pointer;
    border-radius: 10px;
  } */
  .MuiPaper-elevation8 .MuiPaper-root .MuiPopover-paper {
    left: 400px;
    height: 118px;
  }
  .menu-item {
    cursor: pointer;
  }
  .DefaultText {
    font-style: normal;
    color: #666;
  }
`

function JoinRequestList() {
  const { t } = useTranslation(['groupsFeed', 'successResponses', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const { groupId } = router.query
  const groupMembers = useSelector((state) => state.root.groups.groupJoinRequests)

  /** Handles onClick event on action buttons */
  const joinReqAction = (userId, type) => {
    dispatch(joinRequestAction(groupId, userId, type, t))
  }

  /** To redirect to user profile on user's image and name click */
  const redirectToUserProfile = (userInfo) => {
    router.push(`/user/${userInfo}`)
  }
  return (
    <>
      <SectionContentWrap>
        {groupMembers &&
          groupMembers.length > 0 &&
          groupMembers.map((member) => (
            <SingleItem redirectToUserProfile={redirectToUserProfile} joinReqAction={joinReqAction} member={member} />
          ))}
        {groupMembers && groupMembers.length === 0 && (
          <span className="DefaultText"> {t(`joinRequests.noMoreRequests`)}</span>
        )}
      </SectionContentWrap>
    </>
  )
}

JoinRequestList.propTypes = {
  // groupMembers: PropTypes.array,
}

export default JoinRequestList

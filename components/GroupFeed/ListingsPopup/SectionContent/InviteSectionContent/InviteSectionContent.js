import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getInviteUserList, inviteConnection, setMembersLoader } from '../../../../../modules/groups/groupsSlice'
import useTranslateArray from '../../../../../hooks/useTranslateArray'
import SingleItem from './SingleItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import GhostLoader from '../../../../UI/GhostLoader'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 15px 0 0;
  padding: 0 15px 30px;
  overflow-y: auto;
  max-height: 180px;
  @media (max-width: 767px) {
    max-height: 135px;
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
function InviteSectionContent() {
  const { t } = useTranslation(['groupsFeed', 'translation', 'successResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query
  const [hasMore, setHasMore] = useState(true)

  let groupMembers = useSelector((state) => state.root.groups.inviteUserList)
  const membersLoader = useSelector((state) => state.root.groups.membersLoader)
  const membersMetadata = useSelector((state) => state.root.groups.membersMetadata)

  /**handles click event on invite button */
  const inviteHandler = (userId) => {
    /**dispatch action to invite connecction */
    dispatch(inviteConnection({ userId, groupId: params.groupId, t: t }))
  }

  /**method to fetch more connections once user reaches bottom of div */
  const fetchData = async () => {
    if (groupMembers.length < membersMetadata) {
      const limit = 10
      const offset = groupMembers.length
      dispatch(getInviteUserList({ info: { groupId: params.groupId, limit, offset }, t }))
      // dispatch(getFollowersFollowing(following.length,limit,'following',t))
    } else setHasMore(false)
  }
  return (
    <>
      <SectionContentWrap id="invitemembers">
        {membersLoader ? (
          <GhostLoader notification />
        ) : (
          <>
            {groupMembers && groupMembers.length > 0 && (
              <InfiniteScroll
                scrollableTarget={'invitemembers'}
                dataLength={groupMembers.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<GhostLoader notification />}
              >
                {groupMembers &&
                  groupMembers.length > 0 &&
                  groupMembers.map((member) => <SingleItem member={member} inviteHandler={inviteHandler} />)}
              </InfiniteScroll>
            )}
          </>
        )}
        {groupMembers && groupMembers.length === 0 && (
          <span className="DefaultText">{t(`invite.allConnectionsInvited`)}</span>
        )}
      </SectionContentWrap>
    </>
  )
}

export default InviteSectionContent

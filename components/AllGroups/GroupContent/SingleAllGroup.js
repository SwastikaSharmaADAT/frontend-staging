import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import {capitalize} from 'lodash'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import useTranslateArray from '../../../hooks/useTranslateArray'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'


const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 24px 15px;
  /* background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #eee;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 15px;
  }
`
const LeftHead = styled.div`
  display: flex;
  flex-direction: row;
  max-width: calc(100% - 250px);
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: inherit;
  }
`
const TopGroupIcon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 14px 0 0;
  &.clickable {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
    margin: 0 0 15px 0;
  }
  img {
    width: 100px;
    height: 100px;
    @media (max-width: 500px) {
      width: 80px;
      height: 80px;
    }
  }
`
const GroupNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 120px);
  width: 100%;
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
  }
`
const GroupName = styled.div`
  font-style: normal;
  font-size: 24px;
  line-height: normal;
  margin: 0 0 5px 0;
  color: #000;
  text-transform: uppercase;
  word-break: break-word;
  &.clickable {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
const GroupTimeline = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0 0 2px 0;
  color: #666;
  @media (max-width: 500px) {
    font-size: 12px;
    text-align: center;
  }
`
const RightHead = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
  a {
    font-size: 14px;
    text-align: right;
    color: #cccccc;
    cursor: pointer;
    margin: 0 0 5px;
  }
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
    margin: 15px 0 0;
  }
`
const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 14px;
  color: #666;
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
  }
  .InvitedGroupName {
    font-family: 'Montserrat-Medium';
    color: #222;
    margin: 5px 0;
  }
`
const RightBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 0 0;
`
const IgnoreButton = styled.button`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 4px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eee;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`
const ConnectBtn = styled.button`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  justify-content: center;
  color: #eee;
  background: #222;
  width: auto;
  border: 0;
  padding: 4px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  &.joinBtn {
    margin: 0 0 5px;
  }
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eee;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`
function SingleAllGroup({
  group,
  redirectToGroup,
  setToBeLeftGroup,
  onJoinClick,
  onCancelJoinRequest,
  onInvitationResponse,
  dateFromNow,
}) {
  const { t } = useTranslation('groups')
  const router = useRouter()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUser = userInfo && JSON.parse(userInfo).personalUuid

  const invitedBy =
    group &&
    group.invitedMembers &&
    group.invitedMembers.invitedBy &&
    `${group.invitedMembers.invitedBy.firstName} ${group.invitedMembers.invitedBy.lastName}`
  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  const [privacy, translatePrivacy] =useTranslateContent('')
  const [invitee, translateInvitee] =useTranslateContent('')

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if(!isEmptyObj(group)){
      translateTitle(group.title)
      translatePrivacy(group.privacy)
      translateDescription(group.description)
      translateInvitee(invitedBy)
    }
  }, [
    group.description,
    group.privacy,
    group.title,
    invitedBy
  ])
  const [categoryArr, translateCategoryArr] = useTranslateArray(group && group.categories, 'title')
  const [tagsArr, translateTagsArr] = useTranslateArray(group && group.tags, 'title')
  useEffect(() => {
    translateCategoryArr(group.categories, 'title')
    translateTagsArr(group.tags, 'title', 'title')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group.categories.length, translateCategoryArr, translateTagsArr, group.tags.length])
  return (
    <GroupBarHeadWrapper>
      <LeftHead>
        <TopGroupIcon
          className={
            group.privacy === 'public' ||
            ((group.privacy === 'private' || group.privacy === 'hidden') &&
              group.groupMembers &&
              group.groupMembers.user &&
              group.groupMembers.user === loggedInUser)
              ? 'clickable'
              : null
          }
          onClick={() =>
            (group.privacy === 'public' ||
            ((group.privacy === 'private' || group.privacy === 'hidden') &&
              group.groupMembers &&
              group.groupMembers.user &&
              group.groupMembers.user === loggedInUser)) &&
              redirectToGroup(group._id)
          }
        >
          <img
            src={
              group && group.profilePicUrl
                ? createResizeImageUrl(group.profilePicUrl, 150, 150, 'profileCover') +
              '?' +
              new Date(group.dateUpdated).getTime()
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(group.dateUpdated).getTime()
              imageErrorHandler(e, createImageUrl(group.profilePicUrl), '/assets/mo-fallback-image.png', 'profileCover', timeSuffix)
            }}
            alt={`${group.title} group`}
          />
        </TopGroupIcon>
        <GroupNameWrap>
          <GroupName
            className={
              group.privacy === 'public' ||
              ((group.privacy === 'private' || group.privacy === 'hidden') &&
                group.groupMembers &&
                group.groupMembers.user &&
                group.groupMembers.user === loggedInUser)
                ? 'clickable'
                : null
            }
            onClick={() =>
              (group.privacy === 'public' ||
              ((group.privacy === 'private' || group.privacy === 'hidden') &&
                group.groupMembers &&
                group.groupMembers.user &&
                group.groupMembers.user === loggedInUser)) &&
                redirectToGroup(group._id)

            }
          >
            {title?title:group&&group.title}
          </GroupName>
          {group && group.privacy && 
            <GroupTimeline>
              {group.privacy && `${capitalize(group.privacy)} ${t(`groupListing.group`)}`}
            </GroupTimeline>
          }
          <GroupTimeline>
            {group &&
              group.categories &&
              group.categories.length > 0 &&
              categoryArr.map((category, index) => {
                if (index + 1 === group.categories.length) {
                  return <a key={index}>{category && category.title}</a>
                } else {
                  return <a key={index}>{category && category.title}, </a>
                }
              })}
          </GroupTimeline>
          <GroupTimeline>
            {group &&
              group.tags &&
              group.tags.length > 0 &&
              tagsArr.map((tag, index) => {
                if (index + 1 === group.tags.length) {
                  return <a key={index}>{tag && tag.title}</a>
                } else {
                  return <a key={index}>{tag && tag.title}, </a>
                }
              })}
          </GroupTimeline>
          <GroupTimeline>{ description?description:group&&group.description}</GroupTimeline>
        </GroupNameWrap>
      </LeftHead>
      <RightHead>
        {group.groupMembers && (
          <>
            {group.groupMembers.isAdmin ? (
              <a onClick={() => router.push(`/groups/${group._id}/edit`)}>
                {t(`groupListing.manageGroupLabel`)}
              </a>
            ) : (
              <a onClick={() => setToBeLeftGroup(group._id)}>{t(`groupListing.leaveGroup`)}</a>
            )}
          </>
        )}
        {!group.groupMembers && !group.invitedMembers && (
          <>
            <ConnectBtn className="joinBtn" onClick={() => onJoinClick(group._id)}>
              {group && group.privacy === 'public' ? 'Join' : 'Send Join Request'}
            </ConnectBtn>
          </>
        )}

        {group.invitedMembers && (
          <>
            {group.invitedMembers.isRequest && (
              <IgnoreButton onClick={() => onCancelJoinRequest(group._id)}>
                {t(`groupListing.cancelRequest`)}
              </IgnoreButton>
            )}

            {!group.invitedMembers.isRequest && group.invitedMembers.invitedBy && (
              <GroupDiv>
                <span>{t(`groupListing.invitedBy`)}</span>
                <span className="InvitedGroupName">{group && group.invitedMembers && invitee?invitee:invitedBy}</span>
                <span>{t(`groupListing.wouldYouJoin`)}</span>
                <RightBtns>
                  <ConnectBtn onClick={() => onInvitationResponse(group._id, group.invitedMembers.invitedBy._id, true)}>
                    {t(`groupListing.accept`)}
                  </ConnectBtn>
                  <IgnoreButton
                    onClick={() => onInvitationResponse(group._id, group.invitedMembers.invitedBy._id, false)}
                  >
                    {t(`groupListing.ignore`)}
                  </IgnoreButton>
                </RightBtns>
              </GroupDiv>
            )}
          </>
        )}

        <GroupDiv>
          {group.groupsLastPost && (
            <span>
              {t(`groupListing.lastActive`)}: {dateFromNow(group.groupsLastPost.dateCreated)}
            </span>
          )}
          <span>
            {group.membersCount} {t(`groupListing.members`)}
          </span>
          {/* lang check */}
          <span>
            {group.postsCount} {t(`groupListing.posts`)}
          </span>
        </GroupDiv>
      </RightHead>
    </GroupBarHeadWrapper>
  )
}
SingleAllGroup.propTypes = {
  group: PropTypes.object,
  redirectToGroup: PropTypes.func,
  setToBeLeftGroup: PropTypes.func,
  onJoinClick: PropTypes.func,
  onCancelJoinRequest: PropTypes.func,
  onInvitationResponse: PropTypes.func,
  dateFromNow: PropTypes.func,
}
export default SingleAllGroup

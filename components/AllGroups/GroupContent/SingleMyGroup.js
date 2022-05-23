import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {capitalize} from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
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
function SingleMyGroup({ redirectToGroup, group, dateFromNow, setToBeLeftGroup }) {
  const { t } = useTranslation('groups')
  const router = useRouter()

  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  const [privacy, translatePrivacy] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(group)){
      translateTitle(group.title)
      translatePrivacy(group.privacy)
      translateDescription(group.description)
    }
  }, [group.description, group.privacy, group.title])

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
        <TopGroupIcon className="clickable" onClick={() => redirectToGroup(group._id)}>
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
          <GroupName className="clickable" onClick={() => redirectToGroup(group._id)}>
            {title?title:group&&group.title}
          </GroupName>
          <GroupTimeline>
            {group.privacy && `${capitalize(group.privacy)} ${t(`groupListing.group`)}`}
          </GroupTimeline>
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
          <GroupTimeline>{description?description:group&&group.description}</GroupTimeline>
        </GroupNameWrap>
      </LeftHead>
      <RightHead>
        {group && group.groupMembers && group.groupMembers.isAdmin ? (
          <a onClick={() => router.push(`/groups/${group._id}/edit`)}>{t(`groupListing.manageGroupLabel`)}</a>
        ) : (
          <a onClick={() => setToBeLeftGroup(group._id)}>{t(`groupListing.leaveGroup`)}</a>
        )}
        <GroupDiv>
          {group.groupsLastPost && <span>{t(`groupListing.lastActive`)}: {dateFromNow(group.groupsLastPost.dateCreated)}</span>}
          <span>
            {group.membersCount} {t(`groupListing.members`)}
          </span>
          <span>
            {group.postsCount} {t(`groupListing.posts`)}
          </span>
        </GroupDiv>
      </RightHead>
    </GroupBarHeadWrapper>
  )
}
SingleMyGroup.propTypes = {
  onLeaveGroupClick: PropTypes.func,
  redirectToGroup: PropTypes.func,
  group: PropTypes.object,
  dateFromNow: PropTypes.func,
  setToBeLeftGroup: PropTypes.func,
}
export default SingleMyGroup

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const GroupWrap = styled.div`
  position: relative;
  margin: 0 20px 55px 0;
  width: 100%;
  max-width: 30%;
  display: flex;
  @media (max-width: 991px) {
    max-width: 49%;
    margin: 0 0 20px;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
`

const GroupIcon = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`

const GroupContent = styled.div`
  width: calc(100% - 60px);
  font-size: 18px;
  line-height: 22px;
  color: #222222;
  margin: 0 0 0 10px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`
const GroupDetails = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #666;
  margin: 3px 0 0;
  @media (max-width: 767px) {
    line-height: normal;
  }
`
const GroupHeading = styled.div`
  font-style: normal;
  font-weight: normal;
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: normal;
  }
`
function SingleGroup({group,index}) {
  const { t } = useTranslation('profile')
    const router = useRouter()
    const [title, translateTitle] =useTranslateContent('')

    useEffect(() => {
        if(!isEmptyObj(group)){
          translateTitle(group.title)
        }
      }, [group.title])
    return (
        <GroupWrap key={index}>
          <GroupIcon>
            <img
              src={
                !isEmptyObj(group) && group.profilePicUrl
                  ? createResizeImageUrl(group.profilePicUrl, 50, 50, 'profileCover')
                  : '/assets/artmo-default.png'
              }
              onClick={() => router.push(`/groups/${group._id}`)}
              onError={(e) => {
                imageErrorHandler(e, createImageUrl(group.profilePicUrl), '/assets/artmo-default.png', 'profileCover', '')
              }}

              alt="Post"
            />
          </GroupIcon>
          <GroupContent>
            <GroupHeading onClick={() => router.push(`/groups/${group._id}`)}>{title ? title : group && group.title}</GroupHeading>
            <GroupDetails>
              {group.groupSubscribers}{' '}
              {group.groupSubscribers === 1 ? t(`group.member`) : t(`group.memberPlural`)}
            </GroupDetails>
          </GroupContent>
        </GroupWrap>
      )
}

SingleGroup.propTypes = {
    group:PropTypes.object,
    index:PropTypes.number
  }
export default SingleGroup;
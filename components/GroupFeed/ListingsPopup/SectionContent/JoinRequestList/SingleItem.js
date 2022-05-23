import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../../hooks/useTranslateContent'
import { getUserName } from '../../../../../utilities/otherProfile'
import { isEmptyObj } from '../../../../../utilities/checkEmptyObject'

const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
`

const FollowingThumb = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 767px) {
    width: 35px;
    height: 35px;
  }
  cursor: pointer;
`
const FollowsNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 70px);
  width: 100%;
  margin-left: 10px;
  @media (max-width: 767px) {
    max-width: calc(100% - 55px);
  }
  margin-right: 10px;
`

const FollowsName = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: normal;
  margin: 0 0 3px 0;
  color: #222;
  font-weight: normal;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const FollowersCount = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0;
  color: #666;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

const FollowButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  background: #222222;
  width: auto;
  border: 0;
  padding: 4px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    margin-right: 5px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

const FollowedButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 4px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-right: 8px;
    font-size: 14px;
    padding: 4px 10px;
    margin-left: 0;
  }
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
`


function SingleItem({member,redirectToUserProfile, joinReqAction}) {
    const { t } = useTranslation(['groupsFeed', 'successResponses', 'translation'])

    const nameOfUser = member && getUserName(member.user)
    const [name, translateName] = useTranslateContent('')
  
    useEffect(() => {
      if(!isEmptyObj(member))
      translateName(nameOfUser)
    }, [nameOfUser])

    return (
        <FollowingList key={member._id}>
          <FollowsWrap>
            <FollowingThumb>
            <img
                src={
                  member.user && member.user.profilePicUrl
                    ? createResizeImageUrl(member.user.profilePicUrl, 50, 50, 'profileCover') +
                      '?' +
                      new Date(member.user.dateUpdated).getTime()
                    : '/assets/artmo-default.png'
                }
                onError={(e) => {
                  const timeSuffix = '?' + new Date(member.user.dateUpdated).getTime()
                  imageErrorHandler(
                    e,
                    createImageUrl(member.user.profilePicUrl),
                    '/assets/artmo-default.png',
                    'profileCover',
                    timeSuffix
                  )
                }}
                onClick={() => member.user && redirectToUserProfile(member.user.username)}
                alt=""
              />
            </FollowingThumb>
            <FollowsNameWrap>
              <FollowsName onClick={() => member.user && redirectToUserProfile(member.user.username)}>
                {name ? name : member && getUserName(member.user)}
              </FollowsName>
              <FollowersCount>
                {member.followerDetails && member.followerDetails.followersCount > 0
                  ? member.followerDetails.followersCount
                  : 0}{' '}
                {member.followerDetails &&
                member.followerDetails.followersCount &&
                member.followerDetails.followersCount > 1
                  ? t(`joinRequests.followerPlural`)
                  : t(`joinRequests.follower`)}
              </FollowersCount>
            </FollowsNameWrap>
          </FollowsWrap>
          <BtnWrapper>
            {/* Block feature not covered in this scope */}
            {/* <FollowedButton onClick={() => member.user && joinReqAction(member.user._id, 'block')}>
              Block
            </FollowedButton> */}
            <FollowedButton onClick={() => member.user && joinReqAction(member.user._id, 'reject')}>
              {t(`joinRequests.reject`)}
            </FollowedButton>
            <FollowButton onClick={() => member.user && joinReqAction(member.user._id, 'accept')}>
              {t(`joinRequests.accept`)}
            </FollowButton>
          </BtnWrapper>
        </FollowingList>
      )
}
SingleItem.propTypes = {
    member:PropTypes.object,
    redirectToUserProfile:PropTypes.object, 
    joinReqAction:PropTypes.object,
  }
export default SingleItem;
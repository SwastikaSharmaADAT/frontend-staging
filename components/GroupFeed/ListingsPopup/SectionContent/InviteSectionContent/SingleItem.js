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
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
`

const FollowingThumb = styled.div`
  width: 50px;
  height: 50px;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 767px) {
    width: 35px;
    height: 35px;
  }
  a {
    cursor: pointer;
  }
`
const FollowsNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 60px);
  width: 100%;
  margin-left: 10px;
  @media (max-width: 767px) {
    max-width: calc(100% - 45px);
  }
`

const FollowsName = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: normal;
  margin: 0 0 3px 0;
  color: #222;
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
  padding: 4px 10px;
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
  padding: 4px 10px;
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
    font-size: 14px;
    padding: 4px 10px;
  }
`

function SingleItem({member,inviteHandler}) {
  const { t } = useTranslation(['groupsFeed','translation','successResponses'])

  const nameOfUser = getUserName(member)
  const [name, translateName] = useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(member))
    translateName(nameOfUser)
  }, [nameOfUser])


    return  (
        <FollowingList key={member._id}>
          <FollowsWrap>
            <FollowingThumb>
              <a onClick={() => router.push(`/user/${member.username}`)}>
                <img
                  src={
                    member.profilePicUrl
                      ? createResizeImageUrl(member.profilePicUrl, 50, 50, 'profileCover')
                      : '/assets/artmo-default.png'
                  }
                  onError={(e) => {
                    imageErrorHandler(e, createImageUrl(member.profilePicUrl), '/assets/artmo-default.png', 'profileCover', '')
                  }}
                  alt=""
                />
              </a>
            </FollowingThumb>
            <FollowsNameWrap>
              <FollowsName onClick={() => router.push(`/user/${member.username}`)}>{name ? name : member && getUserName(member)}</FollowsName>
              <FollowersCount>
                {member.followersDetails && member.followersDetails.followersCount > 0
                  ? member.followersDetails.followersCount
                  : 0}{' '}
                {member.followersDetails &&
                member.followersDetails.followersCount &&
                member.followersDetails.followersCount === 1
                  ? t(`invite.follower`)
                  : t(`invite.followerPlural`)}
              </FollowersCount>
            </FollowsNameWrap>
          </FollowsWrap>
          {!member.reqSent && !member.inviteSent ? (
            <FollowButton onClick={() => inviteHandler(member._id)}>{t(`invite.invite`)}</FollowButton>
          ) : (
            <FollowedButton>{t(`invite.invited`)}</FollowedButton>
          )}
        </FollowingList>
      )
}
SingleItem.propTypes = {
    member:PropTypes.object,
    inviteHandler:PropTypes.func,
  }
export default SingleItem;
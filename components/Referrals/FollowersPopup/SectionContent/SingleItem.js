import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { getUserName } from '../../../../utilities/otherProfile';
import { isEmptyObj } from '../../../../utilities/checkEmptyObject';
import { useRouter } from 'next/router'

const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.grey {
    opacity: 0.7;
  }
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
  max-width: calc(100% - 35px);
  width: 100%;
`

const FollowingThumb = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  overflow: hidden;
  &.unverified {
    opacity: 0.5;
  }
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
`
const FollowsNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  max-width: calc(100% - 60px);
  width: 100%;
`

const FollowsName = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: normal;
  margin: 0 0 5px 0;
  word-break: break-word;
  color: #222;
  cursor: pointer;
  &.unverified {
    opacity: 0.5;
  }
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
  &.unverified {
    color: #cc0000;
  }
  @media (max-width: 767px) {
    font-size: 12px;
  }
`
const FollowButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
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
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
  @media (max-width: 479px) {
    margin-left: 0px;
    font-size: 13px;
    padding: 4px 8px;
  }
`

const FollowedButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 4px 15px;
  cursor: auto;
  display: flex;
  align-items: center;
  margin-left: 5px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    /* color: #fff;
    background: #222; */
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`
function SingleItem({
    follower,
    followUnfollowUser,
    userData,
    loggedInUsername,
    accountType,
}) {
  const { t } = useTranslation('referrals')
  const nameOfUser = getUserName(follower._id)
  const router = useRouter()


  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
  }


    return (
        <FollowingList key={follower._id._id}>
          <FollowsWrap>
            <FollowingThumb className={follower.confirmedStatus ? 'verified' : 'unverified'}>
              <img
                src={
                  follower._id.profilePicUrl
                    ?  createResizeImageUrl(follower._id.profilePicUrl, 50, 50, 'profileCover') +
                    '?' +
                    new Date(follower.dateUpdated).getTime()
                    : '/assets/artmo-default.png'
                }
                onClick={() => redirectToUserProfile(follower._id.username)}
                onError={(e) => {
                  const timeSuffix = '?' + new Date(follower._id.dateUpdated).getTime()
                  imageErrorHandler(
                    e,
                    createImageUrl(follower._id.profilePicUrl),
                    '/assets/artmo-default.png',
                    'profileCover',
                    timeSuffix
                  )
                }}

                alt=""
              />
            </FollowingThumb>
            <FollowsNameWrap>
              <FollowsName className={follower.confirmedStatus ? 'verified' : 'unverified'} onClick={() => redirectToUserProfile(follower._id.username)}>
                { nameOfUser }
              </FollowsName>
              <FollowersCount className={follower.confirmedStatus ? 'verified' : 'unverified'}>
                { follower.confirmedStatus ? t(`verified`) : t(`unverified`) }
              </FollowersCount>
            </FollowsNameWrap>
          </FollowsWrap>
        </FollowingList>
      )
}
SingleItem.propTypes = {
    follower: PropTypes.object,
  }
export default SingleItem;
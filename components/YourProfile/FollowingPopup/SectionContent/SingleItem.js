import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { getUserName } from '../../../../utilities/otherProfile';
import { isEmptyObj } from '../../../../utilities/checkEmptyObject';

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
  word-break: break-word;
  margin: 0 0 5px 0;
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
const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function SingleItem({
  follower,
  followUnfollowUser,
  redirectToUserProfile,
  userData,
  loggedInUsername,
  accountType,
}) {
  const { t } = useTranslation('profile')
  const nameOfUser = getUserName(follower)
  const [name, translateName] = useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(follower))
    translateName(nameOfUser)
  }, [nameOfUser])
    return (
      <FollowingList key={follower._id}>
        <FollowsWrap>
          <FollowingThumb>
            <img
              src={
                follower.profilePicUrl
                  ? createResizeImageUrl(follower.profilePicUrl, 50, 50, 'profileCover') +
                  '?' +
                  new Date(follower.dateUpdated).getTime()
                  : '/assets/artmo-default.png'
              }
              onClick={() => redirectToUserProfile(follower.username)}
              onError={(e) => {
                const timeSuffix = '?' + new Date(follower.dateUpdated).getTime()
                imageErrorHandler(
                  e,
                  createImageUrl(follower.profilePicUrl),
                  '/assets/artmo-default.png',
                  'profileCover',
                  timeSuffix
                )
              }}
              alt=""
            />
          </FollowingThumb>
          <FollowsNameWrap>
            <FollowsName onClick={() => redirectToUserProfile(follower.username)}>
            {name ? name : follower && nameOfUser }
            </FollowsName>
            <FollowersCount>
              {follower.followersCount}{' '}
              {follower.followersCount > 1
                ? t(`followingPopup.followerPlural`)
                : t(`followingPopup.follower`)}
            </FollowersCount>
          </FollowsNameWrap>
        </FollowsWrap>
        {accountType === 'personal' && (
          <>
            {follower.followed ? (
              <FollowButton onClick={() => followUnfollowUser(follower._id, 'unfollow', 'following')}>
                {t(`followingPopup.unfollow`)}
              </FollowButton>
            ) : !follower.followed && follower.username === loggedInUsername ? null : userData.userIdentity ===
              'authUser' ? (
                <FollowButton onClick={() => followUnfollowUser(follower._id, 'follow', 'following')}>
                  {t(`followingPopup.follow`)}
                </FollowButton>
              ) : null}
          </>
        )}
      </FollowingList>
    )
}
SingleItem.propTypes = {
    connection: PropTypes.object,
    addConnectionRequest: PropTypes.func,
    redirectToUserProfile: PropTypes.func,
    loggedInUsername: PropTypes.string,
    accountType: PropTypes.string,
  }
export default SingleItem;
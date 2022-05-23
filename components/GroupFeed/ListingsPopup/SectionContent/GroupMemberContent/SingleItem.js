import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HiDotsHorizontal } from 'react-icons/hi'
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
  a {
    cursor: pointer;
  }
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
  .adminModerators {
    font-size: 14px;
    color: #969696;
    @media (max-width: 767px) {
      font-size: 12px;
    }
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
  @media (max-width: 767px) {
    font-size: 12px;
  }
`
const MenuButton = styled.button`
  font-weight: bold;
  font-size: 20px;
  line-height: 18px;
  text-align: center;
  width: auto;
  border: 0;
  padding: 4px 10px;
  padding-right: 0;
  cursor: pointer;
  display: flex;
  color: black;
  align-items: center;
  margin-left: 5px;
  background-color: white;
  :active,
  :focus {
    outline: none;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
    padding-right: 0;
  }
`


function SingleItem({member,loggedInUserType, handleClick, loggedInUsername}) {
    const { t } = useTranslation(['groupsFeed', 'translation', 'successResponses'])

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
              <a onClick={() => router.push(`/user/${member.user.username}`)}>
                <img
                  src={
                    member.user.profilePicUrl
                      ? createResizeImageUrl(member.user.profilePicUrl, 50, 50, 'profileCover')
                      : '/assets/artmo-default.png'
                  }
                  onError={(e) => {
                    imageErrorHandler(
                      e,
                      createImageUrl(member.user.profilePicUrl),
                      '/assets/artmo-default.png',
                      'profileCover',
                      ''
                    )
                  }}
                  alt=""
                />
              </a>
            </FollowingThumb>
            <FollowsNameWrap>
              {member.user.firstName && member.user.lastName ? (
                <FollowsName onClick={() => router.push(`/user/${member.user.username}`)}>
                  {`${name ? name : member && member.user && getUserName(member.user) }`}
                  {member.isAdmin && <span className="adminModerators"> {t(`listingPopup.admin`)}</span>}
                  {member.isModerator && <span className="adminModerators"> {t(`listingPopup.moderator`)}</span>}
                </FollowsName>
              ) : (
                <FollowsName onClick={() => router.push(`/user/${member.user.username}`)}>
                   {`${name ? name : member && member.user && getUserName(member.user) }`}
                  {member.isAdmin && <span className="adminModerators"> {t(`listingPopup.admin`)}</span>}
                  {member.isModerator && <span className="adminModerators"> {t(`listingPopup.moderator`)}</span>}
                </FollowsName>
              )}
              <FollowersCount>
                {member.followerDetails && member.followerDetails.followersCount > 0
                  ? member.followerDetails.followersCount
                  : 0}{' '}
                {member.followerDetails &&
                member.followerDetails.followersCount &&
                member.followerDetails.followersCount === 1
                  ? t(`listingPopup.follower`)
                  : t(`listingPopup.followerPlural`)}
              </FollowersCount>
            </FollowsNameWrap>
          </FollowsWrap>
          {loggedInUserType === 'admin' && member.user.username !== loggedInUsername ? (
            <MenuButton>
              <HiDotsHorizontal onClick={(event) => handleClick(event, member)} />
            </MenuButton>
          ) : null}
        </FollowingList>
      )
}
SingleItem.propTypes = {
    member:PropTypes.object,
    loggedInUserType:PropTypes.string,
    handleClick:PropTypes.func,
    loggedInUsername:PropTypes.string,
  }
export default SingleItem;
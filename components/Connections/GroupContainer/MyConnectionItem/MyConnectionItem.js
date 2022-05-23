import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const FollowingList = styled.div`
  position: relative;
  margin: 0;
  border-bottom: 2px solid #eee;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  @media (max-width: 767px) {
    padding: 15px;
  }
  @media (max-width: 479px) {
    padding: 10px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
  max-width: calc(100% - 160px);
  width: 100%;
  @media (max-width: 479px) {
    max-width: 100%;
    margin-bottom: 10px;
  }
`

const FollowingThumb = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 10px 0 0;
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
  }
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
    @media (max-width: 767px) {
      width: 40px;
      height: 40px;
    }
  }
`
const FollowsNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 60px);
`

const FollowsName = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: normal;
  margin: 0 0 5px 0;
  color: #222;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  @media (max-width: 767px) {
    font-size: 14px;
  }
  @media (max-width: 479px) {
    font-size: 13px;
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
const DisconnectButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eee;
  }
  :disabled {
    pointer-events: none;
    opacity: 0.6;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

function MyConnectionItem({ item, redirectToUserProfile, disconnectFromUser }) {
  const { t } = useTranslation('connections')
  const nameOfUser = item.firstName && item.lastName ? `${item.firstName} ${item.lastName}` : item.username
  const [name, translateName] = useState(nameOfUser)

  useEffect(() => {
    if(!isEmptyObj(item))
    translateName(nameOfUser)
  }, [nameOfUser])
  return (
    <FollowingList key={item._id}>
      <FollowsWrap>
        <FollowingThumb>
          <img
            onClick={() => redirectToUserProfile(item.username)}
            src={
              item.profilePicUrl
                ? createResizeImageUrl(item.profilePicUrl, 50, 50, 'profileCover') +
                '?' +
                new Date(item.dateUpdated).getTime()
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(item.dateUpdated).getTime()
              imageErrorHandler(e, createImageUrl(item.profilePicUrl), '/assets/artmo-default.png', 'profileCover', timeSuffix)
            }}
            alt=""
          />
        </FollowingThumb>
        <FollowsNameWrap>
          <FollowsName onClick={() => redirectToUserProfile(item.username)}>{name?name: item && nameOfUser}</FollowsName>
          <FollowersCount>
            {item.followersCount}{' '}
            {item.followersCount > 1 ? t(`followerPlural`) : t(`follower`)}
          </FollowersCount>
        </FollowsNameWrap>
      </FollowsWrap>
      <DisconnectButton
        disabled={item.isDisconnected ? true : false}
        onClick={() => disconnectFromUser(item.username, item._id)}
      >
        {item.isDisconnected ? t(`disconnected`) : t(`disconnect`)}
      </DisconnectButton>
    </FollowingList>
  )
}
MyConnectionItem.propTypes = {
  item: PropTypes.object,
  redirectToUserProfile: PropTypes.func,
  disconnectFromUser: PropTypes.func,
}
export default MyConnectionItem

import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { getUserName } from '../../../../utilities/otherProfile'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
  max-width: calc(100% - 155px);
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
    connection,
    addConnectionRequest,
    redirectToUserProfile,
    loggedInUsername,
    accountType
}) {
  const { t } = useTranslation('profile')
  const nameOfUser = getUserName(connection)
  const [name, translateName] = useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(connection))
    translateName(nameOfUser)
  }, [nameOfUser])
    return (
        <FollowingList key={connection._id}>
          <FollowsWrap>
            <FollowingThumb>
              <img
                src={
                  connection.profilePicUrl
                    ?  createResizeImageUrl(connection.profilePicUrl, 50, 50, 'profileCover') +
                    '?' +
                    new Date(connection.dateUpdated).getTime()
                    : '/assets/artmo-default.png'
                }
                onError={(e) => {
                  const timeSuffix = '?' + new Date(connection.dateUpdated).getTime()
                  imageErrorHandler(
                    e,
                    createImageUrl(connection.profilePicUrl),
                    '/assets/artmo-default.png',
                    'profileCover',
                    timeSuffix
                  )
                }}
                onClick={() => redirectToUserProfile(connection.username)}
                alt=""
              />
            </FollowingThumb>
            <FollowsNameWrap>
              <FollowsName onClick={() => redirectToUserProfile(connection.username)}>
              {name ? name : connection && nameOfUser }
              </FollowsName>
              <FollowersCount>
                {connection.followersCount}{' '}
                {connection.followersCount > 1
                  ? t(`connectionsPopup.followerPlural`)
                  : t(`connectionsPopup.follower`)}
              </FollowersCount>
            </FollowsNameWrap>
          </FollowsWrap>
          {accountType === 'personal' && (
            <>
              {connection.username === loggedInUsername ? null : connection.haveConnection === 'true' ? (
                <FollowedButton>{t(`connectionsPopup.connected`)}</FollowedButton>
              ) : connection.haveConnection === 'false' && connection.havePendingRequest === 'true' ? (
                <FollowedButton>{t(`connectionsPopup.requestPending`)}</FollowedButton>
              ) : connection.haveConnection === 'false' && connection.haveSentRequest === 'true' ? (
                <FollowedButton>{t(`connectionsPopup.requestSent`)}</FollowedButton>
              ) : connection.haveConnection === 'false' &&
                connection.havePendingRequest === 'false' &&
                connection.haveSentRequest === 'false' ? (
                  <>
                    <FollowButton onClick={() => addConnectionRequest(connection.username)}>
                      {t(`connectionsPopup.connect`)}
                    </FollowButton>
                  </>
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
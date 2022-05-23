import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import ArtworkImage from '../ArtworkImage'
import ArtworkCoverImg from '../ArtworkCoverImg'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { checkOtherUser } from '../../../../utilities/otherProfile'
import useTranslateContent from '../../../../hooks/useTranslateContent'

const ArtworkWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0 28px;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  .defaultText {
    color: #666;
    font-style: normal;
    display: flex;
    justify-content: center;
  }
`

const ProfileName = styled.h1`
  margin: 15px 0 10px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 20px;
  text-align: center;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  cursor: pointer;
`

const ProfileFollows = styled.div`
  margin: 0 0 15px;
  padding: 0;
  color: #666;
  line-height: normal;
  font-size: 14px;
  text-align: center;
`

const TopButtons = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  justify-content: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eee;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

function SingleArtwork({ page, redirectToPageProfile, switchToPageHandler, username }) {
  const { t } = useTranslation('newsFeed')
  const [pageName, translatePageName] =useTranslateContent('')

  useEffect(() => {
    if (page.pageUserId.firstName) translatePageName(page.pageUserId.firstName)
  }, [page.pageUserId.firstName])
  return (
    <>
      <ArtworkWrap>
        <ArtworkCoverImg userPageDetails={page} />
        <ArtworkImage
          userPageDetails={page}
          redirectToPageProfile={redirectToPageProfile}
          username={page.pageUserId.username}
        />
        {!isEmptyObj(page) ? (
          <>
           { page && page.pageUserId && page.pageUserId.firstName && <ProfileName onClick={() => redirectToPageProfile(page.pageUserId.username)}>{pageName ? pageName : page.pageUserId.firstName}</ProfileName>}
            <ProfileFollows>
              {page.followerDetails && page.followerDetails.followersCount > 0
                ? page.followerDetails.followersCount
                : 0}{' '}
              {page.followerDetails && page.followerDetails.followersCount && page.followerDetails.followersCount > 1
                ? t(`manageArtwork.followerPlural`)
                : t(`manageArtwork.follower`)}
            </ProfileFollows>
            <TopButtons
              onClick={() =>
                checkOtherUser(username)
                  ? redirectToPageProfile(page.pageUserId.username)
                  : switchToPageHandler(page.pageUserId._id)
              }
            >
              <span>
                {checkOtherUser(username) ? t(`manageArtwork.visit`) : t(`manageArtwork.manage`)}
                {pageName}
              </span>
            </TopButtons>
          </>
        ) : (
          <span className="defaultText">{t(`manageArtwork.noPageFound`)}</span>
        )}
      </ArtworkWrap>
    </>
  )
}
SingleArtwork.propTypes = {
  page: PropTypes.object,
  redirectToPageProfile: PropTypes.func,
  switchToPageHandler: PropTypes.func,
  username: PropTypes.string,
}
export default SingleArtwork

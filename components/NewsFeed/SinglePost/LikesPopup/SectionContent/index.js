import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  border-top: 1px solid #eee;
  padding: 10px 15px;
  max-height: 220px;
  overflow: auto;
  overflow-x: hidden;
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 200px;
  }
  @media (max-width: 479px) {
    padding: 10px;
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
  margin: 0 0 5px 0;
  color: #222;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const SectionContent = ({ likesData, redirectToUserProfile }) => (
  <>
    <SectionContentWrap>
      {likesData.map((like) => (
        <FollowingList key={like._id}>
          <FollowsWrap>
          <FollowingThumb>
              <img
                src={
                  like.profilePicUrl
                    ? createResizeImageUrl(like.profilePicUrl, 50, 50, 'profileCover') +
                    '?' +
                    new Date(like.dateUpdated).getTime()
                    : '/assets/artmo-default.png'
                }
                onError={(e) => {
                  const timeSuffix = '?' + new Date(like.dateUpdated).getTime()
                  imageErrorHandler(e, createImageUrl(like.profilePicUrl), '/public/assets/artmo-default.png', 'profileCover', timeSuffix)
                }}
                onClick={() => redirectToUserProfile(like.username)}
                alt=""
              />
            </FollowingThumb>
            <FollowsNameWrap>
              <FollowsName onClick={() => redirectToUserProfile(like.username)}>
                {like.firstName && like.lastName
                  ? `${like.firstName} ${like.lastName}`
                  : like.firstName
                    ? like.firstName
                    : like.username}
              </FollowsName>
            </FollowsNameWrap>
          </FollowsWrap>
        </FollowingList>
      ))}
    </SectionContentWrap>
  </>
)
SectionContent.propTypes = {
  likesData: PropTypes.array,
  redirectToUserProfile: PropTypes.func,
}
export default SectionContent

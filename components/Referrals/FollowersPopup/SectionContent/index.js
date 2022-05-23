import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import SingleItem from './SingleItem'
import { getFollowersFollowing, setFollowLoader } from '../../../../modules/profile/myProfileSlice'
import GhostLoader from '../../../UI/GhostLoader'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  border-top: 1px solid #eee;
  padding: 10px 15px;
  max-height: 400px;
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
const SectionContent = ({
  followUnfollowUser,
  redirectToUserProfile,
  userData,
  loggedInUsername,
  accountType,
  referrals,
}) => {
  const { t } = useTranslation('profile')

  const dispatch=useDispatch()
  const [hasMore, setHasMore] = useState(true)
  const followers = useSelector((state) => state.root.myProfile.followers)
  const followLoader = useSelector((state) => state.root.myProfile.followLoader)

  return (
    <>
      <SectionContentWrap id="follower" >
        <>
         {referrals.map((follower,ind) => 
            <SingleItem
              key={ind}
              follower={follower}
              followUnfollowUser={followUnfollowUser}
              redirectToUserProfile={redirectToUserProfile}
              userData={userData}
              loggedInUsername={loggedInUsername}
              accountType={accountType}
          /> )}
        </>
        {!followLoader && followers.length < 1 && <FollowingList> {t(`followersPopup.noFollowers`)}</FollowingList>}
      </SectionContentWrap>
    </>
  )
}
SectionContent.propTypes = {
  followUnfollowUser: PropTypes.func.isRequired,
  redirectToUserProfile: PropTypes.func,
  userData: PropTypes.object,
  loggedInUsername: PropTypes.string,
  accountType: PropTypes.string,
  referrals: PropTypes.object,
}
export default SectionContent
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import SingleItem from './SingleItem'
import GhostLoader from '../../../UI/GhostLoader'
import { getFollowersFollowing, setFollowLoader } from '../../../../modules/profile/myProfileSlice'

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



const SectionContent = ({
  followUnfollowUser,
  redirectToUserProfile,
  userData,
  loggedInUsername,
  accountType,
}) => {
  const { t } = useTranslation('profile')
  
  const dispatch=useDispatch()
  const [hasMore, setHasMore] = useState(true)
  const following = useSelector((state) => state.root.myProfile.following)
  const followingMetadata=useSelector((state) => state.root.myProfile.followingMetadata)
  const followLoader = useSelector((state) => state.root.myProfile.followLoader)

  useEffect(() => {
    return () => {
        dispatch(setFollowLoader(true))
    };
  }, []);

    /**method to fetch more connections once user reaches bottom of div */
    const fetchData = async () => {
      if (following.length < followingMetadata) {
        const limit=10
        const offset=following.length
        dispatch(getFollowersFollowing(following.length,limit,'following',t))
      } else setHasMore(false)
    }
  return (
    <>
      <SectionContentWrap id="following" >
      {followLoader ? (
        <GhostLoader notification />
      ) : (
        <>
          {following && following.length > 0 &&
            <InfiniteScroll
              scrollableTarget={'following'}
              dataLength={following.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<GhostLoader notification />}
            >
              {following.map((follower, ind) => (
             <SingleItem
                key={ind}
                follower={follower}
                followUnfollowUser={followUnfollowUser}
                redirectToUserProfile={redirectToUserProfile}
                userData={userData}
                loggedInUsername={loggedInUsername}
                accountType={accountType}
              /> 
              ))}
            </InfiniteScroll>}
        </>
      )}
        {!followLoader && following.length < 1 && <FollowingList> {t(`followingPopup.noFollowing`)}</FollowingList>}
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
}

export default SectionContent
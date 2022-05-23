import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import SinglePost from '../../NewsFeed/SinglePost'
import CreatePost from '../CreatePost'
import { fetchGroupFeeds } from '../../../modules/groups/groupsSlice'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'

const SubRightBar = styled.div`
  width: 100%;
  position: relative;
  max-width: 600px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 420px;
  }
  @media (max-width: 500px) {
    max-width: 100%;
  }
  span {
    &.ErrMsg {
      font-style: normal;
      color: #d62d1e;
      font-size: 16px;
    }
  }
`
const SubRightSection = () => {
  const { t } = useTranslation('groupsFeed')

  const dispatch = useDispatch()
  const groupFeeds = useSelector((state) => state.root.groups.groupFeeds)
  const groupFeedsCount = useSelector((state) => state.root.groups.groupFeedsCount)
  const loading = useSelector((state) => state.root.groups.groupFeedsLoader)
  const loggedInUserType = useSelector((state) => state.root.groups.loggedInUserType)
  const notAuthorisedErr = useSelector((state) => state.root.groups.notAuthorisedErr)

  const [hasMore, setHasMore] = useState(true)
  const router = useRouter()
  const { groupId } = router.query
  const sortingTypes = ['latest', 'moderated']

  useEffect(() => {
    if (groupId) {
      dispatch(fetchGroupFeeds(groupId, 0, sortingTypes[1]))
    }
    // eslint-disable-next-line
  }, [dispatch, groupId])

  /**
   * @description:This function will be called once user reaches bottom of the page and there are more posts to show
   */
  const fetchData = () => {
    if (groupFeeds.length < groupFeedsCount) {
      dispatch(fetchGroupFeeds(groupId, groupFeeds.length, sortingTypes[1]))
    } else setHasMore(false)
  }

  /**
   * Once groupFeeds array is populated, then render the component
   */
  if (loading) {
    return (
      <>
        {' '}
        <SubRightBar>
          {loggedInUserType !== 'guest' && !notAuthorisedErr && <CreatePost />}
          <GhostLoader />
        </SubRightBar>
      </>
    )
  } else
    return (
      <SubRightBar>
        {loggedInUserType !== 'guest' && !notAuthorisedErr && <CreatePost />}
        {groupFeeds && !notAuthorisedErr && groupFeeds.length > 0 ? (
          <InfiniteScroll
            //scrollableTarget="root"
            dataLength={groupFeeds.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<GhostLoader />}
            endMessage={groupFeeds && groupFeeds.length > 3 && <EndMessage postFetch={true} />}
          >
            {groupFeeds &&
              groupFeeds.map((item) => (
                <SinglePost postType="groupfeed" key={item._id} item={item} groupLoggedInUserType={loggedInUserType} />
              ))}
          </InfiniteScroll>
        ) : (
          groupFeeds && !notAuthorisedErr && <EndMessage postFetch={false} />
        )}
        {notAuthorisedErr && <span className="ErrMsg">{t(`notAuthorized`)}</span>}
      </SubRightBar>
    )
}

export default SubRightSection

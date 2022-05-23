import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { VscChromeClose } from 'react-icons/vsc'
import { useTranslation } from 'next-i18next'
import { userFeeds } from '../../../modules/newsFeed/newsFeedSlice'
import { checkOtherUser } from '../../../utilities/otherProfile'
import AddContent from '../AddContent'
import SinglePost from '../SinglePost'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'


const CenterContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 750px;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 650px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 575px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 450px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
  @media (max-width: 1279px) {
    margin: 0 15px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 70%;
    margin: 0;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    max-width: 67%;
    margin-right: 0;
  }
  @media (max-width: 599px) {
    max-width: 100%;
    margin: 0 0 100px;
  }
`

const RefreshOverlay = styled.div`
  width: 100%;
  max-width: 607px;
  position: fixed;
  padding: 15px 0;
  background-color: #eee;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #ccc;
  svg {
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
  }
  a {
    padding-left: 5px;
    cursor: pointer;
    text-decoration: underline;
  }
  @media (max-width: 991px) {
    padding: 15px 0px;
    margin-left: -150px;
    left: 50%;
    top: 80px;
    width: 300px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    top: 100px;
  }
  /* @media (min-width: 768px) and (max-width: 991px) {
    width: 64%;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 660px;
    width: 100%;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    width: calc(100% - 30%);
    max-width: 540px;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    width: calc(100% - 36%);
    max-width: 540px;
  } */
`

const CenterSection = ({ showRefreshOverlay, setShowRefreshOverlay }) => {
  const { t } = useTranslation('newsFeed')

  const dispatch = useDispatch()
  const router = useRouter()

  const [addAlbumModal, setAddAlbumModal] = useState(false)
  const [addPostModal, setAddPostModal] = useState(false)
  const [addVideoModal, setAddVideoModal] = useState(false)

  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState('')

  const userFeed = useSelector((state) => state.root.newsFeed.newsFeeds)
  const newsFeedCount = useSelector((state) => state.root.newsFeed.newsFeedCount)
  const loading = useSelector((state) => state.root.newsFeed.loader)
  const [hasMore, setHasMore] = useState(true)
  const { username, activityType } = router.query
  const validTypes = ['posts', 'videos', 'albums']

  const getFeedType = () => {
    let type = ''
    if (validTypes.includes(activityType)) {
      if (activityType === 'posts') {
        type = 'userPosts'
      } else {
        type = activityType
      }
    }
    return type
  }

  useEffect(() => {
    const feedType = getFeedType()
    if(username)
      dispatch(userFeeds(0, username, feedType))
    // eslint-disable-next-line
  }, [dispatch, username, activityType])

  /**
   * @description:This function will be called once user reaches bottom of the page and there are more posts to show
   */
  const fetchData = () => {
    if (userFeed.length < newsFeedCount) {
      const feedType = getFeedType()
      if(username)
        dispatch(userFeeds(userFeed.length, username, feedType))
    } else setHasMore(false)
  }

  /**
   * Method to handle refresh button click on refresh overlay
   */
  const refreshHandler = () => {
    if(process.browser)
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    if (activityType) {
      router.push(`/user/${username}/activity`)
    } else {
      const feedType = getFeedType()
      if(username)
        dispatch(userFeeds(0, username, feedType))
    }
    setShowRefreshOverlay(false)
  }

  /**
   * Once userFeed array is populated, then render the component
   */
  if (loading) {
    return (
      <>
        {' '}
        <CenterContainer>
          <AddContent />
          <GhostLoader />
        </CenterContainer>
      </>
    )
  } else
    return (
      <CenterContainer>
        {showRefreshOverlay && (
          <RefreshOverlay>
            <VscChromeClose onClick={() => setShowRefreshOverlay(false)} />
            <div>
              {t(`refreshOverlay.newActivityAdded`)}
              <a onClick={() => refreshHandler()}>{t(`refreshOverlay.refresh`)}</a>
            </div>
          </RefreshOverlay>
        )}
        {!checkOtherUser(username) 
        && <AddContent
            editData={editData}
            editType={editType}
            setEditType={setEditType}
            setEditData={setEditData}
            addAlbumModal={addAlbumModal}
            setAddAlbumModal={setAddAlbumModal}
            addPostModal={addPostModal}
            setAddPostModal={setAddPostModal}
            addVideoModal={addVideoModal}
            setAddVideoModal={setAddVideoModal}
            />}
        {userFeed && userFeed.length > 0 ? (
          <InfiniteScroll
            //scrollableTarget="root"
            style={{ overflow: 'visible',  }} //To put endMessage and loader to the top.
            dataLength={userFeed.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<GhostLoader />}
            endMessage={userFeed && userFeed.length > 5 && <EndMessage postFetch={true} />}
          >
            {userFeed &&
              userFeed.map((item, index) => item !== null && 
              <SinglePost
              setEditData={setEditData}
              setEditType={setEditType}
              setAddPostModal={setAddPostModal}
              setAddVideoModal={setAddVideoModal}
              setAddAlbumModal={setAddAlbumModal}
              postType="newsfeed"
              key={item._id}
              index={index}
              item={item}
              />)}
          </InfiniteScroll>
        ) : (
          userFeed && <EndMessage postFetch={false} />
        )}
      </CenterContainer>
    )
}

CenterSection.propTypes = {
  showRefreshOverlay: PropTypes.bool,
  setShowRefreshOverlay: PropTypes.func,
}

export default CenterSection

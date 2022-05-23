import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { setMyArticlesListLoader, getMyArticles } from '../../../modules/articlePages/articlePagesSlice'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import ListingContent from './ListingContent'


const InviteContentWrapper = styled.div`
  position: relative;
  margin: 14px 0 17px;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const UserListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .infinite-scroll-component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    margin: 0 auto;
  }
`

const GhostStyling = styled.div`
  position: relative;
  max-width: 429px;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 30px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 30px;
  }
`

const SectionContent = ({ setRightSection }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const myArticlesList = useSelector((state) => state.root.articlePages.myArticlesList)
  const myArticlesListCount = useSelector((state) => state.root.articlePages.myArticlesListCount)
  const loading = useSelector((state) => state.root.articlePages.myArticlesListLoader)

  const [hasMore, setHasMore] = useState(true)

  const myArticlesLimit = 20

  useEffect(() => {
    dispatch(setMyArticlesListLoader(true))
    dispatch(getMyArticles(myArticlesLimit, 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  /**
   * @description:This function will be called once user reaches bottom of the page and there are more posts to show
   */
  const fetchData = () => {
    setHasMore(true)
    if (myArticlesList.length < myArticlesListCount) {
      dispatch(getMyArticles(myArticlesLimit, myArticlesList.length))
    } else {
      if (process.browser && window.innerWidth < 1001) {
        setRightSection(true)
      }
      setHasMore(false)
    }
  }

  const redirectHandler = (route,e) => {
    e.stopPropagation()
    router.push(route)
  }

  useEffect(() => {
    if (
      process.browser && 
      window.innerWidth < 1000 &&
      !loading &&
      myArticlesList &&
      (myArticlesList.length === 0 || (myArticlesListCount && myArticlesListCount < 3))
    ) {
      setRightSection(true)
      setHasMore(false)
    }
  }, [setRightSection, myArticlesList, loading, myArticlesListCount])

  return (
    <>
      <InviteContentWrapper>
        {loading ? (
          <InviteContentWrapper>
            <UserListingWrap>
              <>
                <GhostStyling>
                  <GhostLoader articleFetch />
                </GhostStyling>
                <GhostStyling>
                  <GhostLoader articleFetch />
                </GhostStyling>
              </>
            </UserListingWrap>
          </InviteContentWrapper>
        ) : (
          <UserListingWrap>
            {myArticlesList && myArticlesList.length > 0 ? (
              <InfiniteScroll
               // scrollableTarget="root"
                dataLength={myArticlesList.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  <>
                    <GhostStyling>
                      <GhostLoader articleFetch />
                    </GhostStyling>
                    <GhostStyling>
                      <GhostLoader articleFetch />
                    </GhostStyling>
                  </>
                }
                endMessage={<></>}
              >
                {myArticlesList &&
                  myArticlesList.map((article) => (
                    <ListingContent
                      key={article._id}
                      type={article && article.onModel.slice(0, -1)}
                      article={article}
                      redirectHandler={redirectHandler}
                    />
                  ))}
              </InfiniteScroll>
            ) : (
              myArticlesList && <EndMessage postFetch={false} type="articles" />
            )}
          </UserListingWrap>
        )}
        {!hasMore && myArticlesList && myArticlesList.length > 10 && <EndMessage postFetch={true} type="articles" />}
      </InviteContentWrapper>
    </>
  )
}
SectionContent.propTypes = {
  setRightSection: PropTypes.func,
}
export default SectionContent

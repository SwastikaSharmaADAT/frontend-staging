import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import SingleItem from './SingleItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import GhostLoader from '../../../UI/GhostLoader'
import { getUserConnections } from '../../../../modules/profile/myProfileSlice'

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


const SectionContent = ({
  addConnectionRequest,
  redirectToUserProfile,
  loggedInUsername,
  accountType,
}) => {
  const dispatch=useDispatch()
  const [hasMore, setHasMore] = useState(true)
  const connections = useSelector((state) => state.root.myProfile.connections)
  const connectionsMetadata=useSelector((state) => state.root.myProfile.connectionsMetadata)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const connectionsLoader = useSelector((state) => state.root.myProfile.connectionsLoader)

    /**method to fetch more connections once user reaches bottom of div */
    const fetchData = async () => {
      if (connections.length < connectionsMetadata) {
        dispatch(getUserConnections({ username:userDataState.username,offset: connections.length,limit:10}))
      } else setHasMore(false)
    }
  return (
    <>
      <SectionContentWrap  id="connections"> 
      {connectionsLoader ? (
        <GhostLoader notification />
      ) : (
        <>
          {connections && connections.length > 0 && 
            <InfiniteScroll
              scrollableTarget={'connections'}
              dataLength={connections.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<GhostLoader notification />}
            >
              {connections.map((connection, ind) => (
               <SingleItem
                  key={ind}
                  addConnectionRequest={addConnectionRequest}
                  redirectToUserProfile={redirectToUserProfile}
                  loggedInUsername={loggedInUsername}
                  accountType={accountType}
                  connection={connection}
               />
              ))}
            </InfiniteScroll>
            }
        </>
      )}
      </SectionContentWrap>
    </>
  )
}

SectionContent.propTypes = {
  addConnectionRequest: PropTypes.func,
  redirectToUserProfile: PropTypes.func,
  loggedInUsername: PropTypes.string,
  accountType: PropTypes.string,
}

export default SectionContent
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import {
  viewUserConnections,
  disconnectUser,
  deleteRequest,
  updatePendingRequest,
} from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import MyConnectionItem from './MyConnectionItem/MyConnectionItem'
import ConnectionRequestItem from './ConnectionRequestItem/ConnectionRequestItem'
import ConnectionRequestSentItem from './ConnectionRequestSentItem/ConnectionRequestSentItem'


const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  height: 580px ;
  background: #fff ;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  // @media( max-width: 767px ) {
  //   margin-bottom: 160px;
  // }
  .MuiTabs-flexContainer {
    @media (max-width: 479px) {
      flex-direction: column;
    }
  }
  .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
    margin-bottom: 0;
    order: 2;
  }
  .TabsContentDiv {
    background: #fff;
  }
  .MuiAppBar-colorPrimary {
    box-shadow: none !important;
    background: transparent;
  }
  .MuiTabs-indicator {
    display: none !important;
  }
  .Mui-selected {
    background: #fff;
  }
  .MuiButtonBase-root.MuiTab-root {
    opacity: 1;
    min-height: 56px;
    @media (max-width: 991px) and (orientation: landscape) {
      font-size: 12px;
      padding: 6px 8px;
    }
  }
  .MuiButtonBase-root .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
    font-family: 'Montserrat-Medium';
    color: #000;
  }
  .MuiTab-root {
    text-transform: capitalize;
  }
  .Mui-selected {
    .Count {
      background-color: #aaa;
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const LoadMoreDiv = styled.div`
  position: relative;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
`

const DefaultMsgDiv = styled.div`
  position: relative;
  margin: 0;
  padding: 20px;
  display: flex;
  color: #666;
  font-style: normal;
  justify-content: center;
  align-items: center;
  background: #fff;
`
const LoadMoreBtn = styled.button`
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
  :hover,
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`
const TabPanelContent = styled.div`
  max-height: 475px ;
  overflow-y: auto ;
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#eeeeee',
    
  },
  Count: {
    backgroundColor: '#D62D1E',
    fontSize: '15px',
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    width: '50px',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '0 0 0 10px',
  },
  grey: {
    backgroundColor: '#AAA',
    width: '50px'
  },
  HeaderTabs: {
    flexGrow: 1,
    backgroundColor: '#eee',
    boxShadow: 'none',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    color: '#222',
  },
  panel: {
    // maxHeight: '1012px',
    // overflowY: 'auto',
  },
}))

const GroupContainer = () => {
  const { t } = useTranslation(['connections','translation','successResponses'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [value, setValue] = React.useState(0)
  const [ connectionLoadMoreClicked, setConnectionLoadMoreClicked] = useState(false)
  const [ connectionRequestLoadMoreClicked, setConnectionRequestLoadMoreClicked] = useState(false)
  const [ receivedRequestLoadMoreClicked, setreceivedRequestLoadMoreClicked] = useState(false)

  const myConnections = useSelector((state) => state.root.myProfile.myConnections)
  const connectionRequests = useSelector((state) => state.root.myProfile.connectionRequests)
  const connectionRequestsSent = useSelector((state) => state.root.myProfile.connectionRequestsSent)
  const connectionsCount = useSelector((state) => state.root.myProfile.connectionsCount)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    dispatch(viewUserConnections('my_connections', 0,t))
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue === 0) {
      dispatch(viewUserConnections('my_connections', 0,t))
      setConnectionLoadMoreClicked( false )
      setreceivedRequestLoadMoreClicked(false)
      setConnectionRequestLoadMoreClicked( false )
    } else if (newValue === 1) {
      dispatch(viewUserConnections('received_requests', 0,t))
      setConnectionLoadMoreClicked( false )
      setreceivedRequestLoadMoreClicked(false)
      setConnectionRequestLoadMoreClicked( false )
    } else if (newValue === 2) {
      dispatch(viewUserConnections('sent_requests', 0,t))
      setConnectionLoadMoreClicked( false )
      setreceivedRequestLoadMoreClicked(false)
      setConnectionRequestLoadMoreClicked( false )
    }
  }

  const getCount = (index) => {
    if (index === 0) {
      return !isEmptyObj(connectionsCount) && connectionsCount.userConnections ? connectionsCount.userConnections : 0
    } else if (index === 1) {
      return !isEmptyObj(connectionsCount) && connectionsCount.userPendingRequests
        ? connectionsCount.userPendingRequests
        : 0
    } else if (index === 2) {
      return !isEmptyObj(connectionsCount) && connectionsCount.userSentRequests ? connectionsCount.userSentRequests : 0
    }
  }

  const disconnectFromUser = (username, id) => {
    dispatch(disconnectUser(username, id,t))
  }

  const deleteConnectionRequest = (username, id) => {
    dispatch(deleteRequest(username, id,t))
  }

  const updateConnectionRequest = (username, id, type) => {
    dispatch(updatePendingRequest(username, id, type,t))
  }

  const checkLoadMore = (type) => {
    if (type === 'my_connections') {
      const totalCount = connectionsCount.userConnections
      const currentCount = myConnections.users.length
      if ( totalCount > 10  ) {
        return currentCount < totalCount ? true : false
      } else if ( totalCount > 5 && totalCount < 10 ) {
        return connectionLoadMoreClicked ? false : true 
      } else {
        return false 
      }
    } else if (type === 'received_requests') {
      const totalCount = connectionsCount.userPendingRequests
      const currentCount = connectionRequests.users.length
      if ( totalCount > 10  ) {
        return currentCount < totalCount ? true : false
      } else if ( totalCount > 5 && totalCount < 10 ) {
        return receivedRequestLoadMoreClicked ? false : true 
      } else {
        return false 
      }
    } else if (type === 'sent_requests') {
      const totalCount = connectionsCount.userSentRequests
      const currentCount = connectionRequestsSent.users.length
      if ( totalCount > 10  ) {
        return currentCount < totalCount ? true : false
      } else if ( totalCount > 5 && totalCount < 10 ) {
        return connectionRequestLoadMoreClicked ? false : true 
      } else {
        return false 
      }
    }
  }

  const loadMoreRecords = (type, offset) => {
    dispatch(viewUserConnections(type, offset,t))
  }

  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
  }

  const ConnectionsLoadMoreRecordsHadler = () => {
    loadMoreRecords('my_connections', myConnections.users.length)
    setConnectionLoadMoreClicked( true )
  }
  const ReceivedRequestLoadMoreHandler = () => {
    loadMoreRecords('received_requests', connectionRequests.users.length)
    setreceivedRequestLoadMoreClicked(true)
  }
  const ConnectionsRequestLoadMoreHandler = () => {
    loadMoreRecords('sent_requests', connectionRequestsSent.users.length)
    setConnectionRequestLoadMoreClicked( true )
  }

  return (
    <>
      <TabsContainer className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              className={classes.HeaderTabs}
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label=""
            >
              <Tab
                label={t(`myConnectionsLabel`)}
                {...a11yProps(0)}
                icon={<span className={`${classes.Count} ${classes.grey}`}>{getCount(0)}</span>}
              />
              <Tab
                label={t(`connectionRequests`)}
                {...a11yProps(1)}
                icon={
                  <span className={getCount(1) > 0 ? `${classes.Count}` : `${classes.Count} ${classes.grey}`}>
                    {getCount(1)}
                  </span>
                }
              />
              <Tab
                label={t(`connectionRequestsSent`)}
                {...a11yProps(2)}
                icon={<span className={`${classes.Count} ${classes.grey}`}>{getCount(2)}</span>}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0} className={classes.panel}>
            {!isEmptyObj(myConnections) && myConnections.users && myConnections.users.length > 0 ? (
              <>
                <TabPanelContent>
                {
                  connectionLoadMoreClicked ? 
                    (
                      myConnections.users.map((item) => (
                        <MyConnectionItem
                          key={item._id}
                          item={item}
                          disconnectFromUser={disconnectFromUser}
                          redirectToUserProfile={redirectToUserProfile}
                        />
                      ))
                    ) 
                  : 
                    (
                      myConnections.users.slice(0, 5).map((item) => (
                        <MyConnectionItem
                          key={item._id}
                          item={item}
                          disconnectFromUser={disconnectFromUser}
                          redirectToUserProfile={redirectToUserProfile}
                        />
                      ))
                    )
                }
                </TabPanelContent>
                {checkLoadMore('my_connections') && (
                  <LoadMoreDiv>
                    <LoadMoreBtn onClick={ConnectionsLoadMoreRecordsHadler}>
                      {t(`loadMore`)}
                    </LoadMoreBtn>
                  </LoadMoreDiv>
                )}
              </>
            ) : (
              <DefaultMsgDiv> {t(`noConnections`)}</DefaultMsgDiv>
            )}
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.panel}>
            {!isEmptyObj(connectionRequests) && connectionRequests.users && connectionRequests.users.length > 0 ? (
              <>
                <TabPanelContent>
                  {
                    receivedRequestLoadMoreClicked ? 
                      ( connectionRequests.users.map((item) => (
                        <ConnectionRequestItem item={item} key={item._id} updateConnectionRequest={updateConnectionRequest} redirectToUserProfile={redirectToUserProfile} />
                      )) ) 
                    : 
                      ( connectionRequests.users.slice(0, 5).map((item) => (
                        <ConnectionRequestItem item={item} key={item._id} updateConnectionRequest={updateConnectionRequest} redirectToUserProfile={redirectToUserProfile} />
                      )) )
                  }
                </TabPanelContent>
                {checkLoadMore('received_requests') && (
                  <LoadMoreDiv>
                    <LoadMoreBtn onClick={ReceivedRequestLoadMoreHandler}>
                      {t(`loadMore`)}
                    </LoadMoreBtn>
                  </LoadMoreDiv>
                )}
              </>
            ) : (
              <DefaultMsgDiv>{t(`noConnectionRequestsReceived`)}</DefaultMsgDiv>
            )}
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.panel}>
            {!isEmptyObj(connectionRequestsSent) &&
            connectionRequestsSent.users &&
            connectionRequestsSent.users.length > 0 ? (
                <>
                  <TabPanelContent>
                    {
                      connectionRequestLoadMoreClicked ? 
                        ( connectionRequestsSent.users.map((item) => (
                          <ConnectionRequestSentItem
                            item={item}
                            redirectToUserProfile={redirectToUserProfile}
                            deleteConnectionRequest={deleteConnectionRequest}
                            key={item._id}
                          />
                        )) ) 
                      : 
                        ( connectionRequestsSent.users.slice(0,5).map((item) => (
                          <ConnectionRequestSentItem
                            item={item}
                            redirectToUserProfile={redirectToUserProfile}
                            deleteConnectionRequest={deleteConnectionRequest}
                            key={item._id}
                          />
                        )) )
                    }
                  
                  </TabPanelContent>
                  {checkLoadMore('sent_requests') && (
                    <LoadMoreDiv>
                      <LoadMoreBtn onClick={ConnectionsRequestLoadMoreHandler}>
                        {t(`loadMore`)}
                      </LoadMoreBtn>
                    </LoadMoreDiv>
                  )}
                </>
              ) : (
                <DefaultMsgDiv>{t(`noConnectionRequestsSent`)}</DefaultMsgDiv>
              )}
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

export default GroupContainer

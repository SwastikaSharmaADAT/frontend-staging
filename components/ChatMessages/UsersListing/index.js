import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  getListConversations,
  populateChatBox,
  getConversationDetails,
  readChat,
  newMessage,
  contactsToggler,
  fetchConversations,
} from '../../../modules/messages/messagesSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import GhostLoader from '../../UI/GhostLoader'
import { toggleLoading } from '../../../modules/auth/authSlice'
import SingleUser from './SingleUser/SingleUser'
import { useTranslation } from 'next-i18next'


const ListingWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 20px 0;
  width: 100%;
  background: #fff;
  max-width: 186px;
  height: 587px;
  height: 590px !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  flex: 1 ;
  &#chat-users {
    @media (max-width: 767px) {
      // height: auto !important;
      // max-height: 123px;
      min-width: 100%;
      overflow-y: auto;
      overflow-y: hidden;
    }
  }
  .infinite-scroll-component {
  }
  @media (max-width: 767px) {
    max-width: 100%;
    width: auto;
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      :hover {
        background: #eee;
      }
    }
  }
`

const UsersContent = styled.div`
  position: relative;
  width: 85%;
  margin: 0px;
  display: flex;
  color: #222;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  background-color: ${(props) => (props.selected ? '#eee' : '#fff')};
  @media (min-width: 1025px) and (max-width: 1259px) {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    margin: 0;
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
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

const UsersListing = ({ setMessage, setMobileMsgOpen }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const params = router.query
  const toMessage = params.userId
  const {t} = useTranslation('translation')


  const socketObj = useSelector((state) => state.root.socket.socketObj)

  const apiFetch = useSelector((state) => state.root.messages.apiFetch)
  const conversations = useSelector((state) => state.root.messages.listConversations)
  const conversationLoader = useSelector((state) => state.root.messages.conversationLoader)
  const conversationMetadata = useSelector((state) => state.root.messages.conversationMetadata)
  const fetch = useSelector((state) => state.root.messages.fetch)
  const uuid = useSelector((state) => state.root.myProfile.userData.uuid)
  const contactToggle = useSelector((state) => state.root.messages.contactToggle)
  const [hasMore, setHasMore] = useState(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const callApi = async () => {
      await dispatch(toggleLoading(true))
      await dispatch(getListConversations({ limit: 20, offset: 0, toMessage }))
      await dispatch(toggleLoading(false))
      if (contactToggle) dispatch(contactsToggler(false))
      dispatch(fetchConversations(false))
    }
    router.isReady&&callApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, contactToggle, fetch,router.isReady])

  useEffect(() => {
    const loadChats = async () => {
      //pick the first thread and append to url
      const convo = conversations && conversations.length && conversations[0]
      if (convo) {
        params.userId=convo.receiverUser._id
        params.read = convo.isRead
        router.replace({ pathname: '/messages', query: params })
        dispatch(populateChatBox(convo))
        await dispatch(getConversationDetails({ conversationId: convo._id, limit: 50, offset: 0, dummy: convo.dummy, t:t }))
      }
    }
    if (router.isReady&&(!apiFetch || fetch)) loadChats()
  }, [apiFetch, dispatch,router.isReady])

  /**
   * Listen to incoming messages
   */
  useEffect(() => {
    if (isLoginToken()) {
      if (socketObj) {
        socketObj.on('receiveMessage', (payload) => {
          dispatch(newMessage(payload))
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketObj])

  const renderName = (user) => {
    if (user.firstName) return `${user.firstName} ${user.lastName}`
    return user.username
  }

  const showChatBox = async (convo) => {
    setMessage('')
    const params = router.query
    // if (params.userId) params.delete('userId')
    params.userId = convo.receiverUser._id ? convo.receiverUser._id : convo.receiverUser.uuid
    // params.append('userId', convo.receiverUser._id ? convo.receiverUser._id : convo.receiverUser.uuid)
    router.replace({ pathname: '/messages', query: params })
    dispatch(populateChatBox(convo))
    dispatch(toggleLoading(true))
    await dispatch(getConversationDetails({ conversationId: convo._id, limit: 50, offset: 0, dummy: convo.dummy, t:t }))
    dispatch(toggleLoading(false))
    setMobileMsgOpen(true);
    if (convo && convo.readPendingFrom === uuid) {
      if (socketObj && socketObj.connected) {
        socketObj.emit('conversationRead', {
          senderUserId: convo.receiverUser._id ? convo.receiverUser._id : convo.receiverUser.uuid,
        })
      }
      dispatch(readChat({ _id: convo.receiverUser._id }))
    }
  }
  /**fetch data func for pagination */
  const fetchData = () => {
    setHasMore(true)
    if (conversations.length < conversationMetadata) {
      let length = 0
      conversations.forEach((convo) => {
        if (!convo.dummy) length++
      })
      dispatch(getListConversations({ offset: length, limit: 20, t:t }))
    } else setHasMore(false)
  }

  const checkBlocked = (convo) => {
    if ( convo.adminBlock === true ) {
      return true
    }
    // if ( convo.isBlocked === true ) {
    //   return true 
    // }
    return false 
  }

  return (
    <>
      {!conversationLoader && (
        <ListingWrapper id="chat-users">
          {conversationLoader ? (
            <ul>
              <UsersContent>
                <GhostStyling>
                  <GhostLoader notification />
                </GhostStyling>
              </UsersContent>
            </ul>
          ) : (
            <ul>
              {conversations && conversations.length > 0 ? (
                <InfiniteScroll
                  scrollableTarget={'chat-users'}
                  dataLength={conversations.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={
                    <>
                      <GhostStyling>
                        <GhostLoader notification />
                      </GhostStyling>
                      <GhostStyling>
                        <GhostLoader notification />
                      </GhostStyling>
                    </>
                  }
                  endMessage={<></>}
                >
                  {conversations &&
                    conversations.length > 0 &&
                    conversations.map((convo) => (
                      !checkBlocked( convo )  && (<SingleUser showChatBox={showChatBox} renderName={renderName} key={convo.key} convo={convo} />)
                    ))}
                </InfiniteScroll>
              ) : (
                <></>
              )}
            </ul>
          )}
        </ListingWrapper>
      )}
    </>
  )
}
UsersListing.propTypes = {
  setMessage: PropTypes.func,
  setMobileMsgOpen: PropTypes.func,
}
export default UsersListing

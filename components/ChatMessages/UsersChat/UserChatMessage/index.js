import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { getConversationDetails } from '../../../../modules/messages/messagesSlice'
import GhostLoader from '../../../UI/GhostLoader'
import EndMessage from '../../../UI/GhostLoader/EndMessage'
import MessageTimeStamp from '../MessageTimeStamp'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import Linkify from 'react-linkify'

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  &.loggedInUserMessage {
    justify-content: flex-end;
    @media ( max-width: 767px ){
      flex-direction: column-reverse;
      align-items: flex-end;
      margin-bottom: 5px;
    }
  }
  @media ( max-width: 767px ){
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 5px;
  }
`
const ChatListingLight = styled.div`
  background: #eee;
  padding: 5px 15px;
  border-radius: 10px 10px 10px 0px;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  max-width: 85%;
  margin: 0 0 15px 0;
  white-space: pre-line;
  a {
    color: #222222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
    max-width: 90%;
    margin: 0 0 2px 0;
  }
  span {
    display: block !important;
    position: static !important;
    font-size: 16px !important;
    text-align: left !important;
    opacity: 1 !important;
    transform: translate(0%, 0%) !important;
  }
  ul {
    margin-left: 20px !important;;
  }
`
const Time = styled.div`
  font-size: 14px;
  color: #222222;
  margin: 0 15px;
  @media( max-width: 767px ) {
    margin: 0 2px 4px 2px;
    width: 96%;
    text-align: right ;
  }
`
const ChatListingDark = styled.div`
  background: #222222;
  border-radius: 10px 10px 0px 10px;
  padding: 5px 15px;
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  max-width: 85%;
  margin: 0 0 15px 0;
  white-space: pre-line;
  a {
    color: #ffffff;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
    max-width: 90%;
    margin: 0 0 2px 0;
  }
  span {
    display: block !important;
    position: static !important;
    font-size: 16px !important;
    text-align: left !important;
    opacity: 1 !important;
    transform: translate(0%, 0%) !important;
  }
  ul {
    margin-left: 20px !important;
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
const UserChatMessage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const activeChatMessages = useSelector((state) => state.root.messages.activeChatMessages)
  const messagesLoader = useSelector((state) => state.root.messages.messagesLoader)
  const messagesMetadata = useSelector((state) => state.root.messages.messagesMetadata)
  const activeChatBox = useSelector((state) => state.root.messages.activeChatBox)

  const [hasMore, setHasMore] = useState(true)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    setHasMore(true)
  }, [router.query])

  /**fetch data func for pagination */
  const fetchData = () => {
    setHasMore(true)
    if (activeChatMessages.length < messagesMetadata)
      dispatch(
        getConversationDetails({ conversationId: activeChatBox._id, offset: activeChatMessages.length, limit: 50 })
      )
    else setHasMore(false)
  }
  return (
    <div>
      {messagesLoader ? (
        <ul>
          <ListingWrapper>
            <GhostStyling>
              <GhostLoader notification />
            </GhostStyling>
          </ListingWrapper>
        </ul>
      ) : (
        <>
          {!hasMore && activeChatMessages.length > 6 && <EndMessage conversationsFetch />}
          <ul>
            {activeChatMessages && activeChatMessages.length > 0 ? (
              <InfiniteScroll
                inverse
                scrollableTarget={'chat-messages'}
                dataLength={activeChatMessages.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  <GhostStyling>
                    <GhostLoader notification />
                  </GhostStyling>
                }
                endMessage={<></>}
              >
                {activeChatMessages &&
                  activeChatMessages.length > 0 &&
                  activeChatMessages.map((mesg) =>
                  !isEmptyObj(mesg.userIdSender)&&loggedInUsername === mesg.userIdSender.username ? (
                      <ListingWrapper className="loggedInUserMessage" key={mesg._id}>
                        <Time>
                          <MessageTimeStamp stamp={mesg.dateCreated} />
                        </Time>
                        <ChatListingDark><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>[LINK]</a>)}>{ReactHtmlParser(mesg.content)}</Linkify></ChatListingDark>
                      </ListingWrapper>
                    ) : (
                      <ListingWrapper key={mesg._id}>
                        <ChatListingLight><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>[LINK]</a>)}>{ReactHtmlParser(mesg.content)}</Linkify></ChatListingLight>
                        <Time>
                          <MessageTimeStamp stamp={mesg.dateCreated} />
                        </Time>
                      </ListingWrapper>
                    )
                  )}
              </InfiniteScroll>
            ) : (
              <></>
            )}
          </ul>
        </>
      )}
    </div>
  )
}

export default UserChatMessage

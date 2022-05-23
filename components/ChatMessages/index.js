import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { BiChat } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import RightSection from '../NewsFeed/RightSection'
import { isLoginToken } from '../../utilities/authUtils'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { clearActiveChat, getUnreadConversationsCount } from '../../modules/messages/messagesSlice'
import { connectSocket } from '../../modules/socket/socketSlice'
import UsersChat from './UsersChat'
import UsersListing from './UsersListing'
import Head from 'next/head'
import BelowContentAds from '../YourProfile/BelowContentAds'
import GiftCardSection from '../YourProfile/GiftCardSection'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  margin-bottom: 30px;
  display: flex;
  background-color: #fff;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    /* padding: 30px 10px; */
    height: 100px !important;
    box-sizing: border-box;
  }
  // & .messagePg{
  //   flex: 0 0 100% ;
  //   margin-top: 20px ;
  // }
  span {
    opacity: 0.6;
    top: 50%;
    transform: translate(0%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    position: absolute;
    width: 100%;
    /* margin: auto 200px; */
    font-size: large;
    @media (max-width: 767px) {
      font-size: 12px;
    }
    svg {
      margin: 0 auto;
      color: #222;
      opacity: 0.8;
      @media (max-width: 767px) {
        height: 30px;
      }
    }
  }
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  height: 625px !important;
  max-height: 625px !important ;
  &.adBannerSec{
    height: auto ; 
    margin-top: 20px;
    @media( min-width: 1024px ){
      position: relative;
      bottom: 240px;
    }
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 100%;
    margin-right: 0;
  }
  @media (max-width: 991px) {
    margin-right: 0;
  }
  @media (max-width: 767px) {
    height: auto !important;
  }
`
const AdWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-top: 15px;
  // background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 620px;
  }
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`

const ChatMessages = () => {
  const { t } = useTranslation(['chat', 'translation'])
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const { activeChatBox, pageLoaded } = useSelector((state) => state.root.messages)
  const socketObj = useSelector((state) => state.root.socket.socketObj)
  const loading = useSelector((state) => state.root.auth.loading)
  const [message, setMessage] = useState('')
  const [picker, setPicker] = useState(false)
  const [mobileMsgOpen, setMobileMsgOpen] = useState(false)

  const [rate, setRate] = useState(Math.random() * 10)


  useEffect(() => {
    if (isLoginToken() && !socketObj) {
      dispatch(connectSocket())
    }
  }, [dispatch, socketObj])

  const emojiRef = useRef(null)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    /**get user details on page render */
    if (
      loggedInUsername &&
      (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
      isLoginToken()
    )
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(
    /**call count API on unmount */
    () =>
      function cleanup() {
        dispatch(getUnreadConversationsCount(t))
        dispatch(clearActiveChat())
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    document.addEventListener('mousedown', emojiPickerClose)
    return () => {
      document.removeEventListener('mousedown', emojiPickerClose)
    }
  }, [])

  const emojiPickerClose = (event) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target)) {
      setPicker(false)
    }
  }
  
  return (
    <>
     <Head>
        <title>Messages | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="viewport" content= "width=device-width, user-scalable=no"></meta>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <>
              <UsersListing setMessage={setMessage} setMobileMsgOpen={setMobileMsgOpen} />
              {!isEmptyObj(activeChatBox) ? (
                <UsersChat
                  emojiRef={emojiRef}
                  picker={picker}
                  setPicker={setPicker}
                  message={message}
                  setMessage={setMessage}
                  mobileMsgOpen={mobileMsgOpen}
                  setMobileMsgOpen={setMobileMsgOpen}
                />
              ) : pageLoaded ? (
                <span>
                  <BiChat size={'120px'} />
                  {t(`chat:noMessage`)}
                </span>
              ) :<span>
              <BiChat size={'120px'} />
              {t(`chat:loading`)}
            </span>}
            </>
            <AdWrapper>
              <BelowContentAds inContainer={true} rate={rate} className="messagePg"/>
            </AdWrapper>
          </LeftContainer>
          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}
export default ChatMessages

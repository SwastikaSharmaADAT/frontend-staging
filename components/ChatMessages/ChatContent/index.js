import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import UserChatMessage from '../UsersChat/UserChatMessage'

const ChatContentWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  height: 355px;
  @media( max-width: 767px  ) {
    //height: 270px ; 
    height: 392px ; 
  }
  display: flex;
  flex-direction: column-reverse;
  &#chat-messages {
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(241, 241, 241, 0.233);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #000;
      cursor: pointer;
      border-radius: 10px;
    }
    ul {
      margin: 0;
      padding: 0;
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
  &.keyBoardOpen{
    @media( max-width: 767px  ) {
      height: 240px ; 
      //height: 392px ; 
    }
  }
`
const ChatContent = ( props) => {
  const messageRef = useRef()

  const activeChatBox = useSelector((state) => state.root.messages.activeChatBox)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [activeChatBox])

  const getClassNames = () => {
    const classesArr = []
    if ( appLanguageCode === 'ar' ) {
      classesArr.push('rtl-ar-content')
    } else {
      var classIndex = classesArr.indexOf("rtl-ar-content")
      classesArr.splice( classIndex, 1)
    }
    classesArr.push(props.className)
    return classesArr
  }

  return (
    <>
      <ChatContentWrapper ref={messageRef} id="chat-messages" className={getClassNames().join(' ')}>
        <UserChatMessage />
      </ChatContentWrapper>
    </>
  )
}

export default ChatContent

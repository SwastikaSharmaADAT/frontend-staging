import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {} from '../../modules/auth/authSlice'
import UsersChat from '../ChatMessages/UsersChat'
import CloseIcon from '../UI/CloseIcon/CloseIcon'
import { setMessageState } from '../../modules/messages/messagesSlice'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  position: relative;
  .close-quick-chat {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 9;
    cursor: pointer;
    svg {
      color: #222;
    }
  }
  .quickChat {
    height: auto;
    padding-bottom: 0 !important;
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  .textAreaQuickChat {
    width: auto;
  }
  @media (max-width: 767px) {
    width: 90vw;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    // max-width: 47vw;
  }
`
const ChatpopupModal = () => {
  const quickEmojiRef = useRef(null)
  const [message, setMessage] = useState('')
  const [picker, setPicker] = useState(false)

  const dispatch = useDispatch()

  const closePopup = () => {
    dispatch(setMessageState({ key: 'chatPopup', value: false }))
  }

  return (
    <PageWrapper>
      <CloseIcon className="close-quick-chat" onclick={closePopup} />
      <UsersChat
        emojiRef={quickEmojiRef}
        quickMessage
        picker={picker}
        setPicker={setPicker}
        message={message}
        setMessage={setMessage}
      />
    </PageWrapper>
  )
}

export default ChatpopupModal

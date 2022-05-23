import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaRegSmile } from 'react-icons/fa'
import { BsEnvelopeFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import Textarea from '../../../../components/UI/Textarea'
import Button from '../../../../components/UI/Button'
import {
  addNewMessage,
  readChat,
  moveToTop,
  getListConversations,
  populateChatFromId,
  instantBlockUser,
  setMessageState
} from '../../../../modules/messages/messagesSlice'
import { isLoginToken } from '../../../../utilities/authUtils'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { notifySuccess } from '../../../../modules/profile/myProfileSlice'

import dynamic from 'next/dynamic'
const Picker = dynamic(() => import('emoji-picker-react'), {
  ssr:false
})

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: #ecedf1;
  padding: 15px;
  aside.emoji-picker-react .content-wrapper:before {
    display: none;
  }
  @media (max-width: 767px) {
    align-items: center;
    padding: 15px 15px 0 15px;
  }
  form {
    width: 100%;
  }
  .emoji-picker {
    position: absolute;
    box-shadow: 1px 1px 6px rgb(0 0 0 / 30%);
    z-index: 1;
    top: 111px;
    right: 0px;
  }
`
const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eee;
  padding: 15px 0 0 0;
  @media (max-width: 767px) {
    align-items: center;
  }
  form {
    width: 100%;
  }
`
const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #fff;
  padding: 13px;
  
  width: 96%;
  margin: 0 0 15px;
  @media (max-width: 767px) {
    width: auto;
  }
  @media ( min-width: 767px ) {
    min-height: 90px;
  }
  textarea {
    border: 0;
    padding: 0;
    margin: 0 14px 0 0;
    width: 100%;
    height: 90px;
    color: #222;
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      height: 60px;
    }
    ::placeholder {
      color: #aaa;
    }
  }
  
`
const Emojis = styled.div`
  .smiley {
    color: #aaa;
    font-size: 18px;
    cursor: pointer;
  }
`
const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
  button {
    display: flex;
    align-items: center;
    min-width: 100px;
    justify-content: center;
    margin-top: 0px;
    width: auto;
    svg {
      margin: 0 5px 0 0;
    }
  }
  .margin-right {
    margin-right: 10px;
  }
`

const ReplyInput = ({ blocked, message, setMessage, picker, setPicker, emojiRef, quickMessage,deletedUser, adminBlock, focused, setFocused }) => {
  const { t } = useTranslation(['chat','successResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  let chatInput = useRef()
  const socketObj = useSelector((state) => state.root.socket.socketObj)
  const activeChatBox = useSelector((state) => state.root.messages.activeChatBox)
  const activeChatMessages = useSelector((state) => state.root.messages.activeChatMessages)
  const uuid = useSelector((state) => state.root.myProfile.userData.uuid)
  const [width, setWidth] = useState( typeof window !== 'undefined' && window.innerWidth  );
  const breakpoint = 767;
  useEffect( () => { 
    typeof window !== 'undefined' &&  window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [] ) ;

  

  const historyHandler = () => {
    if (activeChatBox) {
      dispatch(setMessageState({ key: 'chatPopup', value: false }))
      const params = router.query
      if(params.username) delete params.username
      if(params.artworkSlug) delete params.artworkSlug
      params.userId = activeChatBox.receiverUser.uuid ? activeChatBox.receiverUser.uuid : activeChatBox.receiverUser._id
      params.page = 'true'
      router.push({ pathname: '/messages', query: params })
    }
  }


  /**
   * Listen to block user
   */
  useEffect(() => {
    if (isLoginToken()) {
      if (socketObj) {
        socketObj.on('receiverBlockedConversation', () => {
          dispatch(instantBlockUser())
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketObj])

  const markAsRead = () => {
    setFocused(true)
    if (activeChatBox && !isEmptyObj(activeChatBox) && activeChatBox.readPendingFrom === uuid) {
      dispatch(readChat({ _id: activeChatBox.receiverUser._id }))
      if (socketObj && socketObj.connected) {
        socketObj.emit('conversationRead', { senderUserId: activeChatBox.receiverUser._id })
      }
    }
  }
  const onBlurArea = ( e ) => {
    if ( (width < breakpoint) ) {
      setFocused(false)
      e.target.value &&  sendMessage( e )
    }
  }
  

  const onEmojiClick = (event, emojiObject) => {
    let newMessage = message.concat(emojiObject.emoji)
    setMessage(newMessage)
    setPicker(false)
    chatInput.focus()
  }
  const onChangeHanlder = (e) => {
    if(e.target.value.length<1000)
    setMessage(e.target.value)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!message) return
    if (socketObj && socketObj.connected) {
      socketObj.emit('sendMessage', {
        receiverUserId: activeChatBox.receiverUser._id
          ? activeChatBox.receiverUser._id
          : activeChatBox.receiverUser.uuid,
        message,
      })
      setMessage('')
      if (quickMessage) {
        notifySuccess(t(`successResponses:messages:messageSent`))
      } else {
        dispatch(addNewMessage({ message }))
        dispatch(moveToTop(activeChatBox._id))
        if (!activeChatMessages || !activeChatMessages.length) {
          const resultAction = await dispatch(
            getListConversations({
              toMessage: '',
              offset: 0,
              limit: 20,
            })
          )
          await unwrapResult(resultAction)
          dispatch(populateChatFromId(activeChatBox.receiverUser._id))
        }
      }
    }
  }

  const togglePicker = () => {
    if (blocked||deletedUser||adminBlock) return
    markAsRead()
    setPicker(!picker)
  }

  
  return (
    <>
      {(adminBlock||blocked||deletedUser) && <BlockWrapper>{t(`blockText`)} </BlockWrapper>}
      <ListingWrapper>
        {picker && (
          <div ref={emojiRef} className="emoji-picker">
            {' '}
            <Picker
              groupNames={{
                smileys_people: t(`emojiPicker.smileys_people`),
                animals_nature: t(`emojiPicker.animals_nature`),
                food_drink: t(`emojiPicker.food_drink`),
                travel_places: t(`emojiPicker.travel_places`),
                activities: t(`emojiPicker.activities`),
                objects: t(`emojiPicker.objects`),
                symbols: t(`emojiPicker.symbols`),
                flags: t(`emojiPicker.flags`),
                recently_used: t(`emojiPicker.recently_used`),
              }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
        <form onSubmit={sendMessage}>
          <InputWrap className="textAreaQuickChat">
            <Textarea
              disabled={blocked||deletedUser||adminBlock}
              onFocus={markAsRead}
              onBlur={onBlurArea}
              refs={(ip) => (chatInput = ip)}
              value={message}
              onChange={onChangeHanlder}
              placeholder={t(`placeholderMessage`)}
            />
            <Emojis>{quickMessage ? null : <FaRegSmile onClick={togglePicker} className="smiley" />}</Emojis>
          </InputWrap>
          <BtnWrap>
            {quickMessage && (
              <Button type="button" onClick={historyHandler} className="margin-right">
                {t(`chat:history`)}
              </Button>
            )}
            <Button disabled={blocked||deletedUser||adminBlock} type="submit">
              <BsEnvelopeFill />
              {t(`send`)}
            </Button>
          </BtnWrap>
        </form>
      </ListingWrapper>
    </>
  )
}
ReplyInput.propTypes = {
  blocked: PropTypes.bool,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  picker: PropTypes.bool,
  setPicker: PropTypes.func,
  emojiRef: PropTypes.object,
  quickMessage: PropTypes.bool,
  deletedUser: PropTypes.bool,
  adminBlock: PropTypes.bool,
  focused: PropTypes.bool,
  setFocused: PropTypes.func,
}
export default ReplyInput

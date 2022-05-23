import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdDoNotDisturbAlt } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { IoDownloadSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import ChatContent from '../ChatContent'
import ReplyInput from '../UsersChat/ReplyInput'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import ModalComponent from '../../UI/Modal'
import ConfirmBox from '../../UI/ConfirmBox'
import artmoDefault from '../../../public/assets/artmo-default.png'
import {
  deleteConversation,
  downloadConversation,
  mutateStateAfterBlock,
} from '../../../modules/messages/messagesSlice'
import { blockUser } from '../../../modules/profile/myProfileSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { renderOwnerName } from '../../../utilities/artworkSort'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { useRouter } from 'next/router'


const ListingWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 20px 0px;
  width: 100%;
  background: #fff;
  border-left: 2px solid #eee;
  height: 587px;
  flex: 1 ;
  @media (max-width: 767px) {
    width: 95vw;
    border-top: 2px solid #eee;
    border-left: 0;
    padding: 20px 0px 0px 0px ;
    //height: 550px ;
    height: 630px;
  }
  &.keyboardFocused {
    @media( max-width: 767px ) {
      height: 508px ;
    }
  }
`
const TopUserBar = styled.div`
  position: relative;
  margin: 0 0 20px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
`
const UsersContent = styled.div`
  position: relative;
  margin: 0px;
  display: flex;
  color: #222;
  align-items: center;
  max-width: calc(100% - 84px);
  width: 100%;
`

const UsersText = styled.div`
  position: relative;
  padding: 0 0 0 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 479px) {
  }
`

const UsersName = styled.div`
  cursor: pointer;
  font-size: 14px;
  line-height: normal;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat-Medium';
  font-weight: 700;
  color: #222;
  word-break: break-word;
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`
const UsersImg = styled.div`
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 35px;
    height: 35px;
  }
`

const ActionBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 18px;
    color: #aaa;
    margin-left: 10px;
    cursor: pointer;
    &.closeLgSize {
      font-size: 30px;
    }
  }
`

const UsersChat = ({ message, setMessage, picker, setPicker, mobileMsgOpen, setMobileMsgOpen, emojiRef, quickMessage }) => {

  const { t } = useTranslation(['chat', 'successResponses','translation'])
  const dispatch = useDispatch()
  const router = useRouter()
  const activeChatBox = useSelector((state) => state.root.messages.activeChatBox)
  const activeChatMessages = useSelector((state) => state.root.messages.activeChatMessages)
  const userData = useSelector((state) => state.root.myProfile.userData)

  const [width, setWidth] = useState( typeof window !== 'undefined' && window.innerWidth  );
  const breakpoint = 767;
  useEffect( () => { 
    typeof window !== 'undefined' &&  window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, [] ) ;
  
  const [openModal, setOpenModal] = useState(false)
  const [modal, setModal] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileMsg, setMobileMsg] = useState(!isEmptyObj(activeChatBox))
  const [focused, setFocused] = useState(false) 
  

  useEffect(() => {
    if (!isEmptyObj(activeChatBox) && !isEmptyObj(activeChatBox.senderUser) && !isEmptyObj(userData)) {
      setIsAdmin(
        (activeChatBox &&
          activeChatBox.receiverUser &&
          activeChatBox.receiverUser._id &&
          activeChatBox.receiverUser._id === userData.adminDetails.uuid) ||
          (activeChatBox &&
            !isEmptyObj(activeChatBox.receiverUser) &&
            activeChatBox.senderUser._id &&
            activeChatBox.senderUser._id === userData.adminDetails.uuid)
          ? true
          : false
      )
    }
  }, [activeChatBox, userData])

  useEffect( ()=>{
    const params = router.query
    //params.userId && params.read === 'false'  ? setMobileMsgOpen(true) : ''
    if ( params.userId) {
      //console.log(  params.read )
      if ( params.read  === false ) {
        setMobileMsgOpen(true)
      }
      if ( params.page ) {
        setMobileMsgOpen(true)
      }
      
    }
  
  }, [])

  const blockUserHandler = () => {
    setModal('block')
    setOpenModal(true)
  }
  const deleteChatHandler = () => {
    setModal('delete')
    setOpenModal(true)
  }
  const confirmDelete = async () => {
    const resultAction = await dispatch(deleteConversation({ conversationId: activeChatBox._id, t:t }))
    const result = unwrapResult(resultAction)
    if (result.success) setOpenModal(false)
  }
  const confirmBlock = async () => {
    const type = activeChatBox.isBlocked ? 'unblock' : 'block'
    const result = await dispatch(blockUser({ type, username: activeChatBox.receiverUser.username },t))
    if (result && result.success) {
      dispatch(mutateStateAfterBlock(activeChatBox.isBlocked ? 'unblock' : 'block'))
      setOpenModal(false)
    }
  }

  const downloadChatHandler = async () => {
    dispatch(downloadConversation({ conversationId: activeChatBox._id, username: activeChatBox.receiverUser.username, t:t }))
  }

  const redirectToProfile = () => {
    openInNewTab(`/user/${activeChatBox.receiverUser.username}`)
  }
  const name=activeChatBox.receiverUser ? renderOwnerName(activeChatBox.receiverUser):''
  const [nameOfUser,translateNameOfUser]=useState(name)

  useEffect(()=>{
    if(activeChatBox.receiverUser)
      translateNameOfUser(name)
  },[name])
  // useEffect(()=>{
  //   setFocused(focused)
  // }, [focused])

  return (
    <>
      {!isEmptyObj(activeChatBox) && (
        <>
          <ModalComponent closeOnOutsideClick={true} isOpen={openModal} closeModal={() => setOpenModal(false)}>
            {modal === 'delete' && (
              <ConfirmBox
                open={openModal}
                closeModal={() => setOpenModal(false)}
                deleteHandler={confirmDelete}
                confirmButtonText={t(`chat:delete`)}
                heading={t(`chat:warningDeleteConversation`)}
              />
            )}
            {modal === 'block' && (
              <ConfirmBox
                open={openModal}
                closeModal={() => setOpenModal(false)}
                deleteHandler={confirmBlock}
                confirmButtonText={activeChatBox.isBlocked ? t(`chat:unblock`) : t(`chat:block`)}
                heading={`${t(`chat:blockWarning`)} ${
                  activeChatBox.isBlocked ? t(`chat:unblock`) : t(`chat:block`)
                } ${t(`chat:thisUser`)}`}
              />
            )}
          </ModalComponent>

          {!isEmptyObj(activeChatBox) && (
            ((width < breakpoint) && (!quickMessage)) ?
            <ModalComponent closeOnOutsideClick={true} isOpen={mobileMsgOpen} closeModal={() => setMobileMsgOpen(false)}>
              <ListingWrapper className={focused ? 'keyboardFocused' : ''}>
              <TopUserBar>
                <UsersContent onClick={redirectToProfile}>
                  {!isEmptyObj(activeChatBox)&&<UsersImg>
                      <img
                        src={
                          activeChatBox.receiverUser.profilePicUrl
                            ? createResizeImageUrl(activeChatBox.receiverUser.profilePicUrl, 50, 50, 'profileCover') +
                              '?' +
                              new Date(activeChatBox.receiverUser.dateUpdated).getTime()
                            : '/assets/artmo-default.png'
                        }
                        onError={(e) => {
                          const timeSuffix = '?' + new Date(activeChatBox.receiverUser.dateUpdated).getTime()
                          imageErrorHandler(
                            e,
                            createImageUrl(activeChatBox.receiverUser.profilePicUrl),
                            '/assets/artmo-default.png',
                            'profileCover',
                            timeSuffix
                          )
                        }}
                        alt="UserProfileImg"
                      />
                    </UsersImg>
                    }
                  <UsersText>
                  <UsersName>{activeChatBox && renderOwnerName(activeChatBox.receiverUser)}</UsersName>
                  </UsersText>
                </UsersContent>

                <ActionBtns>
                  {!isAdmin &&!activeChatBox.deletedUser && !activeChatBox.adminBlock && (activeChatBox.blockedBy === 'sender' || activeChatBox.blockedBy === '') && (
                    <MdDoNotDisturbAlt onClick={blockUserHandler} />
                  )}
                  {/* && !activeChatBox.deletedUser && !activeChatBox.adminBlock */}
                  {activeChatMessages && activeChatMessages.length > 0 && (
                    <RiDeleteBinLine onClick={deleteChatHandler} />
                  )}
                  
                  {activeChatMessages && activeChatMessages.length > 0 && (
                    <IoDownloadSharp onClick={downloadChatHandler} />
                  )}
                  <IoCloseSharp className="closeLgSize" onClick={() => setMobileMsgOpen(false)} />
                </ActionBtns>
              </TopUserBar>
              <ChatContent className={ focused ? 'keyBoardOpen' : ''}/>
              <ReplyInput
                emojiRef={emojiRef}
                picker={picker}
                setPicker={setPicker}
                message={message}
                setMessage={setMessage}
                blocked={activeChatBox.isBlocked}
                deletedUser={activeChatBox.deletedUser}
                adminBlock={activeChatBox.adminBlock}
                //focused={focused}
                setFocused={setFocused}
              />
            </ListingWrapper>
            </ModalComponent> : 
            <ListingWrapper className="quickChat">
              <TopUserBar>
                <UsersContent>
                  <UsersImg onClick={()=>!activeChatBox.deletedUser && !activeChatBox.adminBlock  && redirectToProfile()}>
                    <img
                      src={
                        activeChatBox.receiverUser.profilePicUrl
                          ? createResizeImageUrl(activeChatBox.receiverUser.profilePicUrl, 50, 50, 'profileCover') +
                            '?' +
                            new Date(activeChatBox.receiverUser.dateUpdated).getTime()
                          : '/assets/artmo-default.png'
                      }
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(activeChatBox.receiverUser.dateUpdated).getTime()
                        imageErrorHandler(
                          e,
                          createImageUrl(activeChatBox.receiverUser.profilePicUrl),
                          '/assets/artmo-default.png',
                          'profileCover',
                          timeSuffix
                        )
                      }}

                      alt="UserProfileImg"
                    />
                  </UsersImg>
                  <UsersText>
                    <UsersName onClick={()=>!activeChatBox.deletedUser&& !activeChatBox.adminBlock &&redirectToProfile()}>
                      {activeChatBox&& nameOfUser?nameOfUser:name}
                    </UsersName>

                  </UsersText>
                </UsersContent>
                {!quickMessage && (
                  <ActionBtns>
                    {!isAdmin&&!activeChatBox.deletedUser && !activeChatBox.adminBlock && (activeChatBox.blockedBy === 'sender' || activeChatBox.blockedBy === '') && (
                      <MdDoNotDisturbAlt onClick={blockUserHandler} />
                    )}
                    {/* {activeChatMessages &&!activeChatBox.deletedUser&& !activeChatBox.adminBlock && activeChatMessages.length > 0 && (
                      <RiDeleteBinLine onClick={deleteChatHandler} />
                    )} */}
                    {activeChatMessages && activeChatMessages.length > 0 && (
                      <RiDeleteBinLine onClick={deleteChatHandler} />
                    )}
                    {activeChatMessages && activeChatMessages.length > 0 && (
                      <IoDownloadSharp onClick={downloadChatHandler} />
                    )}
                  </ActionBtns>
                )}
              </TopUserBar>
              {!quickMessage && <ChatContent className={ focused ? 'keyboardOpen' : ''} />}
              <ReplyInput
                quickMessage={quickMessage}
                emojiRef={emojiRef}
                picker={picker}
                setPicker={setPicker}
                message={message}
                setMessage={setMessage}
                blocked={activeChatBox.isBlocked}
                deletedUser={activeChatBox.deletedUser}
                adminBlock={activeChatBox.adminBlock}
                //focused={focused}
                setFocused={setFocused}
              />
            </ListingWrapper>
          )}
        </>
      )}
    </>
  )
}
UsersChat.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  picker: PropTypes.bool,
  setPicker: PropTypes.func,
  mobileMsgOpen: PropTypes.bool,
  setMobileMsgOpen: PropTypes.func,
  emojiRef: PropTypes.func,
  quickMessage: PropTypes.bool,
}
export default UsersChat

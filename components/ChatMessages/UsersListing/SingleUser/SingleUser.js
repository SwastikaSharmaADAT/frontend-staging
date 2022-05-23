import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { useSelector } from 'react-redux'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const UsersText = styled.div`
  position: relative;
  padding: 0 0 0 12px;
  width: calc(100% - 35px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 479px) {
  }
`

const UsersName = styled.div`
  font-size: 14px;
  line-height: normal;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat-Medium';
  font-weight: 700;
  color: #222;
  word-break: break-word;
  width: calc(100% - 6px);
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`
const UsersImg = styled.div`
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
const Indicators = styled.div`
  width: 6px;
  height: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d62d1e;
  border-radius: 50%;
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
    margin: 0 0 20px;
    max-width: 100%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
`
function SingleUser({ convo, showChatBox }) {
  const activeChatBox = useSelector((state) => state.root.messages.activeChatBox)

  const nameOfUser=convo && convo.receiverUser.firstName
  ? `${convo.receiverUser.firstName} ${convo.receiverUser.lastName}`
  : convo.receiverUser.username
  const [name, translateName] =useState('')

  useEffect(() => {
    if(!isEmptyObj(convo))
    translateName(nameOfUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameOfUser])
  return (
    <li key={convo._id} onClick={() => showChatBox(convo)}>
      <UsersContent selected={convo && activeChatBox && convo._id === activeChatBox._id}>
        <UsersImg>
          <img
            src={
              convo.receiverUser.profilePicUrl
                ? createResizeImageUrl(convo.receiverUser.profilePicUrl, 50, 50, 'profileCover') +
                  '?' +
                  new Date(convo.receiverUser.dateUpdated).getTime()
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(convo.receiverUser.dateUpdated).getTime()
              imageErrorHandler(
                e,
                createImageUrl(convo.receiverUser.profilePicUrl),
                '/assets/artmo-default.png',
                'profileCover',
                timeSuffix
              )
            }}
            alt="userImage"
          />
        </UsersImg>
        <UsersText>
          <UsersName>{name?name: convo && nameOfUser}</UsersName>
          {!convo.isRead && convo.readPendingFrom === convo.senderUser._id && <Indicators></Indicators>}
        </UsersText>
      </UsersContent>
    </li>
  )
}
SingleUser.propTypes = {
  convo: PropTypes.object,
  showChatBox: PropTypes.func,
}
export default SingleUser

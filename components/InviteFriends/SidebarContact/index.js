import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BsEnvelopeFill } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { isLoginToken } from '../../../utilities/authUtils'
import {  initiateNewThread, fetchConversations, populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'


const SidebarContactWrap = styled.div`
  width: auto;
  position: relative;
  margin: 0 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  padding: 0;
  max-width: 350px;
  align-items: center;
  min-height: 50px;
  cursor: pointer;
  font-size: 16px;
  svg {
    font-size: 18px;
    margin: 0 10px 0 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const SidebarContact = ({ onClose, filtersSection }) => {
  const { t } = useTranslation(['translation', 'rightSection'])
  const router = useRouter()
  const params = router.query
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const helpClickHandler = async () => {
    if (router.pathname.includes('messages')) {
      const { uuid } = userData.adminDetails
      const params = router.query
      params.userID = uuid
      router.push({ pathname: '/messages', query: params })
      dispatch(fetchConversations(true))
      window.scrollTo(0, 0)
      return
    }

    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }

  const clickHandler = () => {
    if (isLoginToken()) {
      helpClickHandler()
    } else {
      window.location.href = `mailto:hello@artmo.com`
    }
  }

  return (
    <>
      <SidebarContactWrap onClick={() => clickHandler()} className={appLanguageCode === 'ar' ? 'rtl-ar-content width100' : 'width100'}>
        <BsEnvelopeFill /> {t(`rightSection:needHelp`)}
        
      </SidebarContactWrap>
    </>
  )
}

SidebarContact.propTypes = {
  filtersSection: PropTypes.bool,
}

export default SidebarContact

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
import LanguageSelect from '../LanguageSelect' ;
import { AiFillGift } from 'react-icons/ai'


const SidebarContactWrap = styled.div`
  width: auto;
  position: relative;
  color: #fff;
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

const SidebarGiftcard = ({ onClose, filtersSection }) => {
  const { t } = useTranslation([ 'giftcard'])
  const router = useRouter()
  const params = router.query
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <SidebarContactWrap onClick={() => router.push('/giftcard')} className={appLanguageCode === 'ar' ? 'rtl-ar-content width100' : 'width100'}>
        <AiFillGift /> {t(`title`)}
      </SidebarContactWrap>
    </>
  )
}

SidebarGiftcard.propTypes = {
  filtersSection: PropTypes.bool,
}

export default SidebarGiftcard

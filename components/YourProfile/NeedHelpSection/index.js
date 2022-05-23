import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BsEnvelopeFill } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginToken } from '../../../utilities/authUtils'
import { populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'

const SidebarContactWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: row !important;
  padding: 0;
  max-width: 350px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  cursor: pointer;
  @media ( max-width: 767px ){
    &.mobile-hide{
      display:none;
    }
  }
  svg {
    font-size: 22px !important;
    margin: 0 10px 0 0 !important;
  }
  &.width100Percent {
    width: 100%;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const SidebarContact = ({ filtersSection }) => {
  const { t } = useTranslation('rightSection')

  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const helpClickHandler = async () => {
    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }
  const clickHandler = () => {
    if (isLoginToken()) {
      helpClickHandler()
    } else {
      if (process.browser) window.location.href = `mailto:hello@artmo.com`
    }
  }

  return (
    <>
      <SidebarContactWrap onClick={() => clickHandler()}
      className={appLanguageCode === 'ar' ? 'rtl-ar-content width100Percent mobile-hide filterLoc' : 'filterLoc width100Percent mobile-hide'}
      >
        <BsEnvelopeFill /> {t(`needHelp`)}
      </SidebarContactWrap>
    </>
  )
}

SidebarContact.propTypes = {
  filtersSection: PropTypes.bool,
}

export default SidebarContact

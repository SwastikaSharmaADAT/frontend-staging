import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AiFillGift } from 'react-icons/ai'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginToken } from '../../../utilities/authUtils'
import { populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'
import { useRouter } from 'next/router'

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
  &.artwork-dir {
    margin: 0 15px 20px 0;
    width: auto!important;
  }
  &.news-feed {
    margin: 0;
    width: 100%;
    box-shadow:none;
    max-width: none;
  }
  @media (max-width: 479px) {
    &.artwork-dir {
      min-width: 150px;
      margin: 0 5px 10px 5px;
    }
  }
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

const SidebarContact = ({className, filtersSection, hideOnMobile, hide}) => {
  const { t } = useTranslation('giftcard')
  const router = useRouter()
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  if (hide) return <></>

  return (
    <>
      <SidebarContactWrap onClick={() => router.push('/giftcard')}
      className={(hideOnMobile ? 'mobile-hide ' : '') + (appLanguageCode === 'ar' ? 'rtl-ar-content width100Percent filterLoc' : 'filterLoc width100Percent ') + className}
      >
        <AiFillGift /> {t(`title`)}
      </SidebarContactWrap>
    </>
  )
}

SidebarContact.propTypes = {
  filtersSection: PropTypes.bool,
  hideOnMobile: PropTypes.bool
}

export default SidebarContact

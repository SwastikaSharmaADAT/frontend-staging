import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { HiShare } from 'react-icons/hi'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'


const SidebarContactWrap = styled.div`
  width: auto;
  position: relative;
  color: #fff;
  margin: 0 20px 15px;
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
  &.width100 {
    width: 100%;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const SidebarInvite = ({ onClose, loggedInUserRole, filtersSection }) => {
  const { t } = useTranslation(['translation', 'rightSection'])
  const router = useRouter()
  const params = router.query
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)


  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (loggedInUserRole === 'artist') && free

  const clickHandler = () => {
    onClose()
    router.push('/invite')
  }

  return (
    <>
      {
        eligible ? <></> :
        <SidebarContactWrap onClick={() => clickHandler()} className={appLanguageCode === 'ar' ? 'rtl-ar-content width100' : 'width100'}>
          <HiShare /> {t(`rightSection:inviteFriends`)}
        </SidebarContactWrap>
      }
    </>
  )
}

SidebarInvite.propTypes = {
  onClose: PropTypes.func,
  filtersSection: PropTypes.bool,
}

export default SidebarInvite

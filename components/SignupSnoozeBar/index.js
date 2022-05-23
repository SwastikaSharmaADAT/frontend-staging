import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { setOpenSnoozePopup, setStartSnoozeTimer } from '../../modules/auth/authSlice'

const TopSignupbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  a {
    font-size: 14px;
    cursor: pointer;
    color: #fff;
    position: absolute;
    right: 10px;
    top: 11px;
  }
`
const Heading = styled.h1`
  font-weight: 400;
  margin: 0;
  padding: 0;
  color: #222;
  line-height: 30px;
  font-size: 24px;
  text-align: left;
  font-family: 'Montserrat-Regular';
`

const TopSignupbar = () => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()

  const handleSnooze = () => {
    localStorage.setItem('snoozed_popup', true)
    dispatch(setStartSnoozeTimer(true))
    dispatch(setOpenSnoozePopup(false))
  }

  return (
    <>
      <TopSignupbarRow>
        <Heading></Heading>
        <a onClick={() => handleSnooze()}>{t('auth.snooze')}</a>
      </TopSignupbarRow>
    </>
  )
}

export default TopSignupbar

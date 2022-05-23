import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import SingleContact from '../SingleContact/SingleContact'
import TagsInput from '../TagsInput/TagsInput'
import { inviteToArtmo } from '../../../modules/staticContent/staticContentSlice'
import CancelButton from '../../UI/CancelButton'
import { toggleLoading } from '../../../modules/auth/authSlice'

const EmailPickerContentWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 0 30px 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 15px;
  }
`
const SelectedWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 15px;
`
const SelectedCount = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  span {
    margin: 0 5px 0 0;
  }
  input {
    margin: 0 0 0 10px;
    padding: 0 10px;
    @media (max-width: 479px) {
      max-width: 140px;
      font-size: 14px;
      padding: 0 10px;
    }
  }
`
const PickerEmailWrap = styled.div`
  background: #e7e9ec;
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 540px;
  overflow-y: auto;
  p {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`

const BottomBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
  justify-content: center;
  p {
    color: #666;
    font-size: 14px;
  }
  textarea {
    width: 100%;
    margin: 0 0 15px;
    color: #222;
    ::placeholder {
      color: #222;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  button {
    background: #000;
    width: auto;
    margin: 0;
    padding: 8px 15px;
    height: auto;
    text-transform: uppercase;
    font-family: 'Montserrat-Regular';
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .cancel {
    margin-left: 15px;
    background-color: #eee;
    font-size: 16px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`

const PickEmailHeading = styled.div`
  margin: 30px 0 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  font-size: 24px;
  color: #666;
  justify-content: center;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const EmailPicker = ({ contacts, showOther, setContacts, setShowOther, setShowServices }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['invite','successResponses','translation'])

  /**search input state */
  const [input, setInput] = useState('')
  /**emails checked by user from list */
  let [selectedEmails, setSelectedEmails] = useState([])
  /**manually types emails */
  const [customEmails, setCustomEmails] = useState([])
  const filteredContacts =
    input !== '' ? contacts.filter((contact) => contact.title.toLowerCase().includes(input.toLowerCase())) : contacts

  /**add emails to array */
  const selectedTags = (tags) => {
    setCustomEmails(tags)
  }

  /**reducer to invite selected emails to Artmo */
  const submitHandler = async () => {
    sessionStorage.removeItem('msal.idtoken')
    sessionStorage.removeItem('msal.client.info')
    dispatch(toggleLoading(true))
    selectedEmails = selectedEmails.concat(customEmails)
    selectedEmails = [...new Set([...selectedEmails, ...customEmails])]
    const resultAction = await dispatch(inviteToArtmo({data:selectedEmails,t}))
    const result = await unwrapResult(resultAction)
    if (result.success) {
      setShowServices(true)
      setCustomEmails([])
      setSelectedEmails([])
      setContacts([])
      setShowOther(false)
      if (typeof window !== 'undefined') 
        window.scrollTo({
          top: 220,
          left: 0,
          behavior: 'smooth',
        })
    }
    dispatch(toggleLoading(false))
  }
  const cancelHandler = () => {
    sessionStorage.removeItem('msal.idtoken')
    sessionStorage.removeItem('msal.client.info')
    setShowServices(true)
    setCustomEmails([])
    setSelectedEmails([])
    setContacts([])
    setShowOther(false)
    if (typeof window !== 'undefined') 
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }
  return (
    <>
      <EmailPickerContentWrapper>
        <PickEmailHeading>{t(`sendManually`)}</PickEmailHeading>
        <BottomBar>
          <p>{t(`tagsInput.placeholder`)}</p>
          <TagsInput
            invite
            selectedTags={selectedTags}
            tags={[]}
            type="email"
          />
          <Button
            className="invite"
            disabled={!(selectedEmails.length > 0 || customEmails.length > 0)}
            onClick={submitHandler}
          >
            {t(`sendInvitesButtonLabel`)}
          </Button>
          <CancelButton className="cancel" onClick={cancelHandler} />
        </BottomBar>
      </EmailPickerContentWrapper>
    </>
  )
}
EmailPicker.propTypes = {
  contacts: PropTypes.array,
  showOther: PropTypes.bool,
  setContacts: PropTypes.func,
  setShowOther: PropTypes.bool,
  setShowServices: PropTypes.func,
}
export default EmailPicker

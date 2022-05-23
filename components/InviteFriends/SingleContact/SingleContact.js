import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Checkbox from '../../UI/Checkbox'

const PickerEmailContent = styled.div`
  background: #fff;
  padding: 20px;
  max-width: 44%;
  width: 100%;
  min-height: 58px;
  margin: 0 0 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 44%;
    padding: 15px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 44%;
    padding: 15px;
  }
  @media (min-width: 481px) and (max-width: 767px) {
    max-width: 43%;
    padding: 15px;
  }
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 10px;
  }
  .Checkboxcontainer {
    margin: 0;
    padding-left: 20px;
    .checkmarkTwo {
      background-color: transparent;
      border: 2px solid #666;
      border-radius: 2px;
    }
  }
`

const EmailContent = styled.div`
  max-width: calc(100% - 24px);
  width: 100%;
  color: #666;
  margin: -4px 0 0;
`

const EmailName = styled.div`
  font-size: 18px;
  word-break: break-word;
  margin: 0 0 2px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const EmailIDWrap = styled.div`
  font-size: 14px;
  word-break: break-word;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`
/**
 *
 * @returns jsx for single contact tile
 */
function SingleContact({ contact, selectedEmails, setSelectedEmails }) {
  /**Checkbox handler */
  const selectHandler = (e) => {
    if (e.target.checked) {
      setSelectedEmails([...selectedEmails, contact.email])
    } else {
      let newEmails = [...selectedEmails]
      newEmails = newEmails.filter((email) => email !== contact.email)
      setSelectedEmails(newEmails)
    }
  }

  return (
    <PickerEmailContent>
      <Checkbox checked={selectedEmails.find((email) => email === contact.email)} onChange={selectHandler} />
      <EmailContent>
        <EmailName>{contact.title}</EmailName>
        <EmailIDWrap>{contact.email}</EmailIDWrap>
      </EmailContent>
    </PickerEmailContent>
  )
}
SingleContact.propTypes = {
  contact: PropTypes.array,
  selectedEmails: PropTypes.array,
  setSelectedEmails: PropTypes.func,
}
export default SingleContact

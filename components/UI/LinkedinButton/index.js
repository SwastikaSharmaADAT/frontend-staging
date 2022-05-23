import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaLinkedin } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

const LinkededButtonText = styled.button`
  padding: 8px 15px;
  color: #fff;
  font-size: 16px;
  margin: 0;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0072b1;
  border: 0;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  :hover,
  :focus {
    background: #0072b1;
    outline: none;
  }
  svg {
    margin: 0 8px 0 0;
    font-size: 18px;
  }
`

const LinkedinButton = (props) => {
  const { t } = useTranslation('myaccount')

  return (
    <>
      <LinkededButtonText ref={props.refs} {...props}>
        <FaLinkedin /> <div>{t(`socialConnect.disconnectLinkedin`)}</div>
      </LinkededButtonText>
    </>
  )
}

LinkedinButton.propTypes = {
  refs: PropTypes.string,
}

export default LinkedinButton

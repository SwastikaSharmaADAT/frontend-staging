import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaFacebook } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

const FacebookButtonText = styled.button`
  color: #fff;
  font-size: 16px;
  margin: 0;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4868ad;
  border: 0;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  padding: 8px 15px;
  :hover,
  :focus {
    background: #4868ad;
    outline: none;
  }
  svg {
    margin: 0 8px 0 0;
    font-size: 18px;
  }
`

const FacebookButton = (props) => {
  const { t } = useTranslation('myaccount')

  return (
    <>
      <FacebookButtonText ref={props.refs} {...props}>
        <FaFacebook />
        <div>{t(`socialConnect.disconnectFacebook`)}</div>
      </FacebookButtonText>
    </>
  )
}

FacebookButton.propTypes = {
  refs: PropTypes.string,
}

export default FacebookButton

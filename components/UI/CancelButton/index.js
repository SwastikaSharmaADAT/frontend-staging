import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

const ButtonText = styled.button`
  background: #eee;
  font-style: normal;
  color: #222;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 18px;
  margin-right: 5px;
  cursor: pointer;
  padding: 5px 11px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`

const Button = (props) => {
  const { t } = useTranslation('invite')

  return (
    <ButtonText ref={props.refs} {...props}>
      {t(`cancelButtonLabel`)}
    </ButtonText>
  )
}

Button.propTypes = {
  refs: PropTypes.string,
}

export default Button

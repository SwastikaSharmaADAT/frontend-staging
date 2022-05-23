import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonText = styled.button`
  background: #222222;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  height: 36px;
  align-items: center;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
  width: 100%;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    background: #222222;
    outline: none;
  }
  :disabled {
    background: #bab8b8;
    cursor: not-allowed;
  }
  &.widFull{
    max-width: 300px !important;
    margin: 0 0 10px ;
  }
`

const Button = (props) => <ButtonText ref={props.refs} {...props}></ButtonText>

Button.propTypes = {
  refs: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Button

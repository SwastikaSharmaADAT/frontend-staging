import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonText = styled.button`
  background: #3ba1da;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  width: auto;
  padding: 7px 15px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    background: #3ba1da;
    outline: none;
    color: #fff;
  }
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ButtonBlue = (props) => <ButtonText ref={props.refs} {...props}></ButtonText>

ButtonBlue.propTypes = {
  refs: PropTypes.string,
  label: PropTypes.string,
}

export default ButtonBlue

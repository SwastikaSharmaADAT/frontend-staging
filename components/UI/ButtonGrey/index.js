import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonText = styled.button`
  background: #666666;
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
    background: #666666;
    outline: none;
    color: #fff;
  }
  :disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ButtonGrey = (props) => <ButtonText ref={props.refs} {...props}></ButtonText>

ButtonGrey.propTypes = {
  refs: PropTypes.string,
  label: PropTypes.string,
}

export default ButtonGrey

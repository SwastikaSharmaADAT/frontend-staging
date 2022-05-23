import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonText = styled.button`
  background: #eee;
  font-style: normal;
  color: #222;
  border: 0;
  outline: 0;
  height: 36px;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  :hover,
  :focus {
    background: #eee;
    outline: none;
  }
  :disabled {
    background: #bab8b8;
    cursor: not-allowed;
  }
`

const ButtonLight = (props) => (
  <ButtonText ref={props.refs} {...props}>
    {props.label}
  </ButtonText>
)

ButtonLight.propTypes = {
  refs: PropTypes.string,
  label: PropTypes.string,
}

export default ButtonLight

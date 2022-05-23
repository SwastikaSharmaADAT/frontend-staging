import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ButtonText = styled.button`
  background: #c50707;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
  width: 100%;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  padding: 8px 15px;
  :hover,
  :focus {
    background: #c50707;
    outline: none;
  }
`

const ButtonRed = (props) => <ButtonText ref={props.refs} {...props}></ButtonText>

ButtonRed.propTypes = {
  refs: PropTypes.string,
}

export default ButtonRed

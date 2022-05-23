import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const InputText = styled.input`
  border: 2px solid #eee;
  border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
  color: #666;
  font-size: 16px;
  font-weight: 400;
  height: 36px;
  margin: 0 0 10px;
  padding: 0 15px;
  appearance: none;
  border-radius: 0;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) => (props.placeholderColor ? props.placeholderColor : '#666')};
    font-weight: 400;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`


const Input = (props) => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return ( 
  <InputText
    ref={props.refs}
    hasError={props.hasError}
    placeholder={props.placeholder}
    placeholderColor={props.placeholderColor}
    {...props}
    className={appLanguageCode === 'ar' ? 'rtl-ar-content '+ props.className : props.className}
  />
)}

Input.propTypes = {
  refs: PropTypes.string,
  hasError: PropTypes.bool,
  placeholderColor: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const InputText = styled.textarea`
  border: 2px solid #eee;
  border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
  color: #666;
  font-size: 16px;
  font-weight: 400;
  height: 60px;
  margin: 0 0 10px;
  padding: 15px;
  appearance: none;
  border-radius: 0;
  overflow: auto;
  overflow-x: hidden;
  resize: none;
  :focus {
    outline: none;
    background-color: transparent;
  }
  ::placeholder {
    color: ${(props) => (props.placeholderColor ? props.placeholderColor : '#666')};
    font-weight: 400;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const Textarea = (props) => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return ( 
  <InputText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''} ref={props.refs} placeholderColor={props.placeholderColor} hasError={props.hasError} {...props} />
  )}

Textarea.propTypes = {
  refs: PropTypes.func,
  hasError: PropTypes.bool,
  placeholderColor: PropTypes.string,
  onFocus: PropTypes.func,
}

export default Textarea

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const SelectStyled = styled.select`
  border: 2px solid #eee;
  border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
  color: #666;
  font-size: 16px;
  font-weight: 400;
  height: 36px;
  margin: 0 0 10px;
  padding: 0 15px;
  width: 100%;
  background: url('/assets/select_arrow.png') no-repeat right 5px center;
  appearance: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #666;
    font-weight: 400;
  }
  &.rtl-ar-content {
    direction: rtl;
    padding-right: 15px;
    background-position: left 10px center;
  }
`

const Select = (props) => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return ( 
  <SelectStyled hasError={props.hasError} {...props}  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
    {props.children}
  </SelectStyled>
)}

Select.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  hasError: PropTypes.bool,
}

export default Select

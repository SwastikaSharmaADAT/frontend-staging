import React from 'react'
import styled from 'styled-components'
// import styles from './Radio.module.css'
import PropTypes from 'prop-types'

const RadioButtonText = styled.div`
  margin: 0 16px 0 0;
  &.hasErAy {
    .checkmark {
      border: 1px solid red !important;
    }
  }
  .ValueName {
    color: #848484;
    font-size: 16px;
  }
  .container {
  display: block;
  position: relative;
  padding-left: 22px;
  margin-bottom: 5px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 2px;
  left: 0;
  height: 14px;
  width: 14px;
  background-color: #eee;
  border-radius: 50%;
  border: 1px solid #8c8c8c;
}

/* On mouse-over, add a grey background color */
.container:hover input~.checkmark {
  background-color: #ffffff;
  border: 1px solid #000;
}

/* When the radio button is checked, add a blue background */
.container input:checked~.checkmark {
  background-color: #fff;
  border: 1px solid #000;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked~.checkmark:after {
  display: block;
  background: #000;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
}
`

const Radio = (props) => (
  <RadioButtonText className={props.classText ? props.classText : 'InnerText'}>
    <label className={'container'}>
      <span className="ValueName">{props.labelName}</span>
      <input type="radio" name={props.name} value={props.value} checked={props.checked} onChange={props.onChange} />
      <span className={'checkmark'}></span>
    </label>
  </RadioButtonText>
)

Radio.propTypes = {
  labelName: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  classText: PropTypes.string,
}

export default Radio

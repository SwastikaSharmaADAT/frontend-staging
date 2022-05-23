import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const LabelText = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 10px;
  padding: 0;
  line-height: normal;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    font-size: 14px;
  }
  span {
    color: #dd3333;
    margin: 0 0 0 5px;
  }
  &.mngPaymentSec {
    line-height: 1.6 ;
  }
`

const Label = (props) => <LabelText ref={props.refs} {...props} />

Label.propTypes = {
  refs: PropTypes.string,
}

export default Label

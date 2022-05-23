import React from 'react'
import styled from 'styled-components'
import styles from './Checkbox.module.css'
import PropTypes from 'prop-types'

const CheckboxText = styled.div`
  margin: 0 16px 0 0;
  .ValueName {
    color: #848484;
    font-size: 16px;
  }
`

const Checkbox = (props) => (
  <CheckboxText className="PositionCheckbox">
    <label className={styles.Checkboxcontainer}>
      <span className="ValueName">{props.labelName}</span>
      <input type="checkbox" name={props.name} checked={props.checked} onChange={props.onChange} />
      <span className={styles.checkmarkTwo + ' ' + props.className}></span>
    </label>
  </CheckboxText>
)

Checkbox.propTypes = {
  labelName: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
}

export default Checkbox

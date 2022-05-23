import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaFacebook } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'

const FlipSwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  label {
    display: flex;
    justify-content: center;
  }
`

const FlipSpan = styled.span`
  color: #222;
  font-size: 16px;
  line-height: 30px;
  margin: 0;
  text-decoration: none;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #222;
  cursor: pointer;
  &.on {
    background: #222;
    color: #fff;
  }
`

const FlipSwitch = (props) => {
  const { t } = useTranslation('myaccount')

  return (
    <>
      <FlipSwitchContainer>
        {
          props.isRadio ?
          <>
            <label>
              <input type="radio" value={props.leftOption} name={props.fieldName} checked={props.fieldValue === props.leftOption} onChange={props.onChange}/>
              <FlipSpan className={props.fieldValue === props.leftOption ? 'on' : ''}>{props.leftLabel}</FlipSpan>
            </label>
            <label>
              <input type="radio" value={props.rightOption} name={props.fieldName} checked={props.fieldValue === props.rightOption} onChange={props.onChange}/>
              <FlipSpan className={props.fieldValue === props.rightOption ? 'on' : ''}>{props.rightLabel}</FlipSpan>
            </label>
          </>
          :
          <label>
            <input type="checkbox" name={props.fieldName} checked={props.checked} onChange={props.onChange}/>
            <FlipSpan className={!props.checked ? 'on' : ''}>{props.leftLabel}</FlipSpan>
            <FlipSpan className={props.checked ? 'on' : ''}>{props.rightLabel}</FlipSpan>
          </label>
        }
      </FlipSwitchContainer>
    </>
  )
}

FlipSwitch.propTypes = {
  isRadio: PropTypes.boolean,
  fieldName: PropTypes.string,
  checked: PropTypes.boolean,
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  leftOption: PropTypes.string,
  rightOption: PropTypes.string,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
}

export default FlipSwitch

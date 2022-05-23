import React from 'react'
import PropTypes from 'prop-types'
import { VscChromeClose } from 'react-icons/vsc'
import styled from 'styled-components'

const Cross = styled.div`
  display: block;
  float: right;
  cursor: pointer;
`

const CloseIcon = (props) => (
  <Cross {...props} onClick={props.onclick}>
    <VscChromeClose />
  </Cross>
)

CloseIcon.propTypes = {
  onclick: PropTypes.func,
}

export default CloseIcon

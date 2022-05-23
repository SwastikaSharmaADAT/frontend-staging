import React from 'react'
import styled from 'styled-components'
import styles from './CustomCheckbox.module.css'

const Customcheckboxtext = styled.div`
  margin: 0 16px 0 0;
`

const StyledCheckbox = (props) => (
  <Customcheckboxtext>
    <label>
      <input type="checkbox" id={styles.test} className="ios-switch green" {...props} />
      <div>
        <div></div>
      </div>
    </label>
  </Customcheckboxtext>
)

export default StyledCheckbox

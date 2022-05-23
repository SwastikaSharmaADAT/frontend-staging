import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'

const ShareActivityWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: 374px;
  min-width: 374px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  @media (max-width: 767px) {
    min-width: 300px;
    max-width: 300px;
  }
`

const ShareActivity = (props) => (
  <>
    <ShareActivityWrap>
      <SectionHeader props={props} />
      <SectionContent props={props} />
    </ShareActivityWrap>
  </>
)
ShareActivity.propTypes = {
  props: PropTypes.any,
}
export default ShareActivity

import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { CommonWrapper } from '../../../styled.js'

const InternshipSection = ({ tabContent }) => (
  <>
    <CommonWrapper>{tabContent && tabContent.content ? ReactHtmlParser(tabContent.content) : ''}</CommonWrapper>
  </>
)

InternshipSection.propTypes = {
  tabContent: PropTypes.object,
}

export default InternshipSection

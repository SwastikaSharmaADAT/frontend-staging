import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { CommonWrapper } from '../../styled.js'

const HamburgGermanySection = ({ tabContent }) => (
  <>
    <CommonWrapper>{tabContent && tabContent.content ? ReactHtmlParser(tabContent.content) : ''}</CommonWrapper>
  </>
)

HamburgGermanySection.propTypes = {
  tabContent: PropTypes.object,
}

export default HamburgGermanySection

import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { CommonWrapper } from '../styled.js'

const TabSection = ({ tabContent }) => <CommonWrapper>{ReactHtmlParser(tabContent)}</CommonWrapper>

TabSection.propTypes = {
  tabContent: PropTypes.object,
}

export default TabSection

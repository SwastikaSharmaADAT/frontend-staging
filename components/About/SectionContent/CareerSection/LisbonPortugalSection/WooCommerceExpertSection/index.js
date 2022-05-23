import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { CommonWrapper } from '../../../styled.js'

const WooCommerceExpertSection = ({ tabContent }) => (
  <>
    <CommonWrapper>{tabContent && tabContent.content ? ReactHtmlParser(tabContent.content) : ''}</CommonWrapper>
  </>
)

WooCommerceExpertSection.propTypes = {
  tabContent: PropTypes.object,
}

export default WooCommerceExpertSection

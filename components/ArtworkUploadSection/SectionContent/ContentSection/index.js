import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const Section = styled.div`
  background-color: #fff;
  border: 1px solid lightgray;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  h1 {
    color: #222;
    font-weight: normal;
    font-size: 24px;
    font-family: Montserrat-Regular;
    padding-bottom: 15px;
    margin: 0;
  }
  h3 {
    color: #222;
    font-weight: normal;
    font-size: 20px;
    font-family: Montserrat-Regular;
    padding-bottom: 15px;
  }
  span {
    color: #666;
    font-weight: normal;
    font-size: 16px;
    font-family: Montserrat-Regular;
    a {
      text-decoration: none;
      color: #222;
    }
  }
`

const ContentSection = ({ content, title }) => (
  <>
    <Section>
      <h1>{title}</h1>
      {ReactHtmlParser(content)}
    </Section>
  </>
)

ContentSection.propTypes = {
  content: PropTypes.any,
  title: PropTypes.string,
}

export default ContentSection

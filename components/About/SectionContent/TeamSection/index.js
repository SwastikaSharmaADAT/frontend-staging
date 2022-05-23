import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
// import TeamItems from './TeamItems'

const CommonWrapper = styled.div`
  margin: 0;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const TeamSection = ({ tabContent }) => (
  <>
    <CommonWrapper>
      {tabContent && tabContent.content ? ReactHtmlParser(tabContent.content) : ''}
      {/* <TeamItems></TeamItems> */}
    </CommonWrapper>
  </>
)

TeamSection.propTypes = {
  tabContent: PropTypes.object,
}

export default TeamSection

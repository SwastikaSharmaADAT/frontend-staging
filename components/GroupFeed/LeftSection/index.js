import React from 'react'
import styled from 'styled-components'
import GroupBarHead from '../GroupBarHead'
import SubLeftSection from '../SubLeftSection'
import SubRightSection from '../SubRightSection'

const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 620px;
  }
  @media (max-width: 990px) {
    max-width: 100%;
    margin-right: 0px;
  }
`

const BottomBar = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`

const LeftSection = () => (
  <>
    <LeftContainer>
      <GroupBarHead />
      <BottomBar>
        <SubLeftSection />
        <SubRightSection />
      </BottomBar>
    </LeftContainer>
  </>
)

export default LeftSection

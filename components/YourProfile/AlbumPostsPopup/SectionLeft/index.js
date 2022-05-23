import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Gallery from '../Gallery'

const SectionLeftWrap = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: #000;
  color: #fff;
  width: 100%;
  /* max-width: 700px; */
  @media (max-width: 1024px) {
    margin: 0 30px;
  }
  @media (max-width: 991px) {
    margin: 0;
  }
  @media (max-width: 767px) {
    margin: 0;
  }
  &.LeftSection {
    @media (min-width: 992px) and (max-width: 1024px) {
      width: calc(100% - 400px);
    }
    @media (max-width: 1024px) {
      margin: 0;
    }
    @media (max-width: 767px) {
      margin: 0;
    }
  }
`

const SectionLeft = (props) => (
  <>
    <SectionLeftWrap className={props.showRightSection ? 'LeftSection' : null}>
      <Gallery
        imagesData={props.imagesData}
        activeIndex={props.activeIndex}
        showRightSection={props.showRightSection}
      />
    </SectionLeftWrap>
  </>
)

SectionLeft.propTypes = {
  imagesData: PropTypes.array,
  activeIndex: PropTypes.number,
  showRightSection: PropTypes.bool,
}

export default SectionLeft

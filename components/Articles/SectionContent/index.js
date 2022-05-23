import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ImagesSection from '../ImagesSection'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  .NoWrap {
    margin: 0 0 30px;
    font-style: normal;
    color: #666;
    font-size: 16px;
  }
`
const SectionContent = (props) => (
  <>
    <SectionContentWrap>
      <ImagesSection
        articleImage={props.articleImage}
        deleteImg={props.deleteImg}
        openModal={props.openModal}
        openLightbox={props.openLightbox}
      />
    </SectionContentWrap>
  </>
)

SectionContent.propTypes = {
  articleImage: PropTypes.array,
  deleteImg: PropTypes.func,
  openModal: PropTypes.func,
  openLightbox: PropTypes.func,
}

export default SectionContent

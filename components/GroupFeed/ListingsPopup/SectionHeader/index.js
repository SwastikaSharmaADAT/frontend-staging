import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import CloseIcon from '../../../UI/CloseIcon/CloseIcon'

const SectionHead = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 2px solid #eee;
  flex-wrap: wrap;
  border-bottom: 2px solid #eee;
  a {
    color: #ccc;
    font-size: 14px;
  }
`
const HeadingSec = styled.div`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-size: 20px;
  line-height: normal;
  margin: 0 0 0 0;
  color: #000;
`

const SectionHeader = ({ closeModal, title }) => (
  <>
    <SectionHead>
      <HeadingSec>{title}</HeadingSec>
      <CloseIcon onclick={() => closeModal(false)} />
    </SectionHead>
  </>
)
SectionHeader.propTypes = {
  closeModal: PropTypes.func,
  title: PropTypes.string,
}
export default SectionHeader

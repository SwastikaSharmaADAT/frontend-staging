import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'

const ListingsPopupWrap = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 0 0 17px;
  padding: 0;
  min-width: 380px;

  &.joinWrap {
    min-width: 500px;
  }
  @media (max-width: 767px) {
    max-width: 90vw;
    min-width: 300px !important;
  }
`

const ListingsPopup = ({ title, type, groupMembers, closeModal }) => (
  <>
    <ListingsPopupWrap className={type === 'joinList' ? 'joinWrap' : null}>
      <SectionHeader title={title} closeModal={closeModal} />
      <SectionContent type={type} groupMembers={groupMembers} />
    </ListingsPopupWrap>
  </>
)

ListingsPopup.propTypes = {
  groupMembers: PropTypes.array,
  closeModal: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
}
export default ListingsPopup

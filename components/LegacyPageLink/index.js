import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import LegacyPageLinkModal from './LegacyPageLinkModal'

const LegacyPageLink = (props) => (
  <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeModal}>
    <LegacyPageLinkModal />
  </Modal>
)

LegacyPageLink.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default LegacyPageLink

import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import ChatpopupModal from './ChatpopupModal'

const Chatpopup = (props) => (
  <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeModal}>
    <ChatpopupModal />
  </Modal>
)

Chatpopup.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default Chatpopup

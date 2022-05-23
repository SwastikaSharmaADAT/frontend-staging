import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import ForgotPassword from '../ForgotPassword'

const ForgotPasswordModal = (props) => (
  <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeOpen}>
    <ForgotPassword closeModal={props.closeOpen} />
  </Modal>
)

ForgotPasswordModal.propTypes = {
  closeOpen: PropTypes.func,
  open: PropTypes.bool,
}

export default ForgotPasswordModal

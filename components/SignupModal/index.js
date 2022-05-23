import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import { SignUp } from '../../modules/auth/SignUp'

const SignupModal = (props) => (
  <Modal closeOnOutsideClick={false} isOpen={props.open} closeModal={props.closeModal}>
    <SignUp closeModal={props.closeModal} snooze={props.snooze} />
  </Modal>
)

SignupModal.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  snooze: PropTypes.bool,
}

export default SignupModal

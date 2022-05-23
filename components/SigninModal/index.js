import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../UI/Modal'
import { SignIn } from '../../modules/auth/SignIn'

const SigninModal = (props) => (
  <Modal closeOnOutsideClick={!props.alreadySnoozeValue ? true : false} isOpen={props.open} closeModal={props.closeModal}>
    <SignIn closeModal={props.closeModal} />
  </Modal>
)

SigninModal.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  alreadySnoozeValue:PropTypes.bool
}

export default SigninModal

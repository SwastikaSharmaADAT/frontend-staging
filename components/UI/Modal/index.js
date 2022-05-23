import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    height: 'auto',
    padding: '0',
    border: '0',
    borderRadius: '0',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'visible'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
}

// Modal.setAppElement('#root')

const ModalComponent = (props) => (
  <>
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={props.closeOnOutsideClick}
      shouldCloseOnEsc={props.closeOnOutsideClick}
      overlayClassName={props.overlayClassName}
    >
      {props.children}
    </Modal>
  </>
)

ModalComponent.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  overlayClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

export default ModalComponent

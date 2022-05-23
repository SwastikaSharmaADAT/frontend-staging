import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

const customStyles = {
  content: {
    width: '100%',
    height: 0,
    padding: '0',
    border: '0',
    borderRadius: '0',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    overflow: 'visible',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1500
  },
}

Modal.setAppElement('#root')

const SidebarModal = (props) => (
  <>
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      {props.children}
      <p>{props.isOpen}</p>
    </Modal>
  </>
)

SidebarModal.propTypes = {
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

export default SidebarModal

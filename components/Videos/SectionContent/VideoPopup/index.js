import React from 'react'
import PropTypes from 'prop-types'
import ModalComponent from '../../../UI/Modal'
import VideoPopupContent from './VideoPopupContent'

function VideoPopup({ popUp, setPopup, popUpVideo }) {
  return (
    <>
      {popUp && (
        <ModalComponent
          isOpen={popUp}
          closeModal={() => {
            setPopup(false)
          }}
          closeOnOutsideClick={true}
        >
          <VideoPopupContent popUpVideo={popUpVideo} setPopup={setPopup} />
        </ModalComponent>
      )}
    </>
  )
}
VideoPopup.propTypes = {
  popUp: PropTypes.bool,
  setPopup: PropTypes.func,
  popUpVideo: PropTypes.object,
}
export default VideoPopup

import React, {useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import VideoPlayer from '../VideoPlayer'
import VideoPopup from '../../../Videos/SectionContent/VideoPopup'

const VideoSection = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .DefaultText {
    font-style: normal;
    color: #666;
  }
`

const SectionContent = ({
  userVideos,
  setAddVideoModal,
  setEditData,
  editData,
  editType,
  setEditType}) => {
const { t } = useTranslation('profile')
  const [popUp, setPopup] = useState(false)
  const [popUpVideo, setPopUpVideo] = useState()
  const editHandler=(video)=>{
    setEditData(video)
    setEditType('videos')
    setAddVideoModal(true)
  }
  
  return (
    <>
      <VideoPopup popUpVideo={popUpVideo} popUp={popUp} setPopup={setPopup} />
      <VideoSection>
        {userVideos ? (
          <>
            {userVideos.length > 0 ? (
              <>
                {userVideos.map((video) => (
                  <VideoPlayer
                  editHandler={editHandler} 
                  setPopup={setPopup}
                  setPopUpVideo={setPopUpVideo}
                  video={video}
                  key={video._id}
                  />
                ))}
              </>
            ) : (
              <span className="DefaultText">{t(`video.noVideosFound`)}</span>
            )}
          </>
        ) : null}
      </VideoSection>
    </>
  )
}

SectionContent.propTypes = {
  userVideos: PropTypes.array,
  setAddVideoModal: PropTypes.func,
  setEditData: PropTypes.func,
  editData: PropTypes.object,
  editType: PropTypes.object,
  setEditType: PropTypes.func,
}

export default SectionContent

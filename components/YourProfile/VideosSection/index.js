import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import showSection from '../../../utilities/showSection'
import { useTranslation } from 'next-i18next'
import { getUserVideos } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import SectionHeader from '../SeeAllAddSectionHeader'
import { addVideo } from '../../../modules/newsFeed/newsFeedSlice'
import ModalComponent from '../../UI/Modal'
import AddVideoPopup from '../../NewsFeed/AddVideoPopup'
import SectionContent from './SectionContent'

const VideosSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
`

const VideosSection = (props) => {
  const { t } = useTranslation(['profile','translation','successResponses','errorResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = router.query
  const userVideos = useSelector((state) => state.root.myProfile.userVideos)
  const myProfile = useSelector((state) => state.root.myProfile)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const [addVideoModal, setAddVideoModal] = useState(false)
  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState('')


  useEffect(() => {
    if (isLoginToken() && username) {
      dispatch(getUserVideos(username))
    }
  }, [dispatch, username])

  const addHandler = async (info) => {
    await dispatch(addVideo({ info: info, type: 'profile', username: username },t))
    setEditData('')
    setEditType('')
    setAddVideoModal(false)
  }

  const seeAllHandler = () => {
    router.push(`/user/${username}/activity?activityType=videos`)
  }
  const closeAddAlbum=()=>{
    setEditType('')
    setEditData('')
    setAddVideoModal(false)
  }
  return (
    <>
      {showSection(myProfile, 'videos') ? (
        <div ref={props.refObject.VideosSectionRef} id="videos">
          {' '}
          <ModalComponent closeOnOutsideClick={true} isOpen={addVideoModal} closeModal={closeAddAlbum}>
            <AddVideoPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddVideoModal} addVideoHandler={addHandler} />
          </ModalComponent>
          <VideosSectionWrap>
            <SectionHeader
              heading={t(`video.title`)}
              userData={userDataState}
              addHandler={addHandler}
              seeAllHandler={seeAllHandler}
              setModal={setAddVideoModal}
              hideSeeAllBtn={userVideos && userVideos.length === 0 ? true : false}
            />
            <SectionContent setAddVideoModal={setAddVideoModal} setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType}  userVideos={userVideos} />
          </VideosSectionWrap>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
VideosSection.propTypes = {
  refProp: PropTypes.object,
  VideosSectionRef:PropTypes.object,
  refObject:PropTypes.object,
}
export default VideosSection

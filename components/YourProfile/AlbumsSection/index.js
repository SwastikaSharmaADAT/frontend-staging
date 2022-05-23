import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { getUserAlbums } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import { addPhotoAlbum } from '../../../modules/newsFeed/newsFeedSlice'
import ModalComponent from '../../UI/Modal'
import AddPhotoAlbumPopup from '../../NewsFeed/AddPhotoAlbumPopup'
import AlbumPostsPopup from '../AlbumPostsPopup'
import showSection from '../../../utilities/showSection'
import SectionHeader from './../SeeAllAddSectionHeader'
import SectionContent from './SectionContent'


const AlbumsSectionWrap = styled.div`
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
  &.rtl-ar-content {
    direction: rtl;
  }
`

const AlbumsSection = ({refObject}) => {
  const { t } = useTranslation(['profile','translation','successResponses','errorResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = router.query
  const userAlbums = useSelector((state) => state.root.myProfile.userAlbums)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const [addAlbumModal, setAddAlbumModal] = useState(false)
  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState('')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if (isLoginToken() && username) {
      dispatch(getUserAlbums(username))
    }
  }, [dispatch, username])

  const addHandler = async (album) => {
    await dispatch(addPhotoAlbum({ album: album, type: 'profile', username: username },t))
    setEditData('')
    setEditType('')
    setAddAlbumModal(false)
  }

  const seeAllHandler = () => {
    router.push(`/user/${username}/activity?activityType=albums`)
  }

  const [postInfo, setPostInfo] = useState()
  const [lightBox, setLightBox] = useState(false)
  
  const closeAddAlbum=()=>{
    setEditType('')
    setEditData('')
    setAddAlbumModal(false)
  }
  return (
    <>
      {showSection(myProfile, 'albums') ? (
        <div ref={refObject.AlbumsSectionRef} id="albums">
          <ModalComponent closeOnOutsideClick={true} isOpen={addAlbumModal} closeModal={closeAddAlbum}>
            <AddPhotoAlbumPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddAlbumModal} onAddAlbumClick={addHandler} />
          </ModalComponent>
          <AlbumsSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader
              heading={t(`album.title`)}
              userData={userDataState}
              addHandler={addHandler}
              seeAllHandler={seeAllHandler}
              setModal={setAddAlbumModal}
              hideSeeAllBtn={userAlbums && userAlbums.length === 0 ? true : false}
            />
            <SectionContent setAddAlbumModal={setAddAlbumModal} setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setPostInfo={setPostInfo} setLightBox={setLightBox} userAlbums={userAlbums} />
          </AlbumsSectionWrap>
          {lightBox && (
            <ModalComponent closeOnOutsideClick={true} isOpen={lightBox} closeModal={() => setLightBox(false)}>
              <AlbumPostsPopup
                activeIndex={0}
                imagesData={postInfo.pictures}
                showRightSection={false}
                closeLightbox={() => setLightBox(false)}
              />
            </ModalComponent>
          )}
        </div>
      ) : (
        <></>
      )}
    </>

  )
}
AlbumsSection.propTypes = {
  refObject:PropTypes.object
}
export default AlbumsSection

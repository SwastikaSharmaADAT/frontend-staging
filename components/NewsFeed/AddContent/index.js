import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { IoPencilSharp, IoVideocamSharp, IoImagesSharp, IoNewspaperSharp } from 'react-icons/io5'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../UI/Modal'
import AddPostPopup from '../AddPostPopup'
import AddVideoPopup from '../AddVideoPopup'
import AddPhotoAlbumPopup from '../AddPhotoAlbumPopup'
import { addPost, setCreatePostResponse, addVideo, addPhotoAlbum } from '../../../modules/newsFeed/newsFeedSlice'


const AddContentWrap = styled.div`
  width: auto;
  position: relative;
  padding: 15px;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 1025px) and (max-width: 1279px) {
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    flex-direction: row;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
const InputText = styled.input`
  border: 0;
  color: #222;
  font-size: 20px;
  font-weight: 400;
  height: 40px;
  margin: 0;
  padding: 0;
  width: 99px;
  background: none;
  :focus,
  :hover {
    outline: none;
  }
  ::placeholder {
    color: #222;
    font-weight: 400;
  }
  @media (min-width: 1025px) and (max-width: 1279px) {
    width: 100%;
    margin: 0 0 10px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    width: 30%;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 0 10px;
  }
  @media (min-width: 1025px) {
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
      width: 64px;
    }
  }
`

const BtnsWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const TopButtons = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 7px;
  outline: 0;
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222222;
  }
  :focus {
    outline: 0;
    border: 0;
  }
  @media (min-width: 1200px) and (max-width: 1400px) { 
    font-size: 13px ; 
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: 0px;
    margin-right: 5px;
    font-size: 14px;
    padding: 7px 5px;
  }

  @media (min-width: 1025px) and (max-width: 1279px) {
    margin: 0 7px 7px 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    margin: 0 7px 7px 0;
  }
  svg,
  img {
    font-size: 20px;
    margin: 0 5px 0 0;
  }
  :last-child {
    :hover {
      img {
        filter: invert(1);
      }
    }
  }
`

const AddContent = ({addAlbumModal, setAddAlbumModal,setEditType,editType,editData,setEditData,addPostModal,
  setAddPostModal,
  addVideoModal,
  setAddVideoModal}) => {
  const { t } = useTranslation(['newsFeed','translation','successResponses','errorResponses'])

  const dispatch = useDispatch()
  const router = useRouter()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const createPostResponse = useSelector((state) => state.root.newsFeed.createPostResponse)
  const userDataState = useSelector((state) => state.root.myProfile.userData)


  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  const addPostHandler = async({ info, postImgObj },type) => {
    await dispatch(addPost({ info, postImgObj,type },t))
    setEditData('')
    setEditType('')
  }
  /**handles video publishing */
  const addVideoHandler = async (info,type2) => {
    dispatch(addVideo({ info: info, type: 'newsFeed',type2 },t))
    setAddVideoModal(false)
  }

  /**
   * Handle album upload action
   */
  const addAlbumHandler = (album,type) => {
    dispatch(addPhotoAlbum({ album: album,type },t))
    setAddAlbumModal(false) //TODO: should close after ack of success
  }

  useEffect(() => {
    if (createPostResponse && addPostModal) {
      setAddPostModal(false)
      setAddVideoModal(false)
      dispatch(setCreatePostResponse(false))
    }
  }, [createPostResponse, addPostModal, dispatch])

  const emptyState=()=>{
    setEditData('')
    setEditType('')
  }
  const closeAlbumModal=()=>{
    emptyState()
    setAddAlbumModal(false)
  }
  const closePostModal=()=>{
    emptyState()
    setAddPostModal(false)
  }
  const closeVideosModal=()=>{
    emptyState()
    setAddVideoModal(false)
  }

  return (
    <>
      {addPostModal && (
        <ModalComponent closeOnOutsideClick={true} isOpen={addPostModal} closeModal={closePostModal}>
          <AddPostPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddPostModal} addPostHandler={addPostHandler} />
        </ModalComponent>
      )}
      {addVideoModal && (
        <ModalComponent closeOnOutsideClick={true} isOpen={addVideoModal} closeModal={closeVideosModal}>
          <AddVideoPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddVideoModal} addVideoHandler={addVideoHandler} />
        </ModalComponent>
      )}
      {addAlbumModal && (
        <ModalComponent closeOnOutsideClick={true} isOpen={addAlbumModal} closeModal={closeAlbumModal}>
          <AddPhotoAlbumPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddAlbumModal} onAddAlbumClick={addAlbumHandler} />
        </ModalComponent>
      )}
      <AddContentWrap>
        <ContentWrap>
          <InputText placeholder={t(`addContent.placeholderAdd`)} disabled />
          <BtnsWrap>
            <TopButtons onClick={() => setAddPostModal(true)}>
              <IoPencilSharp />
              {t(`addContent.post`)}
            </TopButtons>
            <TopButtons onClick={() => setAddVideoModal(true)}>
              <IoVideocamSharp />
              {t(`addContent.video`)}
            </TopButtons>
            <TopButtons onClick={() => setAddAlbumModal(true)}>
              <IoImagesSharp />
              {t(`addContent.album`)}
            </TopButtons>
            <TopButtons
              onClick={() => {
                router.push(`/user/${loggedInUsername}/activity/add-article`)
              }}
            >
              <IoNewspaperSharp />
              {t(`addContent.article`)}
            </TopButtons>
            {userDataState && userDataState.userRoleType === 'personal' && (
              <TopButtons
                onClick={() => {
                  router.push(`/artworks/add`)
                }}
              >
                <BsFillBookmarkFill />
                {t(`addContent.artwork`)}
              </TopButtons>
            )}
          </BtnsWrap>
        </ContentWrap>
      </AddContentWrap>
    </>
  )
}

AddContent.propTypes = {
  addAlbumModal: PropTypes.bool,
  setAddAlbumModal: PropTypes.func,
  setEditType: PropTypes.func,
  editData: PropTypes.object,
  editType: PropTypes.bool,
  setEditData: PropTypes.func,
  addPostModal: PropTypes.bool,
  setAddPostModal: PropTypes.func,
  addVideoModal: PropTypes.bool,
  setAddVideoModal: PropTypes.func,
}
export default AddContent

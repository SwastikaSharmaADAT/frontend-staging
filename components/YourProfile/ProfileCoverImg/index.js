import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IoCameraSharp } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import UploadPhotoModal from '../UploadPhotoModal'
import { removePhoto, uploadPhoto } from '../../../modules/profile/myProfileSlice'
import {
  createImageUrl,
  uploadImageToMediaLibrary,
  createResizeImageUrl,
  checkIfImageExists,
  imageErrorHandler,
} from '../../../utilities/imageUtils'


const ProfileCoverImgWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 387px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform : ${props => props.needScale ? 'scale(1.015);': 'scale(1);'}
    @media (max-width: 767px) {
    }
  }
  @media (max-width: 767px) {
    padding: 0;
    flex-direction: column;
    height: 190px;
  }
  > .sub {
    bottom: 0;
    transition: bottom 0.8s ease;
    cursor: pointer;
    ::selection {
      background: #ff0000;
    }
  }
`
const ImgUploadWrap = styled.div`
  position: absolute;
  bottom: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: bottom 0.8s ease;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  svg {
    color: #fff;
    font-size: 52px;
    cursor: pointer;
  }
`
const LabelText = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  color: #fff;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  cursor: pointer;
`

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 61%;
  overflow: visible;
  :before {
    background: url('/assets/dropdown_arrow_top.png') no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -6px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 45%;
  }
  ul {
    list-style: none;
    margin: 0 0 0 -15px;
    padding: 0;
    width: 100%;
    text-align: center;
  }
  li {
    color: black;
    padding: 8px 5px;
    text-decoration: none;
    font-size: 14px;
    border-bottom: 1px solid #dcdcdc;
  }
  li:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`

const ProfileCoverImg = (props) => {
  const { t } = useTranslation(['profile','successResponses','translation'])

  const dispatch = useDispatch()
  const [uploadMenu, setUploadMenu] = useState(false)
  const [coverImageScale, setCoverImageScale] = useState(false)
  const [openUploadModal, setUploadModal] = useState(false)
  const [photoVal, setPhotoVal] = useState(null)
  const [photoAction, setPhotoAction] = useState('Upload')
  const menuRef = useRef(null)
  const isEditingHeader = useSelector((state) => state.root.myProfile.isEditingHeader)
  const hasCoverPhoto = useSelector((state) => state.root.myProfile.hasCoverPhoto)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    if(props.userData && props.userData.coverPicUrl && !coverImageScale) {
      checkIfImageExists(createResizeImageUrl(props.userData.coverPicUrl, 900, 400, 'profileCover') +
      '?' +
      new Date(props.userData.dateUpdated).getTime(),(exists)=>{
        if(!exists) return setCoverImageScale(true)
      })
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUploadMenu(false)
    }
  }

  const toggleUploadMenu = () => {
    setUploadMenu(!uploadMenu)
  }
  const handleUploadPhoto = (e, action) => {
    e.stopPropagation()
    setPhotoAction(action)
    setUploadMenu(false)
    setUploadModal(true)
  }

  const handleRemovePhoto = (e) => {
    e.stopPropagation()
    setUploadMenu(false)
    dispatch(removePhoto('cover',t))
  }

  const closeModal = () => {
    setPhotoVal(null)
    setUploadModal(false)
  }

  const handleOnChange = (data) => {
    setPhotoVal(data)
  }

  const applyHandler = async () => {
    if (photoVal) {
      let image = photoVal.result
      fetch(image)
        .then((res) => res.blob())
        .then(async (blob) => {
          uploadImageToMediaLibrary(blob, photoVal.filename)
          const formD = new FormData()
          formD.append('imageType', 'cover')
          formD.append('image', blob, photoVal.filename)
          dispatch(uploadPhoto(formD, 'cover','',t))
          closeModal()
        })
    }
  }
  return (
    <>
      <UploadPhotoModal
        open={openUploadModal}
        closeModal={closeModal}
        type="cover"
        action={photoAction}
        value={photoVal}
        onChange={handleOnChange}
        isCover={true}
        applyHandler={applyHandler}
      />
      <ProfileCoverImgWrapper needScale={coverImageScale}>
        <img
          src={
            props.userData && props.userData.coverPicUrl
              ? createResizeImageUrl(props.userData.coverPicUrl, 900, 400, 'profileCover') +
              '?' +
              new Date(props.userData.dateUpdated).getTime()
              : '/assets/artmo_profile_default_cover.jpg'
          }
          onError={(e) => {
            const timeSuffix = '?' + new Date(props.userData.dateUpdated).getTime()
            imageErrorHandler(
              e,
              createImageUrl(props.userData.coverPicUrl),
              '/assets/artmo_profile_default_cover.jpg',
              'profileCover',
              timeSuffix
            )
          }}
          alt="Profile Cover"
        />
        {isEditingHeader ? (
          <ImgUploadWrap className="sub" ref={menuRef} onClick={toggleUploadMenu}>
            <IoCameraSharp />
            <LabelText>{t(`coverImage.menuOptions.title`)}</LabelText>
            {uploadMenu && (
              <DropdownContent>
                <ul>
                  {!hasCoverPhoto ? (
                    <li onClick={(e) => handleUploadPhoto(e, 'Upload')}>
                      {t(`coverImage.menuOptions.upload`)}
                    </li>
                  ) : (
                    <li onClick={(e) => handleUploadPhoto(e, 'Change')}>
                      {t(`coverImage.menuOptions.change`)}
                    </li>
                  )}
                  {hasCoverPhoto && (
                    <li onClick={(e) => handleRemovePhoto(e)}>{t(`coverImage.menuOptions.remove`)}</li>
                  )}
                </ul>
              </DropdownContent>
            )}
          </ImgUploadWrap>
        ) : null}
      </ProfileCoverImgWrapper>
    </>
  )
}

ProfileCoverImg.propTypes = {
  userData: PropTypes.object,
}

export default ProfileCoverImg
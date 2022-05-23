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
  imageErrorHandler,
} from '../../../utilities/imageUtils'

const ProfileImgWrapper = styled.div`
  border: 2px solid #ccc;
  width: 134px;
  position: relative;
  height: 134px;
  display: flex;
  align-items: center;
  margin: -70px 20px 0 0;
  background: #fff;
  justify-content: center;
  height: 134px;
  img {
    max-height: 134px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    margin: -70px auto 0;
    width: 100px;
    height: 100px;
  }
  > .sub {
    bottom: 0;
    transition: bottom 0.8s ease;
    cursor: pointer;
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
    font-size: 38px;
    cursor: pointer;
    @media (max-width: 767px) {
      font-size: 28px;
    }
  }
`
const LabelText = styled.label`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  color: #fff;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 120px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 100px;
  width: 30px;
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
  @media (max-width: 767px) {
    top: 76px;
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
    font-size: 13px;
    border-bottom: 1px solid #dcdcdc;
  }
  li:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`

const ProfileImage = (props) => {
  const { t } = useTranslation(['profile', 'successResponses', 'translation'])

  const dispatch = useDispatch()
  const [uploadMenu, setUploadMenu] = useState(false)
  const [openUploadModal, setUploadModal] = useState(false)
  const isEditingHeader = useSelector((state) => state.root.myProfile.isEditingHeader)
  const [photoVal, setPhotoVal] = useState(null)
  const [photoAction, setPhotoAction] = useState('Upload')
  const menuRef = useRef(null)
  const hasProfilePhoto = useSelector((state) => state.root.myProfile.hasProfilePhoto)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
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
    dispatch(removePhoto('profile', t))
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
          formD.append('imageType', 'profile')
          formD.append('image', blob, photoVal.filename)
          dispatch(uploadPhoto(formD, 'profile', '', t))
          closeModal()
        })
    }
  }

  return (
    <>
      <UploadPhotoModal
        open={openUploadModal}
        closeModal={closeModal}
        type="profile"
        action={photoAction}
        value={photoVal}
        onChange={handleOnChange}
        isCover={false}
        applyHandler={applyHandler}
      />
      <ProfileImgWrapper>
        <img
          src={
            props.userData && props.userData.profilePicUrl === 'temp'
              ? '/assets/black-default-image.jpg'
              : props.userData && props.userData.profilePicUrl
              ? createResizeImageUrl(props.userData.profilePicUrl, 200, 200, 'profileCover') +
                '?' +
                new Date(props.userData.dateUpdated).getTime()
              : '/assets/artmo-default.png'
          }
          onError={(e) => {
            const timeSuffix = '?' + new Date(props.userData.dateUpdated).getTime()
            imageErrorHandler(
              e,
              createImageUrl(props.userData.profilePicUrl),
              '/assets/artmo-default.png',
              'profileCover',
              timeSuffix
            )
          }}
          alt="Profile Img"
        />
        {isEditingHeader ? (
          <ImgUploadWrap className="sub" ref={menuRef} onClick={toggleUploadMenu}>
            <IoCameraSharp />
            <LabelText>{t(`profileHead.profileImage.menuOptions.title`)}</LabelText>
            {uploadMenu && (
              <DropdownContent>
                <ul>
                  {!hasProfilePhoto ? (
                    <li onClick={(e) => handleUploadPhoto(e, 'Upload')}>
                      {t(`profileHead.profileImage.menuOptions.upload`)}
                    </li>
                  ) : (
                    <li onClick={(e) => handleUploadPhoto(e, 'Change')}>
                      {t(`profileHead.profileImage.menuOptions.change`)}
                    </li>
                  )}
                  {hasProfilePhoto && (
                    <li onClick={(e) => handleRemovePhoto(e)}>{t(`profileHead.profileImage.menuOptions.remove`)}</li>
                  )}
                </ul>
              </DropdownContent>
            )}
          </ImgUploadWrap>
        ) : null}
      </ProfileImgWrapper>
    </>
  )
}

ProfileImage.propTypes = {
  userData: PropTypes.object,
}

export default ProfileImage

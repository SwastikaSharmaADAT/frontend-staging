import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import PropTypes from 'prop-types'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler  } from '../../../../utilities/imageUtils'
import { useTranslation } from 'next-i18next'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const AlbumsWrap = styled.div`
  cursor: pointer;
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 24%;
  display: flex;
  height: 190px;
  color: #fff;
  align-items: center;
  &:nth-last-child(2):first-child {
    max-width: 48%;
  }
  &:nth-child(2):last-child {
    max-width: 48%;
  }
  @media (max-width: 479px) {
    max-width: 48%;
    height: 160px;
    margin: 0 0 12px;
  }
  h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    font-family: 'Montserrat-Medium';
    font-weight: 100;
    margin: 0 0 5px 0;
    padding: 0;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 16px;
    line-height: normal;
    margin: 0;
    padding: 0;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`

const InnerAlbumsText = styled.div`
  position: absolute;
  padding: 0 20px;
  @media (max-width: 767px) {
    padding: 0 20px;
  }
  h1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const InnerAlbumsWrap = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 100%;
  .edit{
    position: absolute;
    display: none;
    top: 0;
    right: 0;
    font-size: 18px;
    margin: 0;
    cursor: pointer;
    svg{
      margin-right: 2px;
      font-size: 22px;
    }
    @media (max-width: 1024px) {
      display: flex !important;
    }
  }
  :hover{
    .edit{
      display: flex;
    }
  }
`
const AlbumOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
`

const AlbumImg = styled.div`
  /* background-image: url(${(props) => props.background});
  background-size: cover; */
  width: 100%;
  display: flex;
  height: 191px;
  align-items: center;
  @media (max-width: 479px) {
    height: 160px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const EditDiv = styled.div`
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px 5px 10px;
`

function SingleAlbum({setAddAlbumModal,album,setLightBox, setPostInfo,setEditData,editData,editType,setEditType }) {
  const { t } = useTranslation(['profile'])

  const [description, translateDescription] =useTranslateContent('')
  const [title, translateTitle] =useTranslateContent('')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  
  useEffect(() => {
    if(!isEmptyObj(album)){
      translateDescription(album.description)
      translateTitle(album.title)
    }
  }, [album])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const populateLightBox = () => {
    setPostInfo(album)
    setLightBox(true)
  }
const editHandler=(e)=>{
  e.stopPropagation()
  setEditData(album)
  setEditType('albums')
  setAddAlbumModal(true)
}
const ownerOfPost=album&&album.userId.username===loggedInUsername
  return (
    <AlbumsWrap key={album._id} 
    onClick={populateLightBox}
    >
        {/* <IconText>Edit</IconText> */}
      <InnerAlbumsWrap>
        <AlbumImg>
          <AlbumOverlay></AlbumOverlay>
          <img
            src={
              album.coverPicture && album.coverPicture.pictureUrl
                ? createResizeImageUrl(album.coverPicture.pictureUrl, 450, 250, 'mediaLibrary')
                : album.coverPicture === null
                  ? '/assets/image_not_available.png'
                  : '/assets/mo-fallback-image.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(album.coverPicture && album.coverPicture.pictureUrl),
                '/assets/mo-fallback-image.png',
                'mediaLibrary',
                ''
              )
            }}
            alt=""
          />
        </AlbumImg>
        <InnerAlbumsText>
          <h1>{title ? title : album && album.title}</h1>
          <p>{description ? description : album && album.description}</p>
        </InnerAlbumsText>
         {ownerOfPost&&<EditDiv onClick={editHandler} className="edit"><MdEdit/>{t(`album.edit`)}</EditDiv>}
      </InnerAlbumsWrap>
    </AlbumsWrap>
  )
}
SingleAlbum.propTypes = {
  album: PropTypes.object,
  setPostInfo: PropTypes.object,
  setLightBox: PropTypes.bool,
  setEditData: PropTypes.func,
  editData: PropTypes.object,
  editType: PropTypes.object,
  setEditType: PropTypes.func,
}
export default SingleAlbum
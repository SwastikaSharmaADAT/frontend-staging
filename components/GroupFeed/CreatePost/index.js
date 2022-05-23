import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { IoCameraSharp } from 'react-icons/io5'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { addGroupPost, setCreatePostResponse } from '../../../modules/groups/groupsSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

const PopupWrap = styled.div`
  width: auto;
  position: relative;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 0 0 17px;
  @media (max-width: 767px) {
  }
`
const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0;
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 3px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: Montserrat-Medium;
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 3px 10px;
  }
  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const BottomDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const UploadTextArea = styled.div`
  width: 100%;
  display: flex;
  margin: 0px 0 15px;
  border: 2px solid #eee;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
  .countDiv {
    font-size: 13px;
    color: #ccc;
    align-items: flex-end;
    padding: 10px 10px 5px;
  }
  textarea {
    padding: 15px;
    font-family: 'Montserrat-Regular';
    width: 100%;
    border: 0;
    height: 58px;
    overflow: auto;
    font-size: 14px;
    border-radius: 0;
    resize: none;
    overflow: auto;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
`

const SectionHeadButtons = styled.div`
  width: auto;
  position: relative;
  display: flex;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`

const TopButtons = styled.button`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  svg {
    margin: 0 5px 0 0;
  }
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-right: 5px;
    margin-left: 0px;
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
  @media (max-width: 359px) {
    font-size: 12px;
    padding: 0 5px;
  }
`

const SectionHead = styled.div`
  position: relative;
  margin: 0 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0;
`

const PostImage = styled.div`
  position: relative;
  margin: 0 auto 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 255px;
  align-items: center;
  padding: 0;
  img {
    max-height: 255px;
    margin-bottom: 15px;
  }
`

const CreatePost = () => {
  const { t } = useTranslation(['groupsFeed', 'successResponses'])

  const router = useRouter()
  const dispatch = useDispatch()
  const { groupId } = router.query

  const [openMediaLibrary, setOpenMediaLibrary] = useState(false)
  const [postDescription, setPostDescription] = useState('')
  const [postDescCount, setPostDescCount] = useState(0)
  const [postImgObj, setPostImg] = useState({})

  const createPostResponse = useSelector((state) => state.root.groups.createPostResponse)

  const descOnChange = (e) => {
    const value = e.target.value
    const length = value.length
    setPostDescription(value)
    setPostDescCount(length)
  }

  const getSelectedImages = (imgsData) => {
    if (imgsData.length === 1 && !isEmptyObj(imgsData[0])) {
      setPostImg({ ...imgsData[0] })
    }
  }

  const publishClickHandler = () => {
    const info = {
      groupId,
      description: postDescription,
      picUrl: postImgObj && postImgObj._id,
    }
    dispatch(addGroupPost(info, postImgObj,t))
  }

  useEffect(() => {
    if (createPostResponse) {
      setOpenMediaLibrary(false)
      setPostDescription('')
      setPostDescCount(0)
      setPostImg({})
      dispatch(setCreatePostResponse(false))
    }
  }, [createPostResponse, dispatch])

  return (
    <>
      {openMediaLibrary && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openMediaLibrary}
          closeModal={() => setOpenMediaLibrary(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenMediaLibrary(false)}
            getUploadedImages={getSelectedImages}
            limit={1}
            fixedLimit={true}
            singleSelection={true}
          />
        </ModalComponent>
      )}
      <PopupWrap>
        <SectionHead>
          <SectionHeading>{t(`createPost.title`)}</SectionHeading>
          <SectionHeadButtons>
            {!isEmptyObj(postImgObj) && postImgObj.pictureUrl ? (
              <TopButtons onClick={() => setOpenMediaLibrary(true)}>
                <IoCameraSharp /> {t(`createPost.editPhoto`)}
              </TopButtons>
            ) : (
              <TopButtons onClick={() => setOpenMediaLibrary(true)}>
                <IoCameraSharp /> {t(`createPost.addPhoto`)}
              </TopButtons>
            )}
          </SectionHeadButtons>
        </SectionHead>
        <PostImage>
          {!isEmptyObj(postImgObj) && postImgObj.pictureUrl && (
            <img
              src={createResizeImageUrl(postImgObj.pictureUrl, 600, 320, 'mediaLibrary')}
              onError={(e) => {
                imageErrorHandler(e, createImageUrl(postImgObj.pictureUrl), '', 'mediaLibrary', '')
              }}
              alt="Post" />
          )}
        </PostImage>
        <UploadTextArea>
          <textarea
            value={postDescription}
            onChange={descOnChange}
            maxLength={500}
            placeholder={t(`createPost.placeholderWriteSomething`)}
          ></textarea>
          <span className="countDiv">
            {postDescCount}
            {t(`createPost.characterLimit`)}
          </span>
        </UploadTextArea>
        <BottomDiv>
          <PublishBtn
            disabled={(!isEmptyObj(postImgObj) && postImgObj.pictureUrl) || postDescCount > 0 ? false : true}
            onClick={() => publishClickHandler()}
          >
            {t(`createPost.publish`)}
          </PublishBtn>
        </BottomDiv>
      </PopupWrap>
    </>
  )
}

export default CreatePost

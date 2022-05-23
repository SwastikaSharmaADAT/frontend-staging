import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Trans, useTranslation } from 'next-i18next'
import { uniq, uniqBy, findIndex, cloneDeep, remove } from 'lodash'
import { toggleLoading } from '../../../modules/auth/authSlice'
import { notifyError } from '../../../modules/profile/myProfileSlice'
import { useDebouncedValue } from '../../../hooks'
import {
  getUserMedia,
  getUserMediaTags,
  clearUserMedia,
  deleteUserMedia,
  updateAllMedia,
  updateTags,
} from '../../../modules/mediaLibrary/mediaLibrarySlice'
import CloseIcon from '../CloseIcon/CloseIcon'
import MediaImagesContainer from './MediaImagesContainer'

const MediaWrapper = styled.div`
  width: 90vw;
  position: relative;
  max-width: 1135px;
  padding: 0 15px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  background: #f3f4f8;
  min-height: 700px;
  max-height: 700px;
  overflow-y: auto;
  @media (min-width: 600px) and (max-width: 1024px) {
    /* flex-wrap: wrap; */
  }
  @media (max-width: 991px) {
    min-height: inherit;
    max-height: 80vh;
    overflow-y: auto;
    max-width: 90vw;
    margin: 0 auto;
  }
  @media (max-width: 768px) and (max-width: 991px) {
    width: 80vw;
    max-height: 80vh;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    min-height: 600px;
    width: 80vw;
    max-height: 80vh;
  }
  @media (min-width: 320px) and (max-width: 991px) and (orientation: landscape) {
    min-height: inherit;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
  @media (max-width: 479px) {
    max-width: 80vw;
    margin: 0 auto;
    min-height: inherit;
  }
  @media (min-width: 1199px) {
    max-height: 800px;
    overflow-y: auto;
  }
  .media-library-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`
const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 10px 0px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: normal;
  height: 100%;
  color: #000;
  @media (max-width: 991px) {
    font-size: 18px;
  }
`

const MediaLibrary = ({ closeModal, getUploadedImages, limit, fixedLimit, singleSelection, viewOnly }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['mediaLibrary', 'successResponses', 'translation'])

  const userMedia = useSelector((state) => state.root.mediaLibrary.userMedia)
  const userMediaTags = useSelector((state) => state.root.mediaLibrary.mediaTags)

  const [selectedMedia, setSelectedMedia] = useState(null)

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [tag, setTag] = useState('')

  const [value, setValue] = useState(viewOnly ? 1 : 0)

  const debouncedKeyword = useDebouncedValue(keyword, 1000)

  // state for hold media to be updated
  const [toBeUpdate, setToBeUpdate] = useState([])
  // state for insert media into posts
  const [chooseMedia, setChooseMedia] = useState([])

  // set default selected media
  useEffect(() => {
    if (userMedia && userMedia.photos.length > 0) {
      setSelectedMedia((prevState) => {
        let state = prevState
        if (!prevState || !userMedia.photos.find((o) => o._id === state._id)) {
          state = userMedia.photos[0]
          setChooseMedia([{ _id: state._id, pictureUrl: state.pictureUrl }])
        }
        return state
      })
    } else {
      setSelectedMedia(null)
    }
  }, [userMedia])

  // Get user media
  useEffect(() => {
    if (userMediaTags.length === 0) dispatch(getUserMediaTags())
    dispatch(getUserMedia({ page, keyword: debouncedKeyword, tag }, t))
    // eslint-disable-next-line
  }, [dispatch, page, debouncedKeyword, tag])

  // Clear state
  useEffect(
    () => () => {
      dispatch(clearUserMedia())
    },
    [dispatch]
  )

  // change params value
  const onParamsChange = (name, value) => {
    switch (name) {
      case 'page':
        setPage(value)
        break
      case 'keyword':
        setKeyword(value)
        setPage(1) // reset page
        break
      case 'tag':
        setTag(value)
        setPage(1) // reset page
        break
      default:
        break
    }
  }
  // Handle delete
  const handleDeleteMedia = (mediaId) => {
    dispatch(deleteUserMedia(mediaId, { page, keyword: debouncedKeyword, tag }, setTag, t))
  }
  // change values in selected image
  const handleSelectedMediaUpdate = (property, value) => {
    const selected = cloneDeep(selectedMedia)
    if (property === 'tags') {
      selected['tags'] = uniq([...selected['tags'], value])
    }

    if (property === 'description') {
      selected['description'] = value
    }
    // update selected
    setSelectedMedia(selected)
    // add this to be updated
    const cloned = cloneDeep(toBeUpdate)
    const index = findIndex(cloned, { _id: selected._id })
    if (index === -1) {
      cloned.push(selected)
    } else {
      cloned.splice(index, 1, { ...selected })
    }
    setToBeUpdate(cloned)
  }
  // Update all changed media
  const handleSaveAllClick = () => {
    dispatch(updateAllMedia(toBeUpdate, t))
    dispatch(updateTags())
    setToBeUpdate([])
  }
  // handle media selection
  const handleMediaSelection = (media) => {
    let deselect = false
    const chosen = { _id: media._id, pictureUrl: media.pictureUrl }
    const chosenMedia = cloneDeep(chooseMedia)
    if (!singleSelection) {
      let removed = []
      if (chosenMedia.length > 1) {
        removed = remove(chosenMedia, (o) => o._id === media._id)
      }
      if (!removed.length) {
        /**Push photo in the array else if limit reached-display a toast */
        if (chosenMedia.length < limit) chosenMedia.push(chosen)
        else notifyError(<Trans i18nKey={'limitMoreImages'} values={{ limit }} />)
      } else {
        deselect = true
      }
      setChooseMedia(uniqBy(chosenMedia, '_id'))
    } else {
      setChooseMedia([chosen])
    }

    let editedMedia
    if (!deselect) {
      editedMedia = toBeUpdate.find((o) => o._id === media._id) || media
      setSelectedMedia(editedMedia)
    }
    if (deselect && media._id === selectedMedia._id) {
      editedMedia =
        toBeUpdate.find((o) => chosenMedia[chosenMedia.length - 1]._id === o._id) ||
        userMedia.photos.find((o) => chosenMedia[chosenMedia.length - 1]._id === o._id)
      setSelectedMedia(editedMedia)
    }
  }

  // handle media insert
  const handleMediaInsert = () => {
    getUploadedImages(chooseMedia)
    closeModal()
  }

  // upload image on server
  const uploadImages = async (imagesData) => {
    let formData = new FormData()
    if (imagesData.length > 0) {
      for (let item = 0; item < imagesData.length; item++) {
        formData.append('images', imagesData[item])
      }
    }

    try {
      dispatch(toggleLoading(true))
      const token = localStorage.getItem('auth_token')
      const response = await axios.post(
        process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'user/media-library/upload',
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        getUploadedImages(response.data.data.images)
        if (!viewOnly) closeModal()
        else {
          /**if it is viewOnly open media library tab and call the API to fetch latest media */
          dispatch(getUserMedia({ page, keyword: debouncedKeyword, tag }, t))
          setValue(1)
        }
        dispatch(toggleLoading(false))
      }
    } catch (err) {
      const { status, data } = err.response
      if (status === 400 || status === 500) {
        notifyError(t(`translation:auth.serverResponses.errors.${data.messageCode}`))
      }
      dispatch(toggleLoading(false))
    }
  }

  return (
    <>
      <MediaWrapper>
        <MainHeading>{t(`chooseImage`)} </MainHeading>
        <CloseIcon className="media-library-close" onclick={() => closeModal(false)} />
        <MediaImagesContainer
          userMedia={userMedia}
          userMediaTags={userMediaTags}
          selectedMedia={selectedMedia}
          selectMedia={handleMediaSelection}
          onDeleteClick={handleDeleteMedia}
          onParamsChange={onParamsChange}
          value={value}
          setValue={setValue}
          onSelectedMediaUpdate={handleSelectedMediaUpdate}
          toBeUpdatedItemsCount={toBeUpdate.length}
          chosenMedia={chooseMedia}
          onMediaInsert={handleMediaInsert}
          onSaveAllClick={handleSaveAllClick}
          params={{ tag, keyword, page }}
          setPage={setPage}
          uploadImages={uploadImages}
          limit={limit}
          fixedLimit={fixedLimit}
          singleSelection={singleSelection}
          viewOnly={viewOnly}
        />
      </MediaWrapper>
    </>
  )
}

MediaLibrary.propTypes = {
  closeModal: PropTypes.func,
  getUploadedImages: PropTypes.func,
  limit: PropTypes.number,
  fixedLimit: PropTypes.bool,
  singleSelection: PropTypes.bool,
  viewOnly: PropTypes.bool,
}

export default MediaLibrary

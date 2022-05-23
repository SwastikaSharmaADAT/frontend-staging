import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { capitalizeFirstChar } from '../../../utilities/capitalizeFirstChar'
import { dateFromNow } from '../../../utilities/convertDate'
import { leaveGroup, joinGroup, uploadGroupPhoto } from '../../../modules/groups/groupsSlice'
import ConfirmBox from '../../UI/ConfirmBox'
import UploadPhotoModal from '../../YourProfile/UploadPhotoModal'
import {
  uploadImageToMediaLibrary,
  createImageUrl,
  createResizeImageUrl,
  imageErrorHandler,
} from '../../../utilities/imageUtils'
import Head from 'next/head'
import useTranslateContent from '../../../hooks/useTranslateContent'
import useTranslateArray from '../../../hooks/useTranslateArray'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { upperCase } from 'lodash'


const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 45px 15px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 15px;
  }
`
const LeftHead = styled.div`
  display: flex;
  flex-direction: row;
  max-width: calc(100% - 160px);
  width: 100%;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: inherit;
  }
`
const TopGroupIcon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 14px 0 0;
  &.clickable {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
    margin: 0 0 15px 0;
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    @media (max-width: 500px) {
      width: 80px;
      height: 80px;
    }
  }
`
const GroupNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 120px);
  width: 100%;
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
  }
`

const GroupName = styled.div`
  font-style: normal;
  font-size: 24px;
  line-height: normal;
  margin: 0 0 5px 0;
  color: #000;
  text-transform: uppercase;
  word-break: break-word;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const GroupTimeline = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0 0 2px 0;
  color: #666;
  @media (max-width: 500px) {
    font-size: 12px;
    text-align: center;
  }
`

const RightHead = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  a {
    font-size: 14px;
    text-align: right;
    color: #cccccc;
    cursor: pointer;
    margin: 0 0 5px;
    &.EditLabel {
      font-size: 18px;
      color: #000;
      font-weight: bold;
      cursor: pointer;
      margin: 5px 0 0;
    }
  }
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
    margin: 15px 0 0;
  }
`
const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 14px;
  color: #666;
  @media (max-width: 500px) {
    max-width: inherit;
    align-items: center;
    text-align: center;
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

const ConnectBtn = styled.button`
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  justify-content: center;
  color: #eee;
  background: #222;
  width: auto;
  border: 0;
  padding: 4px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin: 0 0 5px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #222;
    background: #eee;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

const GroupBarHead = () => {
  const { t } = useTranslation(['groupsFeed', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const { groupId } = router.query
  const [showConfirmBox, setConfirmBox] = useState(false)

  const menuRef = useRef(null)
  /**hasProfile should be adjusted to group photo URL coming from API */
  const hasProfilePhoto = useSelector((state) => state.root.groups.groupInfo.profilePicUrl)
  const [uploadMenu, setUploadMenu] = useState(false)
  const [openUploadModal, setUploadModal] = useState(false)
  const [photoVal, setPhotoVal] = useState(null)
  const [photoAction, setPhotoAction] = useState('Upload')
  const [showLastActive, setShowLastActive] = useState(true)

  const groupFeedsCount = useSelector((state) => state.root.groups.groupFeedsCount)
  const loggedInUserType = useSelector((state) => state.root.groups.loggedInUserType)
  const groupInfo = useSelector((state) => state.root.groups.groupInfo)
  const groupMembers = useSelector((state) => state.root.groups.currentPageGroupMembers)
  const groupFeeds = useSelector((state) => state.root.groups.groupFeeds)

  const categoriesLength = groupInfo && groupInfo.categories && groupInfo.categories.length
  const tagsLength = groupInfo && groupInfo.tags && groupInfo.tags.length

  const redirectToEditGroup = () => {
    router.push(`/groups/${groupId}/edit`)
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  /** upload menu outside click handler */
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUploadMenu(false)
    }
  }

  /**Close handler for image upload modal */
  const closeModal = () => {
    setPhotoVal(null)
    setUploadModal(false)
  }

  const applyHandler = async () => {
    /**call the API whne image is uploaded */
    if (photoVal) {
      let image = photoVal.result
      fetch(image)
        .then((res) => res.blob())
        .then(async (blob) => {
          uploadImageToMediaLibrary(blob, photoVal.filename)
          const formD = new FormData()
          formD.append('groupId', groupId)
          formD.append('image', blob, photoVal.filename)
          dispatch(uploadGroupPhoto(formD, false, t))
          closeModal()
        })
    }
  }

  /**on change handler */
  const handleOnChange = (data) => {
    setPhotoVal(data)
  }
  /**method to remove group profile photo */
  const handleRemovePhoto = (e) => {
    e.stopPropagation()
    setUploadMenu(false)
    const remove = true
    const formD = { groupId, image: '' }
    dispatch(uploadGroupPhoto(formD, remove, t))
    closeModal()
  }

  const getMembersCount = () => {
    if (groupMembers && groupMembers.length > 0) {
      return groupMembers.length
    } else if (groupInfo && groupInfo.groupMembers && groupInfo.groupMembers.length > 0) {
      return groupInfo.groupMembers.length
    } else {
      return 0
    }
  }

  // handle leave group action
  const leaveGroupHandler = () => {
    dispatch(leaveGroup(groupId, 'singleGroup', t))
  }

  // handle join group action
  const joinGroupHandler = () => {
    dispatch(joinGroup(groupId, 'singleGroup', t))
  }

  const getLatestPostDate = () => {
    let postDate = ''
    for (let item = 0; item < groupFeeds.length; item++) {
      if (!groupFeeds[item].isModerated) {
        postDate = groupFeeds[item].dateCreated
        break
      }
    }
    if (postDate === '' && groupFeeds.length > 0) {
      setShowLastActive(false)
    }
    return postDate
  }
  // const activeDate = groupFeeds && dateFromNow(getLatestPostDate())
  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  const [privacy, translatePrivacy] =useTranslateContent('')
  // const [lastActive, translateLastActive] = useTranslateContent(activeDate)

  useEffect(() => {
    if(!isEmptyObj(groupInfo)){
      translateTitle(groupInfo.title)
      translatePrivacy(groupInfo.privacy)
      translateDescription(groupInfo.description)
    }
    // translateLastActive(activeDate)
  }, [
    // activeDate,
    groupInfo.description,
    groupInfo.privacy,
    groupInfo.title
  ])
  const [categoryArr, translateCategoryArr] = useTranslateArray(groupInfo && groupInfo.categories, 'title')
  const [tagsArr, translateTagsArr] = useTranslateArray(groupInfo && groupInfo.tags, 'title')
  useEffect(() => {
    translateCategoryArr(groupInfo.categories, 'title')
    translateTagsArr(groupInfo.tags, 'title', 'title')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateCategoryArr, translateTagsArr, groupInfo])
  return (
    <>
      <Head>
        <title>{groupInfo && upperCase(groupInfo.title)} | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      {showConfirmBox && (
        <ConfirmBox
          open={showConfirmBox}
          closeModal={() => setConfirmBox(false)}
          deleteHandler={() => {
            leaveGroupHandler()
            setConfirmBox(false)
          }}
          confirmButtonText={t(`groupBarHead.leave`)}
          heading={t(`groupBarHead.confirmLeave`)}
        />
      )}
      <UploadPhotoModal
        open={openUploadModal}
        closeModal={closeModal}
        type="group"
        action={photoAction}
        value={photoVal}
        onChange={handleOnChange}
        isCover={false}
        applyHandler={applyHandler}
      />
      <GroupBarHeadWrapper>
        <LeftHead>
          <TopGroupIcon
            className={loggedInUserType !== 'guest' ? 'clickable' : null}
            ref={menuRef}
            onClick={() => (loggedInUserType !== 'guest' ? toggleUploadMenu() : null)}
          >
            <img
              src={
                groupInfo && groupInfo.profilePicUrl
                  ? createResizeImageUrl(groupInfo.profilePicUrl, 150, 150, 'profileCover') +
                    '?' +
                    new Date(groupInfo.dateUpdated).getTime()
                  : '/assets/artmo-default.png'
              }
              onError={(e) => {
                const timeSuffix = '?' + new Date(groupInfo.dateUpdated).getTime()
                imageErrorHandler(
                  e,
                  createImageUrl(groupInfo.profilePicUrl),
                  '/assets/artmo-default.png',
                  'profileCover',
                  timeSuffix
                )
              }}
              alt=""
            />

            {uploadMenu && (
              <DropdownContent>
                <ul>
                  {!hasProfilePhoto ? (
                    <li onClick={(e) => handleUploadPhoto(e, 'Upload')}>{t(`groupBarHead.uploadPhoto`)}</li>
                  ) : (
                    <li onClick={(e) => handleUploadPhoto(e, 'Change')}>{t(`groupBarHead.changePhoto`)}</li>
                  )}
                  {hasProfilePhoto && <li onClick={(e) => handleRemovePhoto(e)}>{t(`groupBarHead.removePhoto`)}</li>}
                </ul>
              </DropdownContent>
            )}
          </TopGroupIcon>
          <GroupNameWrap>
            <GroupName>{title?title:groupInfo && groupInfo.title}</GroupName>
            <GroupTimeline>
              {privacy ? capitalizeFirstChar(privacy) : groupInfo && groupInfo.privacy} {t(`groupBarHead.group`)}
            </GroupTimeline>
            <GroupTimeline>
              {groupInfo &&
                groupInfo.categories &&
                groupInfo.categories.length > 0 &&
                categoryArr.map((category, index) => {
                  if (index + 1 === categoriesLength) {
                    return <a key={index}>{category && category.title}</a>
                  } else {
                    return <a key={index}>{category && category.title}, </a>
                  }
                })}
            </GroupTimeline>
            <GroupTimeline>
              {groupInfo &&
                groupInfo.tags &&
                groupInfo.tags.length > 0 &&
                tagsArr.map((tag, index) => {
                  if (index + 1 === tagsLength) {
                    return <a key={index}>{tag && tag.title}</a>
                  } else {
                    return <a key={index}>{tag && tag.title}, </a>
                  }
                })}
            </GroupTimeline>
            <GroupTimeline>{description ? description : groupInfo && groupInfo.description}</GroupTimeline>
          </GroupNameWrap>
        </LeftHead>
        <RightHead>
          {loggedInUserType !== 'guest' && loggedInUserType !== 'admin' && (
            <a onClick={() => setConfirmBox(true)}>{t(`groupBarHead.leaveGroup`)}</a>
          )}
          {groupInfo && groupInfo.privacy === 'public' && loggedInUserType === 'guest' && (
            <ConnectBtn onClick={() => joinGroupHandler()}>{t(`groupBarHead.joinGroup`)}</ConnectBtn>
          )}
          <GroupDiv>
            {groupFeeds && groupFeeds.length > 0 && showLastActive && (
              <span>
                {t(`groupBarHead.lastActive`)}: {groupFeeds && dateFromNow(getLatestPostDate())}
              </span>
            )}
            <span>
              {getMembersCount()} {t(`groupBarHead.members`)}
            </span>
            <span>
              {groupFeedsCount} {t(`groupBarHead.posts`)}
            </span>
          </GroupDiv>
          {loggedInUserType === 'admin' && (
            <a className="EditLabel" onClick={() => redirectToEditGroup()}>
              {t(`groupBarHead.editGroupSettings`)}
            </a>
          )}
        </RightHead>
      </GroupBarHeadWrapper>
    </>
  )
}

export default GroupBarHead

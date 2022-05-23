import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useTranslation } from 'next-i18next'
import { getActivityDate } from '../../../../utilities/convertDate'
import { checkOtherUser } from '../../../../utilities/otherProfile'
import { groupPostAction } from '../../../../modules/groups/groupsSlice'
import Menu from '../PostMenu'
import ConfirmBox from '../../../UI/ConfirmBox'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { useSelector } from 'react-redux'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  /* padding: 12px; for lightbox */
  font-family: 'Montserrat-Regular';
  margin: 15px;
  justify-content: space-between;
`

const ProfileThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 0;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
`
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 50px);
  /* max-width empty for lightbox */
  &.rtl-ar-content {
    direction: rtl;
  }
`

const ProfileName = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 5px 0;
  color: #222;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ProfileTimeline = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0;
  color: #666;
  @media (max-width: 767px) {
    font-size: 12px;
  }
  span {
    text-transform: uppercase;
    margin: 0 0 0 5px;
    font-weight: 100;
    font-family: 'Montserrat-Medium';
    font-size: 16px;
    color: #222;
    @media (max-width: 767px) {
      font-size: 12px;
    }
    a {
      font-weight: 100;
      font-family: 'Montserrat-Medium';
      font-size: 16px;
      color: #222;
      cursor: pointer;
      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
  }
`
const MenuDiv = styled.div`
  cursor: pointer;
  svg {
    font-size: 24px;
  }
`

const LeftWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const RequestBtns = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 15px 0 0;
  }
`
const AcceptBtn = styled.button`
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
  margin: 0 0 0 9px;
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 3px 10px;
  }
`

const RejectBtn = styled.button`
  background: #eee;
  font-style: normal;
  color: #222;
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
`

const PostHeader = ({
  userInfo,
  postDate,
  handleClickOutside,
  toggleActivityMenu,
  isMenuOpen,
  loggedInUsername,
  deleteUserActivity,
  setIsMenuOpen,
  enableDelete,
  postType,
  groupLoggedInUserType,
  item,
  setAddAlbumModal,
  setEditType,
  setEditData,
  setAddPostModal,
setAddVideoModal,
}) => {
  const { t } = useTranslation(['newsFeed', 'successResponses', 'translation'])

  const router = useRouter()
  const dispatch = useDispatch()
  const { username } = router.query

  const [showConfirmBox, setConfirmBox] = useState(false)

  const redirectToUserProfile = (user) => {
    router.push(`/user/${user}`)
  }

  const acceptRejectPost = (groupId, activityId, type) => {
    dispatch(groupPostAction(groupId, activityId, type, t))
  }
  const title =
    userInfo.firstName && userInfo.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`
      : userInfo.firstName
      ? userInfo.firstName
      : userInfo.username
  const dateOfActivity = postType === 'groupfeed' ? getActivityDate(item.dateUpdated) : getActivityDate(postDate)
  const [headerTitle, translateHeaderTitle] =useTranslateContent('')
  const [date, translateDate] =useTranslateContent('')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if(!isEmptyObj(userInfo))
    translateHeaderTitle(title)
    translateDate(dateOfActivity)
  }, [dateOfActivity, title])
  return (
    <>
      {showConfirmBox && (
        <ConfirmBox
          open={showConfirmBox}
          closeModal={() => setConfirmBox(false)}
          deleteHandler={() => {
            deleteUserActivity()
            setConfirmBox(false)
          }}
          heading={t(`singlePost.deleteActivity`)}
        />
      )}
      <ProfileNameHeader>
        <LeftWrap>
        <ProfileThumb onClick={() => redirectToUserProfile(userInfo.username)}>
            <img
              src={
                userInfo.profilePicUrl
                  ? createResizeImageUrl(userInfo.profilePicUrl, 50, 50, 'profileCover') +
                    '?' +
                    new Date(userInfo.dateUpdated).getTime()
                  : '/assets/artmo-default.png'
              }
              onError={(e) => {
                const timeSuffix = '?' + new Date(userInfo.dateUpdated).getTime()
                imageErrorHandler(
                  e,
                  createImageUrl(userInfo.profilePicUrl),
                  '/assets/artmo-default.png',
                  'profileCover',
                  timeSuffix
                )
              }}
              alt=""
            />
          </ProfileThumb>
          <ProfileNameWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <ProfileName onClick={() => redirectToUserProfile(userInfo.username)}>{headerTitle ? headerTitle : title}</ProfileName>
            <ProfileTimeline>
              {date ? date : dateOfActivity}
              {postType === 'groupfeed' &&
                item.isModerated &&
                (groupLoggedInUserType === 'admin' || groupLoggedInUserType === 'moderator') && (
                  <span>
                    <a>{t(`singlePost.pending`)}</a>
                  </span>
                )}
            </ProfileTimeline>
          </ProfileNameWrap>
        </LeftWrap>
        {userInfo.username === loggedInUsername && !checkOtherUser(username) && (
          <MenuDiv onClick={() => toggleActivityMenu()}>
            <HiDotsHorizontal />
            <div>
              {isMenuOpen && (
                <Menu
                  postType={postType}
                  setEditData={setEditData}
                  setEditType={setEditType}
                  setAddAlbumModal={setAddAlbumModal}
                  setAddPostModal={setAddPostModal}
                  setAddVideoModal={setAddVideoModal}
                  item={item}
                  handleClickOutside={handleClickOutside}
                  setIsMenuOpen={setIsMenuOpen}
                  setConfirmBox={setConfirmBox}
                  showConfirmBox={showConfirmBox}
                />
              )}
            </div>
          </MenuDiv>
        )}
        {postType === 'groupfeed' &&
          item.isModerated &&
          (groupLoggedInUserType === 'admin' || groupLoggedInUserType === 'moderator') && (
            <RequestBtns>
              <RejectBtn onClick={() => acceptRejectPost(item.groupId, item._id, 'reject')}>
                {t(`singlePost.reject`)}
              </RejectBtn>
              <AcceptBtn onClick={() => acceptRejectPost(item.groupId, item._id, 'accept')}>
                {t(`singlePost.accept`)}
              </AcceptBtn>
            </RequestBtns>
          )}
      </ProfileNameHeader>
    </>
  )
}

PostHeader.propTypes = {
  userInfo: PropTypes.object,
  postDate: PropTypes.string,
  handleClickOutside: PropTypes.func,
  toggleActivityMenu: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  loggedInUsername: PropTypes.string,
  deleteUserActivity: PropTypes.func,
  setIsMenuOpen: PropTypes.func,
  enableDelete: PropTypes.bool,
  postType: PropTypes.string,
  groupLoggedInUserType: PropTypes.string,
  item: PropTypes.object,
  setAddAlbumModal: PropTypes.func,
  setEditType: PropTypes.func,
  setEditData: PropTypes.func,
}

export default PostHeader

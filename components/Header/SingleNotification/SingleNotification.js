import React, { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeNotification } from '../../../modules/notifications/notificationSlice'
import { getGroups } from '../../../modules/groups/groupsSlice'
import { getActivityDate } from '../../../utilities/convertDate'
import { isLoginToken } from '../../../utilities/authUtils'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { contactsToggler } from '../../../modules/messages/messagesSlice'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const NotiWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 !important;
  justify-content: space-between;
  @media (max-width: 767px) {
    width: 100%;
  }
`
const UserNotiImg = styled.div`
  width: 30px;
  height: 30px;
  margin: 2px 0 0 !important;
  img {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    max-width: inherit !important;
  }
`
const NotiNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 210px;
  width: 100%;
  margin: 0 !important;
`
const TopDiv = styled.div`
  font-size: 14px;
  color: #666;
  margin: 0 0 4px !important;
  line-height: normal;
  @media (max-width: 767px) {
    font-size: 11px;
    flex-direction: column;
  }
  b {
    color: #222;
    margin-right: 4px;
  }
`
const DateTimeDiv = styled.div`
  font-size: 12px;
  color: #666;
  margin: 0 !important;
  @media (max-width: 767px) {
    font-size: 11px;
  }
`
const CloseNoti = styled.div`
  font-size: 12px;
  color: #000;
  margin: 0 !important;
  display: flex;
  align-items: center;
  svg {
    font-size: 14px;
    color: #666;
  }
`
/**
 *
 * @param {object} param0
 * @returns single notification body
 */
function SingleNotification({ notification }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const {t} =useTranslation(['translation','successResponses'])
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const getType = (model) => {
    if (model === 'userPosts') return 'post'
    else if (model === 'videos') return 'video'
    else if (model === 'albums') return 'album'
    else if (model === 'potds') return 'potd'
    else if (model === 'buzzs') return 'buzz'
    else if (model === 'exhibitions') return 'exhibition'
    else if (model === 'artworks') return 'artwork'
  }
  const activityRedirect = () => {
    const type = getType(notification.onModel)
    if (type === 'artwork') {
      if (
        notification &&
        notification.activity &&
        notification.activity.moderated &&
        notification.activity.moderated === -1
      ) {
        router.push(`/artworks/edit/${notification.activity.productSlug}`)
      } else {
        router.push(`/artworks/${notification.activity.productSlug}`)
      }
    } else if (type === 'buzz') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'potd') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'exhibition') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'post'){
      if(notification.activity && notification.activity.userId && notification.activity.userId)
      router.push(`/${notification.activity.userId.username}/${type}/${notification.activity._id}`)
    }
    else if (type === 'video'){
    if(notification.activity && notification.activity.userId && notification.activity.userId)
      router.push(`/${notification.activity.userId.username}/${type}/${notification.activity._id}`)
    }
    else if (type === 'album'){
    if(notification.activity && notification.activity.userId && notification.activity.userId)
      router.push(`/${notification.activity.userId.username}/${type}/${notification.activity._id}`)
    }
    else return
  }
  const groupActivityRedirect = () => {
    router.push(`/groups`)
  }
  const messageClickHandler = async () => {
    const { _id } = notification.userIdSender
    const params = router.query
    params.userId=_id
    router.push({ pathname: '/messages', query: params })
    if (router.pathname.includes('/messages')) dispatch(contactsToggler(true))
  }
  /**handles onClick event on notifications and redirect accordingly */
  const notificationClickHandler = () => {
    //deleted user case
    if(notification && !notification.userIdSender) return
    if (notification.notificationType.title === 'activity') activityRedirect()
    if (notification.notificationType.title === 'newConversation') messageClickHandler()
    if (notification.notificationType.title === 'groupActivity') groupActivityRedirect()
    if (notification.notificationType.title === 'groupInvitation') {
      if (router.pathname.includes('/groups') && isLoginToken()) {
        dispatch(getGroups({ ownGroups: true, page: 1 }, 'own',t))
        dispatch(getGroups({ page: 1 }, 'all',t))
      }
      router.push(`/groups`)
    }
    if (notification.notificationType.title === 'viewProfile')
      router.push(`/user/${notification.userIdSender.username}`)
    else if (notification.notificationType.title === 'connection') router.push(`/user/${loggedInUsername}/connections`)
    else if (notification.notificationType.title === 'follow')
      router.push(`/user/${notification.userIdSender.username}`)
  }

  /**handles remove notification */
  const removeNotificationHandler = (e) => {
    e.stopPropagation()
    dispatch(removeNotification({data:{ _id: notification._id },t}))
  }
  const sender =
    notification && notification.userIdSender && notification.userIdSender.firstName
      ? notification.userIdSender.firstName + ' ' + notification.userIdSender.lastName
      : notification && notification.userIdSender && notification.userIdSender.username
  const timeStamp = getActivityDate(notification.dateCreated)
  const [content, translateContent] =useTranslateContent('')
  const [senderName, translateSender] =useTranslateContent('')
  const [notificationDate, translateNotificationDate] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(notification))
    translateContent(notification.content)
    translateSender(sender)
    translateNotificationDate(timeStamp)
  }, [notification.content, sender, timeStamp])
  return (
    <div className="list-item">
      <NotiWrap>
        <UserNotiImg onClick={notificationClickHandler} key={notification._id}>
          <img
            src={
              notification && notification.userIdSender && notification.userIdSender.profilePicUrl
                ? createResizeImageUrl(notification.userIdSender.profilePicUrl, 50, 50, 'profileCover')
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(notification.userIdSender.profilePicUrl),
                '/assets/artmo-default.png',
                'profileCover',
                ''
              )
            }}

            alt=""
          />
        </UserNotiImg>
        <NotiNameWrap>
          <TopDiv onClick={notificationClickHandler} key={notification._id}>
            <b> {sender ? sender : t('auth.deletedUser')}</b> {content ? content : notification && notification.content}
          </TopDiv>
          <DateTimeDiv>{notificationDate ? notificationDate : notification && timeStamp} </DateTimeDiv>
        </NotiNameWrap>
        <CloseNoti>
          <IoCloseOutline onClick={removeNotificationHandler} size={'24px'} />
        </CloseNoti>
      </NotiWrap>
    </div>
  )
}
SingleNotification.propTypes = {
  notification: PropTypes.object,
}
export default SingleNotification

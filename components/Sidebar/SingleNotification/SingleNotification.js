import React, { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter} from 'next/router'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import ProfileImg from '../../../public/assets/artmo-default.png'
import { removeNotification } from '../../../modules/notifications/notificationSlice'
import { getGroups } from '../../../modules/groups/groupsSlice'
import { getActivityDate } from '../../../utilities/convertDate'
import { isLoginToken } from '../../../utilities/authUtils'
import { createImageUrl, showDefaultImg } from '../../../utilities/imageUtils'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { initiateNewThread, getListConversations } from '../../../modules/messages/messagesSlice'
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
  
  const pathname = router.pathname

  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

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
    if (type === 'artwork') router.push(`/artworks/${notification.activity.productSlug}`)
    else if (type === 'buzz') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'potd') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'exhibition') router.push(`/${type}/${notification.activity.articleSlug}`)
    else if (type === 'post')
    router.push(`/${notification.userIdSender.username}/${type}/${notification.activity._id}`)
    else if (type === 'video')
    router.push(`/${notification.userIdSender.username}/${type}/${notification.activity._id}`)
    else if (type === 'album')
    router.push(`/${notification.userIdSender.username}/${type}/${notification.activity._id}`)
    else return
  }
  const groupActivityRedirect = () => {
    router.push(`/groups`)
  }
  const messageClickHandler = async () => {
    //const params = new URLSearchParams()
    const params = router.query
    const { profilePicUrl, firstName, lastName, username, _id } = notification.userIdSender
    const uuid = _id
    const resultAction = await dispatch(
      getListConversations({
        toMessage: uuid,
        offset: 0,
        limit: 20,
      })
    )
    const result = await unwrapResult(resultAction)
    if (result.data.data.chatThreadExist) {
      if (result.data.data.conversations.find((convo) => convo.receiverUser._id === uuid.toString())) {
        params.append('userId', uuid)
        router.push({ pathname: '/messages', search: params.toString() })
      } else {
        await dispatch(initiateNewThread({ profilePicUrl, firstName, lastName, username, uuid, temp: true }))
        params.append('userId', uuid)
        params.append('redirectFromProfile', uuid)
        router.push({ pathname: '/messages', search: params.toString() })
      }
      return
    }

    await dispatch(initiateNewThread({ profilePicUrl, firstName, lastName, username, uuid, temp: true }))
    params.append('userId', uuid)
    params.append('redirectFromProfile', uuid)
    router.push({ pathname: '/messages', search: params.toString() })
  }
  /**handles onClick event on notifications and redirect accordingly */
  const notificationClickHandler = () => {
    if (notification.notificationType.title === 'activity') activityRedirect()
    if (notification.notificationType.title === 'newConversation') messageClickHandler()
    if (notification.notificationType.title === 'groupActivity') groupActivityRedirect()
    if (notification.notificationType.title === 'groupInvitation') {
      if (pathname.includes('/groups') && isLoginToken()) {
        dispatch(getGroups({ ownGroups: true, page: 1 }, 'own'))
        dispatch(getGroups({ page: 1 }, 'all'))
      }
      router.push(`/groups`)
    }
    if (notification.notificationType.title === 'viewProfile')
    router.push(`/user/${notification.userIdSender.username}`)
    else if (notification.notificationType.title === 'connection') router.push(`/user/${loggedInUsername}/connections`)
    else if (notification.notificationType.title === 'follow')
    router.push(`/user/${notification.userIdSender.username}`)
    else {
    }
  }

  /**handles remove notification */
  const removeNotificationHandler = (e) => {
    e.stopPropagation()
    dispatch(removeNotification({ _id: notification._id }))
  }
  const sender =
    notification && notification.userIdSender && notification.userIdSender.firstName
      ? notification.userIdSender.firstName + ' ' + notification.userIdSender.lastName
      : notification.userIdSender.username
  const timeStamp = getActivityDate(notification.dateCreated)
  const [content, translateContent] =useTranslateContent('')
  const [senderName, translateSender] =useTranslateContent('')
  const [notificationDate, translateNotificationDate] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(notification)){
      translateContent(notification.content)
      translateSender(sender)
      translateNotificationDate(timeStamp)
    }
  }, [notification.content, sender, timeStamp])
  return (
    <div className="list-item">
      <NotiWrap>
        <UserNotiImg onClick={notificationClickHandler} key={notification._id}>
          <img
            src={
              notification && notification.userIdSender && notification.userIdSender.profilePicUrl
                ? createImageUrl(notification.userIdSender.profilePicUrl)
                : ProfileImg
            }
            onError={(e) => showDefaultImg(e, ProfileImg)}
            alt=""
          />
        </UserNotiImg>
        <NotiNameWrap>
          <TopDiv onClick={notificationClickHandler} key={notification._id}>
            <b> {senderName? senderName: sender }</b> {content ? content : notification && notification.content}
          </TopDiv>
          <DateTimeDiv>{notificationDate ? notificationDate : timeStamp} </DateTimeDiv>
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

import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

import { useDispatch, useSelector } from 'react-redux'

import { useRouter } from 'next/router'
import arrowImage from '../../../public/assets/Polygon.png'

import NotificationSettingIcon from '../../../public/assets/notification-setting-icon.png'
import { getNotifications, setWebNoti } from '../../../modules/notifications/notificationSlice'
import SingleNotification from '../SingleNotification/SingleNotification'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  min-width: 315px;
  overflow: auto;
  p {
    color: #222;
  }

  &.header-sub-menu {
    @media (max-width: 767px) {
      display: flex !important;
      flex-direction: column;
    }
    div {
      @media (max-width: 767px) {
        display: flex !important;
      }
    }
  }
  .infinite-scroll-component {
    cursor: default;
    .end-message-container {
      cursor: default;
      margin: auto;
      p {
        color: #222;
        cursor: default;
      }
      @media (max-width: 767px) {
        justify-content: center;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      width: 100%;
    }
  }

  @media (max-width: 479px) {
    min-width: 300px;
  }
  .list-ul {
    list-style: none;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column !important;
    max-height: 222px;
    overflow: auto;
    .end-message {
      cursor: auto;
    }
    ::-webkit-scrollbar {
      width: 8px;
      margin-right: 1px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(241, 241, 241, 0.233);
    }

    ::-webkit-scrollbar-thumb {
      background: #222;
      cursor: pointer;
    }
  }

  /* overflow-x: hidden;
    overflow-y: auto; */
  .list-item {
    color: #666;
    text-align: left !important;
    padding: 10px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #eee;
    justify-content: flex-start !important;
    margin: 0;

    cursor: pointer;
    :hover {
      background-color: #eaeaea;
    }
    a {
      color: #666 !important;
    }
  }
`
const NotificationTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px 0 !important;
  align-items: center;
  min-height: 40px;
  cursor: auto;
  padding: 0 10px;
  border-bottom: 1px solid #eeeeee;
  img {
    max-width: 19px !important;
    margin: 0 !important;
    cursor: pointer;
  }
`

const HeadingSec = styled.div`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-size: 20px;
  line-height: normal;
  margin: 0 0 0 0;
  color: #222;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

/**This component renders notification menu */
export default function NoificationMenu() {

  const { t } = useTranslation(['translation', 'sidebar'])


  const router = useRouter() 
  const dispatch = useDispatch()
  const { notifications, metadata, notificationsLoader } = useSelector((state) => state.root.notifications)
  const [hasMore, setHasMore] = useState(true)
  const pathname = router.pathname
  /**method to fetch more notifications once user reaches bottom of div */
  const fetchData = async () => {
    if (notifications.length < metadata.total) {
      dispatch(getNotifications({ offset: notifications.length }))
    } else setHasMore(false)
  }

  useEffect(() => {
    /**fetch notifications, on login */
    dispatch(getNotifications({ offset: 0 }))
  }, [dispatch])

  const redirectToSettings = () => {
    if (pathname.includes('/myaccount')) dispatch(setWebNoti(true))
    router.push('/myaccount?web=true')
  }
  return (
    <DropdownContent className="header-sub-menu">
      <NotificationTopBar onClick={redirectToSettings}>
        <HeadingSec>{t(`sidebar:notifications`)}</HeadingSec>
        <img src="/assets/notification-setting-icon.png" alt="" />
      </NotificationTopBar>

      {notificationsLoader ? (
        <GhostLoader notification />
      ) : (
        <div id="noti" className="list-ul">
          {notifications && notifications.length > 0 ? (
            <InfiniteScroll
              scrollableTarget={'noti'}
              dataLength={notifications.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<GhostLoader notification />}
              endMessage={
                notifications && notifications.length > 3 && <EndMessage className="end-message" notificationFetch />
              }
            >
              {notifications.map((notification, ind) => (
                <SingleNotification notification={notification} key={ind} />
              ))}
            </InfiniteScroll>
          ) : (
            <EndMessage className="end-message" noNotifications />
          )}
        </div>
      )}
    </DropdownContent>
  )
}
NoificationMenu.propTypes = {
  props: PropTypes.object,
}

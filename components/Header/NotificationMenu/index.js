import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications, setWebNoti } from '../../../modules/notifications/notificationSlice'
import SingleNotification from '../SingleNotification/SingleNotification'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  min-width: 315px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 66px;
  overflow: visible;
  margin: 0 !important;
  p {
    color: #222;
  }
  &.header-sub-menu {
    @media (min-width: 1025px) {
      top: 70px;
    }
    @media (max-width: 767px) {
      display: flex !important;
      flex-direction: column;
      top: 50px;
      right: -138px;
    }
    :before {
      @media (max-width: 767px) {
        left: 148px;
        top: -8px;
      }
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
    right: 5px;
  }
  :before {
    background: url('/assets/Polygon.png') no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -8px;
    position: relative;
    display: flex;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 767px) {
      left: 63px;
      margin: inherit;
      top: -11px;
    }
  }
  .list-ul {
    list-style: none;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column !important;
    margin-top: -14px;
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
  margin: -15px 0 15px 0 !important;
  justify-content: space-between;
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
  font-size: 18px;
  line-height: normal;
  margin: 0 !important;
  color: #222;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

/**This component renders notification menu */
export default function NoificationMenu(props) {
  const { t } = useTranslation(['translation'])
  const router = useRouter()
  const dispatch = useDispatch()
  const { notifications, metadata, notificationsLoader } = useSelector((state) => state.root.notifications)
  const [hasMore, setHasMore] = useState(true)
  
  /**method to fetch more notifications once user reaches bottom of div */
  const fetchData = async () => {
    if (notifications.length < metadata.total) {
      dispatch(getNotifications({ data: { offset: notifications.length }, t }))
    } else setHasMore(false)
  }

  useEffect(() => {
    /**fetch notifications, on login */
    dispatch(getNotifications({ data: { offset: 0 }, t }))
  }, [dispatch])

  const redirectToSettings = (e) => {
    e.stopPropagation()
    if (router.pathname.includes('/myaccount')) dispatch(setWebNoti(true))
    router.push('/myaccount?web=true')
    props.props.setNotiMenu(false)
  }
  return (
    <DropdownContent className="header-sub-menu">
      <NotificationTopBar onClick={redirectToSettings}>
        <HeadingSec>{t(`header:loginMenu.notifications`)}</HeadingSec>
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

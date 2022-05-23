import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
/**
 * @description:This function displays bottom text of news Feed depending on prop postFetch
 * @param {boolean} postFetch
 * @returns
 */
function EndMessage(props) {
  const { t } = useTranslation('translation')

  return (
    <div className="end-message-container">
      {props.postFetch ? (
        <p style={{ textAlign: 'center' }}>
          <b>
            {props.type ? (
              t('pagination.noTypeLoaded',{type: props.type })
            ) : (
              t(`pagination.loadedFeeds`)
            )}
          </b>
        </p>
      ) : props.noVideos ? (
        <p style={{ textAlign: 'center' }}>
          <b>{t(`pagination.noVideos`)}</b>
        </p>
      ) : props.videoFetch ? (
        <p style={{ textAlign: 'center' }}>
          <b>{t(`pagination.loadedVideos`)}</b>
        </p>
      ) : props.noArtworks ? (
        <p style={{ textAlign: 'center' }}>
          <b>{t(`pagination.noArtworks`)}</b>
        </p>
      ) : props.artworksFetch ? (
        <p style={{ textAlign: 'center' }}>
          <b>{t(`pagination.loadedArtworks`)}</b>
        </p>
      ) : props.notificationFetch ? (
        <p {...props} style={{ textAlign: 'center' }}>
          <b>{t(`pagination.noMoreNotifications`)}</b>
        </p>
      ) : props.noNotifications ? (
        <p {...props} style={{ textAlign: 'center', margin: '10px auto' }}>
          <b>{t(`pagination.noNotifications`)}</b>
        </p>
      ) : props.conversationsFetch ? (
        <p {...props} style={{ textAlign: 'center' }}>
          <b>{t(`pagination.noMoreConversations`)}</b>
        </p>
      ) : props.noConversations ? (
        <p {...props} style={{ textAlign: 'center', margin: '10px auto' }}>
          <b>{t(`pagination.noConversations`)}</b>
        </p>
      ) : (
        <p style={{ textAlign: 'center' }}>
          <b>
            {props.type ? (
              t('pagination.noTypeShow',{type: props.type })
            ) : (
              t(`pagination.noActivities`)
            )}
          </b>
        </p>
      )}
    </div>
  )
}
EndMessage.propTypes = {
  postFetch: PropTypes.bool,
  videoFetch: PropTypes.bool,
  noVideos: PropTypes.bool,
  notificationFetch: PropTypes.bool,
  noNotifications: PropTypes.bool,
  type: PropTypes.string,
  noArtworks: PropTypes.bool,
  artworksFetch: PropTypes.bool,
  noConversations: PropTypes.bool,
  conversationsFetch: PropTypes.bool,
}
export default EndMessage

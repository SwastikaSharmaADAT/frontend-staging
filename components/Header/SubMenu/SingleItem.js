import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

function SingleItem({ page, switchToPageHandler }) {
  const [pagename, translatePagename] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(page))
    translatePagename(page && page.pageUserId && page.pageUserId.firstName)
  }, [page])

  if (!isEmptyObj(page) && page.pageUserId !== null && !isEmptyObj(page.pageUserId)) {
    return (
      <div className="list-item page-list" key={page._id} onClick={() => switchToPageHandler(page.pageUserId._id, page.pageUserId.firstName)}>
        <img
          className="PageImgNav"
          src={
            page && page.pageUserId && page.pageUserId.profilePicUrl
              ? createResizeImageUrl(page.pageUserId.profilePicUrl, 50, 50, 'profileCover') +
                '?' +
                new Date(page.pageUserId.dateUpdated).getTime()
              : '/assets/artmo-default.png'
          }
          onError={(e) => {
            const timeSuffix = '?' + new Date(page.pageUserId.dateUpdated).getTime()
            imageErrorHandler(
              e,
              createImageUrl(page.pageUserId.profilePicUrl),
              '/assets/artmo-default.png',
              'profileCover',
              timeSuffix
            )
          }}
          alt="PageImg"
        />
        <div className="page-title"> {pagename ? pagename : page && page.pageUserId && page.pageUserId.firstName} </div>
      </div>
    )
  } else {
    return null
  }
}
SingleItem.propTypes = {
  props: PropTypes.object,
}
export default SingleItem
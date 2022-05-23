import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import artmoDefault from '../../../public/assets/artmo-default.png'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { createImageUrl, showDefaultImg } from '../../../utilities/imageUtils'

function SingleItem({ page, switchToPageHandler }) {
  const [pagename, translatePagename] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(page))
    translatePagename(page.pageUserId.firstName)
  }, [page.pageUserId.firstName])

  if (!isEmptyObj(page) && page.pageUserId !== null && !isEmptyObj(page.pageUserId)) {
    return (
      <div className="list-item page-list" key={page._id} onClick={() => switchToPageHandler(page.pageUserId._id, page.pageUserId.firstName)}>
        <img
          className="PageImgNav"
          src={
            page.pageUserId.profilePicUrl
              ? createImageUrl(page.pageUserId.profilePicUrl) + '?' + new Date(page.pageUserId.dateUpdated).getTime()
              : artmoDefault
          }
          onError={(e) => showDefaultImg(e, artmoDefault)}
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

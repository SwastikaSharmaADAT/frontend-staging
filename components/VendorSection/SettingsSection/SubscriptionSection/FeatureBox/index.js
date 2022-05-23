import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { ColsListing, ColsListingText, ImgDiv } from '../../../styled.js'
import useTranslateContent from '../../../../../hooks/useTranslateContent.js'
import { isEmptyObj } from '../../../../../utilities/checkEmptyObject.js'

function FeatureBox({ cat }) {
  /**get subscription details from redux */
  const vendorSubscription = useSelector((state) => state.root.dashboard.settings.vendorSubscription)
  const [text, translateText] = useTranslateContent('')

  useEffect(() => {
    if (!isEmptyObj(cat)) translateText(cat.title)
  }, [cat.title])
  return (
    <ColsListing key={cat._id}>
      <ColsListingText>{ReactHtmlParser(text ? text : cat && cat.title)}</ColsListingText>
      <ImgDiv>
        <img
          src={
            cat.subscriptionIds.includes(vendorSubscription.userSubscription.subscription._id)
              ? '/assets/green-tick.png'
              : '/assets/red_cross.png'
          }
          alt=""
        />
      </ImgDiv>
    </ColsListing>
  )
}
FeatureBox.propTypes = {
  cat: PropTypes.object,
}
export default FeatureBox

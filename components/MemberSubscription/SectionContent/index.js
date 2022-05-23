import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { SectionContentWrapper } from '../styled.js'
import PlanSubcription from '../PlanSubcription'
import FAQSection from '../../ArtistSubscription/FAQSection'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import { useTranslation } from 'next-i18next'

const SectionContent = ({ userCountry, isArtist }) => {
  const dispatch = useDispatch()
  const {t} =useTranslation
  const subscriptionContent = useSelector((state) => state.root.staticContent.subscriptionContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('FAQ_cancel_refund', t, 'subscriptionPage', 'faqCancelRefund'))
    dispatch(getContent('FAQ_publish_sell', t, 'subscriptionPage', 'faqPublishSell'))
    dispatch(getContent('FAQ_for_selling', t, 'subscriptionPage', 'faqForSelling'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <SectionContentWrapper>
        <PlanSubcription userCountry={userCountry} isArtist={isArtist} />
        <FAQSection subscriptionContent={subscriptionContent} artistType={false} />
      </SectionContentWrapper>
    </>
  )
}

SectionContent.propTypes = {
  userCountry: PropTypes.string,
  isArtist: PropTypes.bool,
}

export default SectionContent

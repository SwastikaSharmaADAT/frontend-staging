import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { SectionContentWrapper, SectionRow, SectionHalfCols, TopHeading, TopDescription } from '../styled.js'
import PlanSubcription from '../PlanSubcription'
import FAQSection from '../FAQSection'
import { getContent } from '../../../modules/staticContent/staticContentSlice'

const SectionContent = ({ userCountry,isArtist }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['subscriptions','translation'])
  const subscriptionContent = useSelector((state) => state.root.staticContent.subscriptionContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('Artist_gateway_charges', t, 'subscriptionPage', 'artistGatewayCharges'))
    dispatch(getContent('Artist_refund', t, 'subscriptionPage', 'artistRefund'))
    dispatch(getContent('Artist_basic_plan_free', t, 'subscriptionPage', 'artistBasicPlanFree'))
    dispatch(getContent('Artist_connect_collectors', t, 'subscriptionPage', 'artistConnectCollectors'))
    dispatch(getContent('FAQ_cancel_refund', t,  'subscriptionPage', 'faqCancelRefund'))
    dispatch(getContent('FAQ_publish_sell', t, 'subscriptionPage', 'faqPublishSell'))
    dispatch(getContent('FAQ_for_selling', t, 'subscriptionPage', 'faqForSelling'))
    dispatch(getContent('FAQ_subscription_fee', t, 'subscriptionPage', 'faqSubscriptionFee'))
    dispatch(getContent('FAQ_basic_account', t, 'subscriptionPage', 'faqBasicAccount'))
    dispatch(getContent('FAQ_no_commission', t, 'subscriptionPage', 'faqNoCommision'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <SectionContentWrapper>
        <PlanSubcription userCountry={userCountry} isArtist={isArtist} />
        <FAQSection subscriptionContent={subscriptionContent} artistType={true} />
      </SectionContentWrapper>
    </>
  )
}

SectionContent.propTypes = {
  userCountry: PropTypes.string,
  isArtist: PropTypes.string,
}

export default SectionContent

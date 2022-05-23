import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import { FullWidthWhiteBG, ColumnOneContainer, ColumnOne, ColumnHeading, ColumnPara } from '../styled.js'
import ReactVivus from 'react-vivus';

import icon1 from '../../../public/assets/vendor_icon1.svg';
import icon2 from '../../../public/assets/vendor_icon2.svg';
import icon3 from '../../../public/assets/vendor_icon3.svg';
import icon4 from '../../../public/assets/vendor_icon4.svg';

const BannerHead = ({ isArtist }) => {
  const dispatch = useDispatch()
  const subscriptionContent = useSelector((state) => state.root.staticContent.subscriptionContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const { t } = useTranslation(['subscriptions','translation'])
  useEffect(() => {
    if (isArtist) {
      dispatch(getContent('Artist_gateway_charges', t, 'subscriptionPage', 'artistGatewayCharges'))
      dispatch(getContent('Artist_refund', t, 'subscriptionPage', 'artistRefund'))
      dispatch(getContent('Artist_basic_plan_free', t, 'subscriptionPage', 'artistBasicPlanFree'))
      dispatch(getContent('Artist_connect_collectors', t, 'subscriptionPage', 'artistConnectCollectors'))
    } else {
      dispatch(getContent('Member_plus_plan', t, 'subscriptionPage', 'memberPlusPlan'))
      dispatch(getContent('Member_pro_plan', t, 'subscriptionPage', 'memberProPlan'))
      dispatch(getContent('Member_lifetime_plan', t, 'subscriptionPage', 'memberLifetimePlan'))
      dispatch(getContent('Member_gateway_charges', t, 'subscriptionPage', 'memberGatewayCharges'))
      dispatch(getContent('Member_refund', t, 'subscriptionPage', 'memberRefund'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage, isArtist])

  const renderSection = (title, desc, icon) => (
    <>
      <ColumnOne>
        <ReactVivus
          id={title}
          option={{
            file: icon,
            animTimingFunction: 'EASE',
            type: 'oneByOne',
            onReady: console.log
          }}
          style={{ height: '100px', width: '100px' }}
          callback={console.log}
        />
        <ColumnHeading>{title}</ColumnHeading>
        <ColumnPara>{desc}</ColumnPara>
      </ColumnOne>
    </>
  )

  return (
    <>
      <FullWidthWhiteBG>
        <ColumnOneContainer>
          {isArtist ? (
            <>
              {renderSection(
                t(`subscriptions:artistPage.sectionLabels.sellCommissionFree`),
                ReactHtmlParser(subscriptionContent['artistGatewayCharges']),
                'assets/vendor_icon1.svg'
              )}
              {renderSection(
                t(`subscriptions:artistPage.sectionLabels.connectWithCollectors`),
                ReactHtmlParser(subscriptionContent['artistConnectCollectors']),
                'assets/vendor_icon2.svg'
              )}
              {renderSection(
                t(`subscriptions:artistPage.sectionLabels.cancelSubscription`),
                ReactHtmlParser(subscriptionContent['artistRefund']),
                'assets/vendor_icon3.svg'
              )}
              {renderSection(
                t(`subscriptions:artistPage.sectionLabels.basicPlan`),
                ReactHtmlParser(subscriptionContent['artistBasicPlanFree']),
                'assets/vendor_icon4.svg'
              )}
            </>
          ) : (
            <>
              {renderSection(
                t(`subscriptions:memberPage.planLabels.plus`),
                ReactHtmlParser(subscriptionContent['memberPlusPlan']),
                'assets/vendor_icon1.svg'
              )}
              {renderSection(
                t(`subscriptions:memberPage.planLabels.pro`),
                ReactHtmlParser(subscriptionContent['memberProPlan']),
                'assets/vendor_icon2.svg'
              )}
              {renderSection(
                t(`subscriptions:memberPage.planLabels.lifetime`),
                ReactHtmlParser(subscriptionContent['memberLifetimePlan']),
                'assets/vendor_icon3.svg'
              )}
            </>
          )}
        </ColumnOneContainer>
      </FullWidthWhiteBG>

    </>
  )
}
BannerHead.propTypes = {
  isArtist: PropTypes.bool,
}

export default BannerHead

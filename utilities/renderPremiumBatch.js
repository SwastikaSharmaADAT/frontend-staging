import premiumBadge from '../public/assets/badge_gold.png'
import { isEmptyObj } from '../utilities/checkEmptyObject'

const renderPremiumBatch = (subscription, badge) => {
  if (!subscription || isEmptyObj(subscription)) return
  if (
    (subscription.title === 'basic' && subscription.role === 'artist') ||
    (subscription.title === 'plus' && subscription.role === 'member')
  )
    return

  return (
    <>
      {' '}
      <img width="17px" height="16px" src={badge ? badge : '/assets/badge_gold.png'} alt="premiumBadge" />
    </>
  )
}
export default renderPremiumBatch

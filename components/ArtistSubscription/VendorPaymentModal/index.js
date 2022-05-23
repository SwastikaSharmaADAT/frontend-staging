import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { ModalWrapper, HeaderBar, MiddleSection, PaymentPrice } from '../styled.js'
import Button from '../../UI/Button'
import { capitalizeFirstChar } from '../../../utilities/capitalizeFirstChar'
import { decimalSeparatorMethod } from '../../../utilities/decimalSeparator.js'

const VendorPaymentModal = ({ planTitle, billingPeriod, billingPeriodPrice, onConfirm }) => {
  const { t } = useTranslation('subscriptions')
  const getMonths = () => {
    if (billingPeriod === 'monthly') {
      return ''
    } else if (billingPeriod === 'quarterly') {
      return 3
    } else if (billingPeriod === 'halfYearly') {
      return 6
    } else if (billingPeriod === 'yearly') {
      return 12
    }
  }

  const getPrice = () => {
    if (billingPeriod) {
      return decimalSeparatorMethod((billingPeriodPrice[billingPeriod] * 1).toFixed(2), 'comma')
    } else {
      if (
        billingPeriodPrice &&
        billingPeriodPrice.lifetime &&
        billingPeriodPrice.offerPrice &&
        billingPeriodPrice.lifetime !== billingPeriodPrice.offerPrice
      ) {
        return decimalSeparatorMethod((billingPeriodPrice.offerPrice * 1).toFixed(2), 'comma')
      } else {
        return decimalSeparatorMethod((billingPeriodPrice.lifetime * 1).toFixed(2), 'comma')
      }
    }
  }

  return (
    <>
      <ModalWrapper>
        <HeaderBar>
          {t(`vendorPaymentPopup.yourChoice`)}:{' '}
          <span>
            {planTitle && planTitle.toUpperCase()}{' '}
            {capitalizeFirstChar(billingPeriod === 'halfYearly' ? 'Half Yearly' : billingPeriod)}
          </span>
        </HeaderBar>
        <MiddleSection>
          <PaymentPrice>
            {t(`vendorPaymentPopup.price`)}:{' '}
            <span>
              {getPrice()} EUR{' '}
              {billingPeriod &&
                `${t(`vendorPaymentPopup.every`)} ${getMonths()} ${
                  billingPeriod === 'monthly'
                    ? t(`vendorPaymentPopup.month`)
                    : t(`vendorPaymentPopup.months`)
                }`}
            </span>
          </PaymentPrice>
          <Button onClick={() => onConfirm()}>{t(`vendorPaymentPopup.proceedToPayment`)}</Button>
        </MiddleSection>
      </ModalWrapper>
    </>
  )
}

VendorPaymentModal.propTypes = {
  closeModal: PropTypes.func,
  planTitle: PropTypes.string,
  billingPeriod: PropTypes.string,
  billingPeriodPrice: PropTypes.any,
  onConfirm: PropTypes.func,
}

export default VendorPaymentModal

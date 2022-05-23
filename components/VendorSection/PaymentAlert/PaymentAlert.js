import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { getVendorSubscription } from '../../../modules/dashboard/dashboardSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { setTabSubscription } from '../../../modules/subscription/subscriptionSlice'
import { useTranslation } from 'next-i18next'

function PaymentAlert() {
  const vendorSubscription = useSelector((state) => state.root.dashboard.settings.vendorSubscription)
  const {t} = useTranslation('translation')

  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    /**if subscription is not purchased, redirect to subscriptions page else render plan details */
    const getSubscriptions = async () => {
      if (isEmptyObj(vendorSubscription)) {
        const resultAction = await dispatch(getVendorSubscription(t))
        const result = unwrapResult(resultAction)
        if (!result) router.push('/subscriptions')
      }
    }
    getSubscriptions()
  }, [dispatch, router, vendorSubscription])
  const redirectToSubscription = () => {
    router.push('/vendor-settings')
    dispatch(setTabSubscription(true))
  }
  if (
    vendorSubscription &&
    vendorSubscription.userSubscription &&
    vendorSubscription.userSubscription.subscriptionStatus === 'suspended'
  )
    return (
      <>
        <Alert severity="warning">
          Your payment has been suspended. Please contact Admin or Reactivate your payment from{' '}
          <span className="link" onClick={redirectToSubscription}>
            here
          </span>
        </Alert>
        <br />
      </>
    )

  return <></>
}

export default PaymentAlert

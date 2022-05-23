import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {capitalize, get} from 'lodash'
import { useRouter } from 'next/router'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import { TopHeading, SectionRow, SectionHalfCols, PaymemtsWrap, PaymemtsSection, DowngradeLink } from '../../styled.js'
import ButtonLight from '../../../UI/ButtonLight'
import Button from '../../../UI/Button'
import {
  getVendorSubscription,
  getSwitchPaymentUrl,
  cancelSubscription,
} from '../../../../modules/dashboard/dashboardSlice'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { toggleLoading } from '../../../../modules/auth/authSlice'
import ModalComponent from '../../../UI/Modal'
import ConfirmBox from '../../../UI/ConfirmBox'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { getUserData, notifySuccess } from '../../../../modules/profile/myProfileSlice.js'
import { reactivateSubscription } from '../../../../modules/subscription/subscriptionSlice.js'
import FeatureBox from './FeatureBox'
import { getContent } from '../../../../modules/staticContent/staticContentSlice'

const SubscriptionSection = () => {
  const { t } = useTranslation(['dashboard', 'translation', 'successResponses'])

  const [confirmModal, setConfirmModal] = useState(false)
  const [modal, setModal] = useState(false)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const dispatch = useDispatch()
  const router = useRouter()

  /**get subscription details from redux */
  const vendorSubscription = useSelector((state) => state.root.dashboard.settings.vendorSubscription)
  const langCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const changePaymentNote = useSelector((state) => state.root.staticContent.changePaymentNote)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    dispatch(getContent('Change_Payment_Data_Note', t, 'changePaymentDataNote'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  console.log(vendorSubscription)
  let dt = ''
  if (vendorSubscription && !isEmptyObj(vendorSubscription)){
    dt = moment(vendorSubscription.userSubscription.upcomingPayment).format('DD MMMM YYYY')
    if (vendorSubscription.userSubscription.trialPeriod) {
      dt = moment(vendorSubscription.userSubscription.trialPeriodDate).add(1, 'y').format('DD MMMM YYYY')
    }
  }

  const confirmChangePayment = () => {
    setConfirmModal(true)
  }
  const changePayment = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(
      getSwitchPaymentUrl({ type: 'switch_payment', langCode: langCode ? langCode : 'en' })
    )
    const result = await unwrapResult(resultAction)
    if (result && result.success && process.browser) {
      window.open(result.data.checkoutUrl, '_self')
    }
    dispatch(toggleLoading(false))
  }
  const cancelSubscriptionHandler = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(cancelSubscription({ data: {}, t }))
    const result = unwrapResult(resultAction)
    if (result && result.success && loggedInUsername) {
      dispatch(getVendorSubscription(t))
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
      setConfirmModal(false)
    }
    dispatch(toggleLoading(false))
  }
  const checkCancelDowngrade = (type) => {
    if (
      type === 'cancel' &&
      vendorSubscription &&
      vendorSubscription.userSubscription &&
      vendorSubscription.userSubscription &&
      vendorSubscription.userSubscription.subscription.title === 'lifetime'
    )
      return true
    else if (
      (vendorSubscription &&
        vendorSubscription.userSubscription &&
        vendorSubscription.userSubscription.subscription &&
        vendorSubscription.userSubscription.subscription.role === 'artist' &&
        (vendorSubscription.userSubscription.subscription.title === 'basic' ||
          vendorSubscription.userSubscription.subscription.title === 'lifetime')) ||
      (vendorSubscription &&
        vendorSubscription.userSubscription &&
        vendorSubscription.userSubscription.subscription &&
        vendorSubscription.userSubscription.subscription.role === 'member' &&
        (vendorSubscription.userSubscription.subscription.title === 'plus' ||
          vendorSubscription.userSubscription.subscription.title === 'lifetime'))
    )
      return false
    return true
  }
  const checkUpgrade = () => {
    if (
      vendorSubscription &&
      vendorSubscription.userSubscription &&
      vendorSubscription.userSubscription.subscription &&
      vendorSubscription.userSubscription.subscription.title === 'lifetime'
    )
      return false
    return true
  }

  const checkSubscriptionStatus = () => {
    if (
      vendorSubscription &&
      vendorSubscription.userSubscription &&
      vendorSubscription.userSubscription.subscriptionStatus === 'active'
    )
      return true
    return false
  }
  const reactivatePayment = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(reactivateSubscription({ t }))
    const response = unwrapResult(resultAction)
    if (response && response.success) {
      notifySuccess(t(`successResponses:subscriptions.paymentReactivate`))
      dispatch(getVendorSubscription(t))
    }
    dispatch(toggleLoading(false))
  }
const nameOfPlan = vendorSubscription &&
vendorSubscription.userSubscription &&
vendorSubscription.userSubscription.subscription &&
vendorSubscription.userSubscription.subscription.planName

const nameOFDescription = vendorSubscription &&
  vendorSubscription.userSubscription &&
  vendorSubscription.userSubscription.subscription &&
  vendorSubscription.userSubscription.subscription.description

  const [planName, translatePlanName] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(vendorSubscription)){
      translatePlanName(nameOfPlan)
      translateDescription(nameOFDescription)
    }
  }, [vendorSubscription])
  return (
    <>
      {!isEmptyObj(vendorSubscription) ? (
        <>
          {confirmModal && (
            <ModalComponent closeOnOutsideClick={true} isOpen={confirmModal} closeModal={() => setConfirmModal(false)}>
              {modal === 'cancel' && (
                <ConfirmBox
                  open={confirmModal}
                  closeModal={() => setConfirmModal(false)}
                  deleteHandler={cancelSubscriptionHandler}
                  confirmButtonText={t(`settings.subscription.buttonYes`)}
                  heading={t(`settings.subscription.cancelConfirmText`)}
                />
              )}
              {modal === 'changePayment' && (
                <ConfirmBox
                  open={confirmModal}
                  closeModal={() => setConfirmModal(false)}
                  deleteHandler={changePayment}
                  confirmButtonText={t(`settings.subscription.buttonYes`)}
                  heading={t(`settings.subscription.changePaymentText`)}
                  showChangePaymentNote={true}
                  changePaymentNote={changePaymentNote}
                />
              )}
            </ModalComponent>
          )}
          <TopHeading className="InnerHeading">
            {planName ? planName.toUpperCase() : nameOfPlan && nameOfPlan.toUpperCase()}
            <span>{ description? ReactHtmlParser(description) : nameOFDescription && ReactHtmlParser(nameOFDescription)}</span>
          </TopHeading>
          <SectionRow className="RowflexStart">
            <SectionHalfCols className="subscription-table">
              {vendorSubscription &&
                !isEmptyObj(vendorSubscription) &&
                vendorSubscription.subscriptionCategories.map((cat) => <FeatureBox cat={cat} key={cat._id} />)}
            </SectionHalfCols>
            {checkSubscriptionStatus() ? (
              <SectionHalfCols className="P-L-80 subscription-table">
                {checkCancelDowngrade() && (
                  <PaymemtsWrap>
                    <PaymemtsSection>
                      {t(`settings.subscription.paymentsVia`)}:
                      <span>{capitalize(vendorSubscription.userSubscription.paymentType)}</span>
                    </PaymemtsSection>
                    <PaymemtsSection>
                      {vendorSubscription.userSubscription.paymentType === 'paypal'
                        ? t(`settings.subscription.paypalEmail`)
                        : t(`settings.subscription.cardNumber`)}
                      :<span>{vendorSubscription.userSubscription.paymentEmail}</span>
                    </PaymemtsSection>
                    <PaymemtsSection>
                      <ButtonLight
                        onClick={() => {
                          setModal('changePayment')
                          confirmChangePayment()
                        }}
                        label={t(`settings.subscription.changePaymentData`)}
                      >
                        {' '}
                      </ButtonLight>
                    </PaymemtsSection>
                  </PaymemtsWrap>
                )}
                <PaymemtsWrap>
                  {checkCancelDowngrade() && (
                    <>
                      <PaymemtsSection>
                        {t(`settings.subscription.subscriptionPeriod`)}:{' '}
                        <span>
                          {capitalize(vendorSubscription && vendorSubscription.userSubscription.subscriptionPeriod)}
                        </span>
                      </PaymemtsSection>
                      <PaymemtsSection>
                        {t(`settings.subscription.price`)}:{' '}
                        <span>
                          {t(`settings.subscription.eur`)}{' '}
                          {get(vendorSubscription,`userSubscription.subscription.price[${vendorSubscription.userSubscription.subscriptionPeriod}]`,'')}
                        </span>
                      </PaymemtsSection>
                      <PaymemtsSection>
                        {t(`settings.subscription.upcomingPayment`)}: <span>{dt}</span>
                      </PaymemtsSection>
                    </>
                  )}
                  {checkUpgrade() && (
                    <>
                      {vendorSubscription.userSubscription.subscription.title === 'basic' && (
                        <p>{t(`settings.subscription.basicPlanText`)}</p>
                      )}
                      <PaymemtsSection>
                        <Button onClick={() => router.push('/subscriptions')}>
                          {t(`settings.subscription.upgradeMembership`)}
                        </Button>
                      </PaymemtsSection>
                    </>
                  )}
                  {checkCancelDowngrade() && (
                    <PaymemtsSection>
                      <DowngradeLink onClick={() => router.push('/subscriptions')}>
                        {t(`settings.subscription.downgradeYourAccount`)}
                      </DowngradeLink>
                    </PaymemtsSection>
                  )}
                  {checkCancelDowngrade('cancel') && (
                    <PaymemtsSection>
                      <DowngradeLink
                        onClick={() => {
                          setModal('cancel')
                          setConfirmModal(true)
                        }}
                      >
                        {t(`settings.subscription.cancelSubscription`)}
                      </DowngradeLink>
                    </PaymemtsSection>
                  )}
                </PaymemtsWrap>
              </SectionHalfCols>
            ) : (
              <SectionHalfCols className="P-L-80 subscription-table">
                {vendorSubscription.userSubscription.subscription.title === 'basic' && (
                  <p>{t(`settings.subscription.basicPlanText`)}</p>
                )}
                <PaymemtsSection className="reactivatePayment">
                  <Button onClick={reactivatePayment}>Reactivate Payment</Button>
                </PaymemtsSection>
              </SectionHalfCols>
            )}
          </SectionRow>
        </>
      ) : null}
    </>
  )
}

export default SubscriptionSection

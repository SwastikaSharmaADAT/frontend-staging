import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import Carousel from 'react-multi-carousel'
import { useRouter } from 'next/router'
import {
  SectionContentWrapper,
  SectionRow,
  SectionColsSm,
  SectionColsTop,
  LabelText,
  SectionColsBottom,
  SectionColsSmWrap,
  InnerColsHead,
  InnerSectionColsTop,
  MiddleHeadWrap,
  BottomColsBar,
  Price,
  BottomDiv,
} from '../styled.js'
import TermsModalSection from '../TermsModalSection'
import VendorPaymentModal from '../VendorPaymentModal'
import ModalComponent from '../../UI/Modal'
import Select from '../../../components/UI/Select'
import { currenciesList } from '../../../utilities/currenciesList'
import { convertCurrency } from '../../../utilities/convertCurrency'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { decimalSeparatorMethod } from '../../../utilities/decimalSeparator'
import { toggleLoading } from '../../../modules/auth/authSlice'
import { setCurrencyObj } from '../../../modules/landingPage/landingPageSlice'
import { getPlans, subscriptionCheckout } from '../../../modules/subscription/subscriptionSlice'
import { notifyError, notifySuccess, setSubscription, setUserData } from '../../../modules/profile/myProfileSlice.js'
import { event } from '../../../lib/gtag.js'
import { getVendorSubscription } from '../../../modules/dashboard/dashboardSlice'
const PlanSubcription = ({ userCountry, isArtist }) => {
  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  const breakpoint = 767
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
      window.addEventListener('load', () => setWidth(window.innerWidth))
    }
  }, [])

  const dispatch = useDispatch()

  const router = useRouter()
  const langCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const purchasedSubscription = useSelector((state) => state.root.myProfile.userData.purchasedSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [plusPricing, setPlusPricing] = useState('quarterly')
  const [proPricing, setProPricing] = useState('quarterly')
  const [decimalSeparator, setDecimalSeparator] = useState('comma')
  const [openTermsModal, setTermsModal] = useState(false)
  const [openPaymentModal, setPaymentModal] = useState(false)
  const [conversionComplete, setConverionComplete] = useState(false)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency])

  useEffect(() => {
    if (subscription) {
      if (subscription.title === 'plus') setPlusPricing(purchasedSubscription.subscriptionPeriod)
      if (subscription.title === 'pro') setProPricing(purchasedSubscription.subscriptionPeriod)
    }
  }, [purchasedSubscription, subscription])
  const [paidPlan, setPaidPlan] = useState(false)
  const [planTitle, setPlanTitle] = useState('')
  const [planHeading, setPlanHeading] = useState('')
  const [billingPeriod, setBillingPeriod] = useState('')
  const [billingPeriodPrice, setBillingPeriodPrice] = useState()
  const [selectSubscription, setSelectSubscription] = useState()

  const selectPlan = (title, subscription1) => {
    if (subscription) {
      if (title === 'plus') {
        if (title === subscription.title && purchasedSubscription.subscriptionPeriod === plusPricing) {
          notifyError(t(`errorResponses:subscriptions.planExist`))
          return
        }
      } else if (title === 'pro') {
        if (title === subscription.title && purchasedSubscription.subscriptionPeriod === proPricing) {
          notifyError(t(`errorResponses:subscriptions.planExist`))
          return
        }
      }
    }
    setSelectSubscription(subscription1)
    if (title === 'basic') {
      setPaidPlan(false)
    } else {
      setPaidPlan(true)
    }
    setPlanTitle(title)
    setPlanHeading(subscription1.planName)
    setTermsModal(true)
    if (title !== 'basic') {
      setBillingPeriod(title === 'plus' ? plusPricing : title === 'pro' ? proPricing : '')
    }
    if (title !== 'basic') {
      setBillingPeriodPrice(subscription1.price)
    }
  }

  const acceptHandler = async () => {
    if (planTitle === 'basic') {
      event({ action: 'click', category: 'subscription', label: 'buy subscription', value: 1 })
      dispatch(toggleLoading(true))
      const resultAction = await dispatch(
        subscriptionCheckout({ data: { planId: selectSubscription._id, langCode: langCode ? langCode : 'en' }, t })
      )
      const result = await unwrapResult(resultAction)
      if (result && result.success) {
        let subDownCase = false
        if(result.messageCode && result.messageCode === 'subscriptionDowngradeToCancel') {
          await dispatch(getVendorSubscription(t))
          subDownCase = true
        }
        dispatch(setUserData({ ...userData, userRole: isArtist ? 'artist' : 'member' }))
        dispatch(setSubscription(selectSubscription))
        // dispatch(getVendorSubscription(t))
        setTermsModal(false)
        dispatch(toggleLoading(false))
        if(subDownCase) {
          notifySuccess(t(`successResponses:subscriptions.updateSuccess`))
          router.push('/vendor-settings?page=subscription')
        } else {
          notifySuccess(t(`successResponses:subscriptions.purchaseSuccess`))
          router.push('/myartworks')
        }
        
      }
    } else {
      setTermsModal(false)
      setPaymentModal(true)
    }
  }
  const buyPlan = async () => {
    dispatch(toggleLoading(true))
    event({ action: 'click', category: 'subscription', label: 'buy subscription', value: 1 })
    const resultAction = await dispatch(
      subscriptionCheckout({
        data: {
          planId: selectSubscription._id,
          planType: selectSubscription.title === 'plus' ? plusPricing : proPricing,
          langCode: langCode ? langCode : 'en',
        },
        t,
      })
    )
    const result = await unwrapResult(resultAction)
    if (typeof window !== 'undefined' && result && result.success) {
      window.open(result.data.checkoutUrl, '_self')
      setTermsModal(false)
    }
    dispatch(toggleLoading(false))
  }
  const { t } = useTranslation(['errorResponses', 'subscriptions', 'translation'])

  const subscriptions = useSelector((state) => state.root.subscription.subscriptions)
  const subscriptionCategories = useSelector((state) => state.root.subscription.subscriptionCategories)

  useEffect(() => {
    dispatch(getPlans())
    const role = isArtist ? 'artist' : 'member'
    dispatch(getPlans(role))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  const disableLoading = () => {
    dispatch(toggleLoading(false))
    setConverionComplete(true)
  }

  const resetOnErr = () => {
    setCurrency('EUR')
    setConversionRate(1)
    disableLoading()
    notifyError(t(`translation:auth.serverResponses.errors.internalServerError`))
  }

  const handleCurrencyChange = (e) => {
    dispatch(toggleLoading(true))
    setCurrency(e.target.value)
    if (e.target.value !== 'EUR') {
      convertCurrency(e.target.value, setConversionRate, disableLoading, resetOnErr)
    } else {
      setConversionRate(1)
      disableLoading()
    }
  }

  useEffect(() => {
    if (conversionComplete) {
      const obj = {
        currency,
        conversionRate,
      }
      localStorage.setItem('currencyInfo', JSON.stringify(obj))
      dispatch(setCurrencyObj(obj))
      setConverionComplete(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversionComplete])

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const classesObj = {
    basic: {
      light: 'LightYellowSec',
      dark: 'DarkYellowSec',
    },
    plus: {
      light: 'LightYellow',
      dark: 'DarkYellow',
    },
    pro: {
      light: 'LightBlue',
      dark: 'DarkBlue',
    },
    lifetime: {
      light: 'LightGreen',
      dark: 'DarkGreen',
    },
  }

  const getMonthlyPrice = (pricing, type) => {
    const pricingType = type === 'pro' ? proPricing : plusPricing
    if (pricingType === 'monthly') {
      return pricing.monthly
    } else if (pricingType === 'quarterly') {
      return parseFloat(pricing.quarterly) / 3
    } else if (pricingType === 'halfYearly') {
      return parseFloat(pricing.halfYearly) / 6
    } else if (pricingType === 'yearly') {
      return parseFloat(pricing.yearly) / 12
    }
  }

  const formatPrice = (priceVal) => {
    const seperator = decimalSeparator === 'comma' ? ',' : '.'
    const formattedPrice = priceVal.split(seperator)
    return formattedPrice
  }
  // for later use
  const checkPurchased = (title, period) => {
    if (!title || !subscription || !subscription.title) return false
    return subscription.title === title && purchasedSubscription.subscriptionPeriod === period
  }
  const renderPriceSection = (item) => {
    if (item.price && !isEmptyObj(item.price)) {
      if (item.title === 'pro' || item.title === 'plus') {
        return (
          <>
            <Price>
              {getCurrencyDetail(currency).symbol}{' '}
              {
                formatPrice(
                  decimalSeparatorMethod(
                    (getMonthlyPrice(item.price, item.title) * conversionRate).toFixed(2),
                    decimalSeparator
                  )
                )[0]
              }
              <span>
                {decimalSeparator === 'comma' ? ',' : '.'}
                {
                  formatPrice(
                    decimalSeparatorMethod(
                      (getMonthlyPrice(item.price, item.title) * conversionRate).toFixed(2),
                      decimalSeparator
                    )
                  )[1]
                }
              </span>
              <span>{t(`subscriptions:perMonth`)}</span>
            </Price>
            <Select
              name={`${item.title}PricingSelect`}
              value={item.title === 'pro' ? proPricing : plusPricing}
              onChange={(e) => (item.title === 'pro' ? setProPricing(e.target.value) : setPlusPricing(e.target.value))}
            >
              {/* <option value="monthly">
                {t(`subscriptions:pricingSelectLabels.monthly`)} {getCurrencyDetail(currency).symbol}{' '}
                {decimalSeparatorMethod((item.price.monthly * conversionRate).toFixed(2), decimalSeparator)}
              </option> */}
              {/* {!checkPurchased(item.title, 'quarterly') && ( */}
              <option value="quarterly">
                {t(`subscriptions:pricingSelectLabels.quarterly`)} {getCurrencyDetail(currency).symbol}{' '}
                {decimalSeparatorMethod((item.price.quarterly * conversionRate).toFixed(2), decimalSeparator)}
              </option>
              {/* )} */}
              {/* {!checkPurchased(item.title, 'halfYearly') && ( */}
              <option value="halfYearly">
                {t(`subscriptions:pricingSelectLabels.halfYearly`)} {getCurrencyDetail(currency).symbol}{' '}
                {decimalSeparatorMethod((item.price.halfYearly * conversionRate).toFixed(2), decimalSeparator)}
              </option>
              {/* )} */}
              {/* {!checkPurchased(item.title, 'yearly') && ( */}
              <option value="yearly">
                {t(`subscriptions:pricingSelectLabels.yearly`)} {getCurrencyDetail(currency).symbol}{' '}
                {decimalSeparatorMethod((item.price.yearly * conversionRate).toFixed(2), decimalSeparator)}
              </option>
              {/* )} */}
            </Select>
          </>
        )
      } else if (item.title === 'lifetime') {
        return (
          <>
            <Price className={item.price.lifetime !== item.price.offerPrice ? 'OldPrice' : null}>
              {getCurrencyDetail(currency).symbol}{' '}
              {
                formatPrice(
                  decimalSeparatorMethod((item.price.lifetime * conversionRate).toFixed(2), decimalSeparator)
                )[0]
              }
              <span>
                {decimalSeparator === 'comma' ? ',' : '.'}
                {
                  formatPrice(
                    decimalSeparatorMethod((item.price.lifetime * conversionRate).toFixed(2), decimalSeparator)
                  )[1]
                }
              </span>
            </Price>
            {item.price &&
              item.price.lifetime &&
              item.price.offerPrice &&
              item.price.lifetime !== item.price.offerPrice && (
                <Price>
                  {getCurrencyDetail(currency).symbol}{' '}
                  {
                    formatPrice(
                      decimalSeparatorMethod((item.price.offerPrice * conversionRate).toFixed(2), decimalSeparator)
                    )[0]
                  }
                  <span>
                    {decimalSeparator === 'comma' ? ',' : '.'}
                    {
                      formatPrice(
                        decimalSeparatorMethod((item.price.offerPrice * conversionRate).toFixed(2), decimalSeparator)
                      )[1]
                    }
                  </span>
                </Price>
              )}
          </>
        )
      }
    } else {
      return <span className="TopSpan">{t(`subscriptions:freePricing`)}</span>
    }
  }

  const responsive = {
    mobilexl: {
      breakpoint: { max: 766, min: 541 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
    mobilexls: {
      breakpoint: { max: 540, min: 463 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
    mobilesm: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 30,
    },
  }
  if (width && (width < breakpoint)) {
    return (
      <>
        <div className="carousel-wrap">
          <SectionColsTop className="currency-switcher-section">
            <LabelText>{t(`subscriptions:currencySwitcher`)}</LabelText>
            <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
              {currenciesList.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </Select>
          </SectionColsTop>
          {openTermsModal && (
            <ModalComponent closeOnOutsideClick={true} isOpen={openTermsModal} closeModal={() => setTermsModal(false)}>
              <TermsModalSection paidPlan={paidPlan} planTitle={planHeading} acceptHandler={acceptHandler} />
            </ModalComponent>
          )}
          {openPaymentModal && (
            <ModalComponent
              closeOnOutsideClick={true}
              isOpen={openPaymentModal}
              closeModal={() => setPaymentModal(false)}
            >
              <VendorPaymentModal
                onConfirm={() => buyPlan()}
                planTitle={planHeading}
                billingPeriod={billingPeriod}
                billingPeriodPrice={billingPeriodPrice}
              />
            </ModalComponent>
          )}
          {
            <Carousel
              className="mobile-subscription-carousel"
              swipeable={true}
              draggable={false}
              showDots={false}
              customLeftArrow={
                <div className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left">Previous</div>
              }
              customRightArrow={
                <div className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right">Next</div>
              }
              centerMode
              responsive={responsive}
              infinite={true}
              keyBoardControl={false}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              autoPlay={false}
              autoPlaySpeed={7000}
              partialVisible={false}
            >
              {subscriptions &&
                subscriptions.length > 0 &&
                subscriptions.map((item) => (
                  <SectionColsSm className="InnerSmWrap" key={item._id}>
                    <InnerSectionColsTop>
                      <InnerColsHead>{item.planName}</InnerColsHead>
                      <MiddleHeadWrap className={classesObj[item.title] && classesObj[item.title].light}>
                        {renderPriceSection(item)}
                      </MiddleHeadWrap>
                      <BottomColsBar
                        className={[
                          classesObj[item.title] && classesObj[item.title].dark,
                          (subscription && (item.title === subscription.title))
                            ? 'disabled'
                            : '',
                        ].join(' ')}
                        onClick={() => selectPlan(item.title, item)}
                      >
                      {(subscription && (item.title === subscription.title))
                          ? 'Your Current Plan'
                          : `${t(`subscriptions:signUpText`)}`}
                      </BottomColsBar>
                    </InnerSectionColsTop>
                    <SectionColsBottom className="mobile-section-side">
                      <SectionColsSmWrap className="mSection-left">
                        <ul>
                          <li className="mkBigText">{t(`subscriptions:productLimits.publishAndSell`)}</li>
                          <li>{t(`subscriptions:commission`)}</li>
                          {subscriptionCategories &&
                            subscriptionCategories.map((item) => <li key={item._id}>{ReactHtmlParser(t(`subscriptions:categories.${item.categoryKey}`))}</li>)}
                        </ul>
                      </SectionColsSmWrap>
                      <SectionColsSmWrap className="mSection-right">
                        <ul>
                          <li className="mkBigText">
                            {item.title === 'basic'
                              ? t(`subscriptions:productLimits.basic`)
                              : item.title === 'plus' && isArtist
                              ? t(`subscriptions:productLimits.artistPlus`)
                              : t(`subscriptions:productLimits.unlimited`)}
                          </li>
                          <li>{item.commission ? `${item.commission}%` : t(`subscriptions:noneText`)}</li>
                          {subscriptionCategories &&
                            subscriptionCategories.map((category) => {
                              if (category.subscriptionIds.includes(item._id)) {
                                return <li key={category._id}>✅</li>
                              } else {
                                return <li key={category._id}>❌</li>
                              }
                            })}
                        </ul>
                      </SectionColsSmWrap>
                    </SectionColsBottom>
                    <div
                      className={[
                        classesObj[item.title] && classesObj[item.title].dark,
                        (subscription && (item.title === subscription.title))
                          ? 'disabled'
                          : '',
                      ].join(' mobile-last-btn ')}
                      onClick={() => selectPlan(item.title, item)}
                    >
                      {(subscription && (item.title === subscription.title))
                        ? 'Your Current Plan'
                        : `${t(`subscriptions:signUpText`)} ${item.title}`}
                    </div>
                  </SectionColsSm>
                ))}
            </Carousel>
          }
        </div>
      </>
    )
  }
  return (
    <>
      {openTermsModal && (
        <ModalComponent closeOnOutsideClick={true} isOpen={openTermsModal} closeModal={() => setTermsModal(false)}>
          <TermsModalSection
            paidPlan={paidPlan}
            planTitle={planHeading}
            acceptHandler={acceptHandler}
            roleName={isArtist ? 'artist' : 'member'}
          />
        </ModalComponent>
      )}
      {openPaymentModal && (
        <ModalComponent closeOnOutsideClick={true} isOpen={openPaymentModal} closeModal={() => setPaymentModal(false)}>
          <VendorPaymentModal
            onConfirm={() => buyPlan()}
            planTitle={planHeading}
            billingPeriod={billingPeriod}
            billingPeriodPrice={billingPeriodPrice}
          />
        </ModalComponent>
      )}
      <SectionContentWrapper>
        <SectionRow className="MemberTable">
          <SectionColsSm>
            <SectionColsTop>
              <LabelText>{t(`subscriptions:currencySwitcher`)}</LabelText>
              <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
                {currenciesList.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </SectionColsTop>
            <SectionColsBottom>
              <ul>
                <li className="mkBigText">{t(`subscriptions:productLimits.publishAndSell`)}</li>
                <li>{t(`subscriptions:commission`)}</li>
                {subscriptionCategories &&
                  subscriptionCategories.map((item) => <li key={item._id}>{ReactHtmlParser(t(`subscriptions:categories.${item.categoryKey}`))}</li>)}
              </ul>
            </SectionColsBottom>
          </SectionColsSm>
          <SectionColsSmWrap>
            {subscriptions &&
              subscriptions.length > 0 &&
              subscriptions.map((item) => (
                <SectionColsSm className="InnerSmWrap" key={item._id}>
                  <InnerSectionColsTop>
                    <InnerColsHead>{item.planName}</InnerColsHead>
                    <MiddleHeadWrap className={classesObj[item.title] && classesObj[item.title].light}>
                      {renderPriceSection(item)}
                    </MiddleHeadWrap>
                    <BottomColsBar
                      className={[
                        classesObj[item.title] && classesObj[item.title].dark,
                        (subscription && (item.title === subscription.title))
                          ? 'disabled'
                          : '',
                      ].join(' ')}
                      onClick={() => selectPlan(item.title, item)}
                    >
                      {(subscription && (item.title === subscription.title))
                        ? 'Your Current Plan'
                        : `${t(`subscriptions:signUpText`)}`}
                    </BottomColsBar>
                  </InnerSectionColsTop>
                  <SectionColsBottom>
                    <ul>
                      <li className="mkBigText">
                        {item.title === 'basic'
                          ? t(`subscriptions:productLimits.basic`)
                          : item.title === 'plus' && isArtist
                          ? t(`subscriptions:productLimits.artistPlus`)
                          : t(`subscriptions:productLimits.unlimited`)}
                      </li>
                      <li>{item.commission ? `${item.commission}%` : t(`subscriptions:noneText`)}</li>
                      {subscriptionCategories &&
                        subscriptionCategories.map((category) => {
                          if (category.subscriptionIds.includes(item._id)) {
                            return <li key={category._id}>✅</li>
                          } else {
                            return <li key={category._id}>❌</li>
                          }
                        })}
                      <li
                        className={[
                          classesObj[item.title] && classesObj[item.title].dark,
                          (subscription && (item.title === subscription.title))
                            ? 'disabled'
                            : '',
                        ].join(' ')}
                        onClick={() => selectPlan(item.title, item)}
                      >
                      {(subscription && (item.title === subscription.title))
                          ? 'Your Current Plan'
                          : `${t(`subscriptions:signUpText`)} ${item.title}`}
                      </li>
                    </ul>
                  </SectionColsBottom>
                </SectionColsSm>
              ))}
          </SectionColsSmWrap>
        </SectionRow>
      </SectionContentWrapper>
    </>
  )
}

PlanSubcription.propTypes = {
  userCountry: PropTypes.string,
  isArtist: PropTypes.bool,
}

export default PlanSubcription

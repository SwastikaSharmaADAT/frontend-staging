import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ArtworkDetailWrap } from '../styled.js'
import ModalComponent from '../../UI/Modal/index.js'
import ShareActivity from '../../NewsFeed/SinglePost/ShareActivity/index.js'
import LikesPopup from '../../NewsFeed/SinglePost/LikesPopup/index.js'
import { isEmptyObj } from '../../../utilities/checkEmptyObject.js'
import { convertCurrency } from '../../../utilities/convertCurrency'
import { toggleLoading } from '../../../modules/auth/authSlice'
import { notifyError } from '../../../modules/profile/myProfileSlice.js'
import { setCurrencyObj } from '../../../modules/landingPage/landingPageSlice'
import ArtworkImageSection from './ArtworkImageSection'
import ArtworkDescriptionSection from './ArtworkDescriptionSection'
import ArtworkDetailsTabs from './ArtworkDetailsTabs'

const ArtworkDetailSection = ({
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  initialPageLoad,
  setMedium,
  setGenre,
  setSubjects,
  setRedirectFromDetails,
  decimalSeparator,
  insertToTitle,
  resetFilter,
  setArtist,
  setCountry,
  setTimePeriod,
  setSeriesDetails,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation'])
  const router = useRouter()

  const [shareModal, setShareModal] = useState(false)
  const [likesModal, setLikesModal] = useState(false)
  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [conversionComplete, setConverionComplete] = useState(false)
  const { artworkSlug } = router.query
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

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

  useEffect(() => {
    resetFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {!isEmptyObj(artworkDetail) && (
        <>
          <ModalComponent closeOnOutsideClick={true} isOpen={shareModal} closeModal={() => setShareModal(false)}>
            <ShareActivity artwork artworkId={artworkSlug} setShareActivityPopup={setShareModal} />
          </ModalComponent>
          <ModalComponent closeOnOutsideClick={true} isOpen={likesModal} closeModal={() => setLikesModal(false)}>
            <LikesPopup likesData={artworkDetail && artworkDetail.likes} setLikesPopup={setLikesModal} />
          </ModalComponent>
          <ArtworkDetailWrap>
            <ArtworkImageSection />
            <ArtworkDescriptionSection
              setCountry={setCountry}
              setTimePeriod={setTimePeriod}
              setSeriesDetails={setSeriesDetails}
              insertToTitle={insertToTitle}
              callUseEffect={callUseEffect}
              setCallUseEffect={setCallUseEffect}
              setInitialPageLoad={setInitialPageLoad}
              initialPageLoad={initialPageLoad}
              setRedirectFromDetails={setRedirectFromDetails}
              setMedium={setMedium}
              setGenre={setGenre}
              setSubjects={setSubjects}
              setLikesModal={setLikesModal}
              setShareModal={setShareModal}
              currency={currency}
              handleCurrencyChange={handleCurrencyChange}
              conversionRate={conversionRate}
              decimalSeparator={decimalSeparator}
            />
            <ArtworkDetailsTabs
              currency={currency}
              conversionRate={conversionRate}
              decimalSeparator={decimalSeparator}
              insertToTitle={insertToTitle}
              callUseEffect={callUseEffect}
              setCallUseEffect={setCallUseEffect}
              setInitialPageLoad={setInitialPageLoad}
              setArtist={setArtist}
            />
          </ArtworkDetailWrap>
        </>
      )}
    </>
  )
}

ArtworkDetailSection.propTypes = {
  callUseEffect: PropTypes.bool,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  initialPageLoad: PropTypes.bool,
  setMedium: PropTypes.func,
  setGenre: PropTypes.func,
  setSubjects: PropTypes.func,
  setRedirectFromDetails: PropTypes.func,
  decimalSeparator: PropTypes.string,
  insertToTitle: PropTypes.func,
  resetFilter: PropTypes.func,
  setArtist: PropTypes.func,
  setCountry: PropTypes.func,
  setTimePeriod: PropTypes.func,
  setSeriesDetails: PropTypes.func,
}
export default ArtworkDetailSection

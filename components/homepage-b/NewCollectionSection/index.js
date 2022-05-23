import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import NewCollectionSectionSlider from '../NewCollectionSectionSlider'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { isEmptyObj } from '../../../utilities/checkEmptyObject.js'
import { getLatestArtworks } from '../../../modules/landingPage/landingPageSlice'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { useRouter } from 'next/router'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 40px 0;
  width: 100%;
  background: #111 !important;
  @media (max-width: 767px) {
    padding: 10px 0;
  }
  .react-multiple-carousel__arrow--right {
    right: 30px !important;
    bottom: 0px;
  }
  .react-multiple-carousel__arrow--left {
    left: 30px !important;
    bottom: 0px;
  }
  .react-multiple-carousel__arrow {
    position: absolute;
    outline: 0px;
    transition: all 0.5s ease 0s;
    border-radius: 0px !important;
    z-index: 0;
    background: transparent !important;
    min-width: 30px !important;
    min-height: 30px !important;
    opacity: 1;
    cursor: pointer;
    border: 2px solid rgb(255, 255, 255) !important;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .react-multi-carousel-item {
    display: flex;
    @media (max-width: 991px) {
      justify-content: center;
    }
  }
`

const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 50px;
  color: #fff;
  position: relative;
  width: 100%;
  max-width: 1270px;
  margin: 30px auto 30px;
  @media (max-width: 767px) {
    font-size: 24px;
  }
  @media (max-width: 1270px) {
    max-width: 90%;
  }
`
const ButtonText = styled.button`
  background: #000;
  border: 1px solid #fff;
  font-style: normal;
  color: #fff;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  font-weight: normal;
  font-style: normal;
  padding: 7px 15px;
  margin: 30px auto 0;
  :hover,
  :focus {
    background: #666666;
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const NewCollectionSection = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('landingPageB')

  const latestArtworks = useSelector((state) => state.root.landingPage.latestArtworks)

  const filteredArtworks = latestArtworks.filter((item) => {
    return item.genreId && item.genreId.filter(e => e.title === 'Nude & Erotic').length == 0
  })
  
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')

  const userData = useSelector((state) => state.root.myProfile.userData)
  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

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

  // To call api again after logout
  useEffect(() => {
    if (rerender) {
      dispatch(getLatestArtworks())
    }
  }, [dispatch, rerender])

  useEffect(() => {
    dispatch(getLatestArtworks())
  }, [dispatch])

  return (
    <>
      <FeatureWrapper>
        <FeatureContainer>
          <MainHeading>{t(`artworkSection.title`)}</MainHeading>
          <NewCollectionSectionSlider
            latestArtworks={filteredArtworks}
            currency={currency}
            conversionRate={conversionRate}
            decimalSeparator={decimalSeparator}
          />
          <ButtonText onClick={() => openInNewTab(`/artworks`)}>{t(`artworkSection.seeMore`)}</ButtonText>
        </FeatureContainer>
      </FeatureWrapper>
    </>
  )
}

export default NewCollectionSection
